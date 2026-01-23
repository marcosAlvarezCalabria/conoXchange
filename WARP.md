# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

conoXchange is a Node.js web application built with Express, Handlebars (hbs) and MongoDB via Mongoose. It implements a skill‑exchange platform where users can register, publish skills, search skills, rate them, send messages, and create petitions for skills they are looking for.

The application follows a classic MVC pattern:
- `app.js` is the main entrypoint and Express app setup.
- `configs/` contains framework configuration (database, session, routes, view helpers).
- `models/` defines Mongoose schemas and relations.
- `controllers/` holds route handlers / business logic.
- `views/` holds Handlebars templates grouped by feature area, plus `partials/`.
- `public/` contains static assets (CSS, images, icons).

There are also Docker and Fly.io config files to run/deploy the app in a container.

## How to Run and Develop

The project is managed via npm. From the repository root:

- **Install dependencies**
  - `npm install`

- **Start the app (production‑like)**
  - `npm start`
  - Runs `node app.js` and listens on port `3000`.

- **Start the app in watch mode (development)**
  - `npm run dev`
  - Uses `nodemon -e js,hbs,css,env,app.js` so changes to `.js`, `.hbs`, `.css`, `.env`, and `app.js` restart the server.

- **Seed the database with sample data**
  - `npm run seed`
  - Runs `node seed.js`, which connects to MongoDB (`MONGODB_URI` or `mongodb://127.0.0.1:27017/conoXchange`), clears main collections, and inserts demo users, skills, ratings, messages, and petitions.

### Environment configuration

- Environment variables are loaded with `dotenv` in `app.js` and `seed.js`.
- Database connection (`configs/db.config.js` and `seed.js`):
  - `MONGODB_URI` (optional) – defaults to `mongodb://127.0.0.1:27017/conoXchange` if not set.
- Session configuration (`configs/session.config.js`):
  - `SESSION_SECRET` – secret for Express sessions (defaults to `"top-secret"` if unset).
  - `SESSION_SECURE` – when set to `"true"`, marks cookies as `secure` and enables `proxy`.

Make sure a MongoDB instance is available and the environment variables are configured before running the app or seeding.

### Tests

There is currently no explicit test script configured in `package.json`. If tests are added later, prefer to use the npm scripts defined there (for example, `npm test` or feature‑specific scripts) and, for a single test, the corresponding test‑runner options.

## High‑Level Architecture

### Entry point and global middleware

- `app.js`
  - Loads environment variables (`dotenv`).
  - Initializes core configs:
    - `require('./configs/hbs.config')` – registers Handlebars partials and helpers.
    - `require('./configs/db.config')` – establishes the MongoDB connection.
  - Creates the Express app and configures:
    - `app.set('view engine', 'hbs')` and `app.set('views', __dirname + '/views')`.
    - Session middleware from `configs/session.config.js`:
      - `session` – Express session store backed by MongoDB via `connect-mongo`.
      - `loadUserSession` – loads the logged‑in user into `req.user` and `res.locals.currentUser`.
    - `express.urlencoded()` for form submissions.
    - Static files via `app.use(express.static(__dirname + '/public'))`.
  - Mounts routes from `configs/routes.config.js` at `/`.
  - Centralized error handler:
    - Cast errors on `_id` become HTTP 404 with `errors/404.hbs`.
    - All other unhandled errors become HTTP 500 with `errors/500.hbs`.

### Routing layer

- `configs/routes.config.js` defines all HTTP routes using an Express `Router`, wired to controllers:
  - **Misc**
    - `/` → `misc.home` → renders `views/misc/home.hbs`.
  - **Users** (`controllers/users.controller.js`)
    - `GET /register` / `POST /register` – user registration.
    - `GET /login` / `POST /login` – user login.
    - `GET /logout/:id` – logout, clear session and cookie.
    - `GET /edit` / `POST /edit` – edit current user profile (protected).
  - **Skills** (`controllers/skills.controller.js` – protected by `auth.middleware.isAuthenticated`)
    - `GET /skills/new` / `POST /skills/new` – create skill owned by current user.
    - `GET /profile/:userId` – list skills for a user and render profile.
    - `GET /detail/:id` – skill detail, including ratings.
    - `GET /skills/:id/edit` / `POST /skills/:id/edit` – edit a skill.
    - `GET /skills/:id/delete` – delete a skill.
    - `GET /search` – search and browse skills (with filters).
  - **Messages** (`controllers/messages.controller.js` – protected)
    - `GET /messages/:id` – show messaging view for a given skill.
    - `POST /messages/:id` – send a message between current user and the skill owner.
  - **Ratings** (`controllers/ratings.controllers.js` – protected)
    - `POST /detail/:id` – create a rating for a skill and update its average rating.
  - **Petitions** (`controllers/petition.controllers.js` – protected)
    - `GET /petitions/show` – list petitions and render creation form.
    - `POST /petitions/show` – create a new petition.
    - `GET /petitions/show/:id/delete` – delete a petition.

- `middlewares/auth.middleware.js` provides `isAuthenticated`, which checks `req.user` and redirects to `/login` if not logged in. Many routes are protected with this middleware.

### Data layer (Mongoose models)

All models live under `models/` and represent MongoDB collections.

- `models/user.model.js`
  - Fields: `email`, `password`, `username`, `description`, `interests` (enum of skill categories).
  - `pre('save')` hook hashes `password` with `bcrypt` whenever it is modified.
  - Instance method `checkPassword` wraps `bcrypt.compare`.

- `models/skill.model.js`
  - Fields: `name`, `category` (same category enum used in user `interests`), `description`, `owner` (ref `User`), `averageRate`.
  - Virtual relation `ratings`:
    - `ref: 'Rating'`, `localField: '_id'`, `foreignField: 'skill'`.
  - Used heavily in `skills.controller` and rating aggregation.

- `models/rating.models.js`
  - Fields: `sender` (ref `User`), `skill` (ref `Skill`), `rate` (1–5), optional `comment`.

- `models/message.model.js`
  - Fields: `sender` (ref `User`), `receiver` (ref `User`), `content`.
  - Powers the simple messaging feature between skill owner and interested user.

- `models/petition.model.js`
  - Fields: `name`, `category`, `description`, `requester` (ref `User`).
  - Exposed via petitions UI to request new skills.

### Controllers (business logic)

- `controllers/users.controller.js`
  - Handles registration, login, profile editing, and logout.
  - On successful login, sets `req.session.userId` and redirects to `/profile/:id`.
  - Profile edits use `findByIdAndUpdate` with validation and redirect to `/profile/me`.

- `controllers/skills.controller.js`
  - Create/list/edit/delete skills; attach `req.user` as `owner` on creation.
  - `list`: resolves which user’s skills to show (`:userId` or `me`), fetches `User` and `Skill`s, and renders `views/users/profile.hbs` with `skills`, `user`, and `isUserLogged`.
  - `detail`: populates `owner` and `ratings.sender`, exposes them to `views/skills/detail.hbs` together with `isUserLogged`.
  - `show`: implements the skill search/filter page; builds a Mongo criteria object using `name`, `category`, and user `interests`, and returns two lists:
    - `skillsByFinder` – all skills matching current filters.
    - `skillsByInterests` – skills matching the current user’s interests.

- `controllers/ratings.controllers.js`
  - `doCreate`: creates a new `Rating` for a skill and then uses a Mongo aggregation pipeline to recompute the skill’s `averageRate`. It saves the updated `Skill` and redirects back to `/detail/:id`.

- `controllers/messages.controller.js`
  - `create`: loads a `Skill` (with `owner`) and renders `views/messages/messages.hbs`.
  - `doCreate`: creates a `Message` between current user and skill owner, then reloads the conversation (messages where sender/receiver match both users) and renders the same view.

- `controllers/petition.controllers.js`
  - `show`: loads all petitions with their `requester` populated and passes them to `views/petitions/show.hbs` along with the current username.
  - `doCreate`: creates petitions tied to `req.user` and handles validation errors by re‑rendering the form.
  - `delete`: deletes a petition and redirects back to the listing.

- `controllers/misc.controller.js`
  - `home`: renders the landing page `views/misc/home.hbs`.

### View layer (Handlebars templates)

- Layout is not centralized in a single layout file; pages use partials instead:
  - `views/partials/navbar.hbs` – top navigation bar.
    - Shows logo and, if `currentUser` exists, avatar and username.
    - When not logged in, shows an in‑navbar login dropdown and a Register button.
    - When logged in, shows links to `Skills`, `Petitions`, `Profile`, and `Logout`.
  - `views/partials/footer.hbs` – small footer with branding.

- Key pages:
  - `views/misc/home.hbs` – marketing‑style landing page with hero, how‑it‑works steps, testimonials, and a CTA.
  - `views/users/profile.hbs` – user profile card (avatar, about, interests) plus list of user skills, their average rating, and actions (edit/delete, create new skill) when viewing own profile.
  - `views/skills/search.hbs` – main search experience:
    - Search form with text input and category “chips” (buttons) tied to a hidden `category` input.
    - Small inline script manages chip selection, persists scroll position in `sessionStorage`, and auto‑submits the form.
    - Renders two sections: `Suggested For You` (skills by user interests) and `All Skills` (search results), using cards styled by `public/style/cardSearch.css`.
  - `views/messages/messages.hbs` – simple, functional chat interface for a skill (form + message list); includes a commented‑out more advanced design as inspiration.
  - `views/petitions/show.hbs` – split layout:
    - Left: new petition form using category icons partial.
    - Right: list of petitions with requester avatar, description, creation date, and controls (delete / email link) depending on whether the current user is the requester.
  - `views/errors/404.hbs` and `views/errors/500.hbs` – basic full‑page error screens.

- Partials and helpers:
  - `views/partials/icons.hbs` – used in petitions (and likely skills) for category selection (icons defined here).
  - `configs/hbs.config.js` registers:
    - `categoryImage(category)` – resolves the URL of an icon for each category, used across profile and search views.
    - `ifEq(a, b, options)` – equality helper used in `skills/search.hbs` to mark active category chips.
    - `dateFormat` – wraps `dayjs` to format dates (e.g. petition creation time).
    - `ifRequesterIsLogged(requesterUsername, currentUsername, options)` – controls whether the delete button is shown for a petition.
    - `ifUserRated(skillsRatings, currentUser, options)` – toggles UI based on whether the current user has already rated a skill.
    - `random` – provides a random integer 1–5; can be used for demo or UI elements.

### Static assets and styling

- CSS lives under `public/style/` and is split by concern:
  - `style.css` – general styles and some custom UI tweaks (e.g. gradients, navigation hover, buttons).
  - `navbar.css`, `home.css`, `cardSearch.css`, `skillDetail.css`, `forms.css`, `stars.css` – feature‑specific styles for the navbar, home page, skill cards, detail pages, forms, and rating stars.
  - `variables.css`, `paletColors.css` – theme variables (colors, spacing, etc.), referenced in the UI/UX modernization plan.

## UI/UX Modernization Plan

The file `MODERNIZACION-UI-UX.md` documents a detailed plan to modernize the interface. When working on design or front‑end tasks, consult this file first. High‑level themes:

- Establish a stronger design system (CSS variables for colors, typography, spacing, shadows, border radius, dark mode).
- Modernize the navbar (cleaner layout, improved hover states, mobile menu, avatar dropdown, subtle glassmorphism, sticky behavior).
- Strengthen the homepage (`views/misc/home.hbs`) with a more impactful hero, better CTAs, clear "How it works" section, richer category grid, testimonials, and animations.
- Redesign skill cards and detail pages (better hierarchy, improved category tags, rating visuals, avatars, related skills, and loading states).
- Modernize forms (floating labels, clearer validation, icons, loading/success states) across login/register, skill creation/edit, and profile edit views.
- Improve rating UX (larger/touch‑friendly stars, animations, rating distribution visuals).
- Enhance search and filters (prominent search bar, filter chips, better empty states, smooth animations).
- Upgrade the user profile page with cover image, better skills grid, badges for interests, and visual stats.
- Ensure responsive behavior across breakpoints and add micro‑interactions/animations (transitions, hover, skeleton loaders, toasts).
- Modernize the messaging interface and petitions list design.
- Improve error pages with more polished, brand‑consistent layouts.

Use the checklist in `MODERNIZACION-UI-UX.md` to drive incremental UI changes; many items map directly to specific Handlebars templates and CSS files referenced there.

## Deployment Notes

- `Dockerfile` defines a multi‑stage image for production:
  - Build stage installs build tooling, runs `npm ci`, and copies the application code.
  - Final image is a smaller Node.js image that copies the built app, exposes port `3000`, and runs `npm run start`.
- `fly.toml` configures deployment to Fly.io with HTTP service on internal port `3000`, HTTPS forced, and resources for the app VM.

When making changes that affect environment variables, session configuration, or database connectivity, ensure they remain compatible with the Docker and Fly.io setup (especially `PORT`/`internal_port`, `MONGODB_URI`, and session security settings).
const User = require("../models/user.model");
const mongoose = require("mongoose");
const {
  INTEREST_OPTIONS,
  normalizeInterests,
  pickProfileUpdates,
} = require("./users.helpers");

function renderRegister(res, overrides = {}) {
  const user = overrides.user || {};
  const selectedInterests = normalizeInterests(user.interests);
  const interestOptions = INTEREST_OPTIONS.map((option) => ({
    ...option,
    selected: selectedInterests.includes(option.value),
  }));

  return res.render("users/register", {
    user,
    interestOptions,
    ...overrides,
  });
}

module.exports.create = (req, res, next) => renderRegister(res);

module.exports.doCreate = (req, res, next) => {
  const user = req.body;
  User.findOne({ email: req.body.email })
    .then((userFound) => {
      if (userFound) {
        return renderRegister(res.status(409), {
          user: req.body,
          errors: { email: "already exists" },
        });
      } else {
        const user = {
          email: req.body.email,
          password: req.body.password,
          username: req.body.username,
          interests: normalizeInterests(req.body.interests),
        };
        return User.create(user).then(() => {

          res.redirect("/login");
        });
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        
        renderRegister(res.status(400), {
          user,
          errors: error.errors,
        });
      } else {
        
        next(error);
      }
    });
};
module.exports.login = (req, res, next) => res.render("users/login");

module.exports.doLogin = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).render("users/login", {
          user: req.body,
          errors: { password: "Invalid email or password" },
        });
      } else {
        return user.checkPassword(req.body.password).then((match) => {
          if (match) {
            req.session.regenerate((sessionError) => {
              if (sessionError) {
                return next(sessionError);
              }

              req.session.userId = user.id;
              return res.redirect(`/profile/${user.id}`);
            });
          } else {
            res.status(401).render("users/login", {
              user: req.body,
              errors: {
                password: "Invalid email or password",
              },
            });
          }
        });
      }
    })
    .catch((error) => next(error));
};

module.exports.edit = (req, res, next) => {
  res.render("users/edit");
};
module.exports.doEdit = (req, res, next) => {
  const userId = req.user.id;
  
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(400).send("user not found");
      }

      const updates = pickProfileUpdates(req.body);
      user.set(updates);

      return user.save().then(() => res.redirect(`/profile/me`));
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res
          .status(400)
          .render("users/edit", { user: req.body, errors: error.errors });
      } else {
        next(error);
      }
    });
};
module.exports.logout = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }

    res.clearCookie("connect.sid");
    return res.redirect("/");
  });
};

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user.model");
const Skill = require("./models/skill.model");
const Message = require("./models/message.model");
const Rating = require("./models/rating.models");
const Petition = require("./models/petition.model");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/conoXchange";
const DEFAULT_PASSWORD = "password123";

const userSeeds = [
  {
    email: "martina.ortega@example.com",
    username: "martinao",
    description:
      "Frontend developer, mentor and amateur ceramic artist living in Madrid.",
    interests: ["technology", "crafts"],
  },
  {
    email: "david.romero@example.com",
    username: "davidrom",
    description:
      "Home cook obsessed with fresh pasta, slow fermentation and market produce.",
    interests: ["cooking", "everyday life skills"],
  },
  {
    email: "laura.sanchez@example.com",
    username: "laurasan",
    description:
      "English teacher who loves helping people speak with confidence for travel and work.",
    interests: ["languages and culture", "music"],
  },
  {
    email: "sergio.navarro@example.com",
    username: "sergiona",
    description:
      "Guitar player and small-stage performer with a soft spot for acoustic sessions.",
    interests: ["music", "sports"],
  },
  {
    email: "clara.ibanez@example.com",
    username: "claraiba",
    description:
      "Urban gardener growing herbs, tomatoes and edible flowers on a small terrace.",
    interests: ["gardening and horticulture", "cooking"],
  },
  {
    email: "pablo.mendez@example.com",
    username: "pablomen",
    description:
      "DIY enthusiast who enjoys fixing things at home instead of replacing them.",
    interests: ["everyday life skills", "crafts"],
  },
  {
    email: "ines.castillo@example.com",
    username: "inescast",
    description:
      "Yoga instructor focused on posture, breathing and building sustainable habits.",
    interests: ["sports", "music"],
  },
  {
    email: "alvaro.gil@example.com",
    username: "alvarogi",
    description:
      "Backend engineer who likes explaining APIs, clean code and automation from scratch.",
    interests: ["technology", "languages and culture"],
  },
  {
    email: "nora.fuentes@example.com",
    username: "norafuen",
    description:
      "Illustrator and bookbinder interested in analogue crafts and visual storytelling.",
    interests: ["crafts", "others"],
  },
  {
    email: "hugo.vera@example.com",
    username: "hugovera",
    description:
      "Trail runner and outdoor lover who also enjoys meal prep and recovery routines.",
    interests: ["sports", "cooking"],
  },
];

const skillSeeds = [
  {
    owner: "martinao",
    name: "Modern JavaScript for absolute beginners",
    category: "technology",
    description:
      "A practical introduction to variables, functions, arrays, objects and DOM basics using small real projects.",
  },
  {
    owner: "davidrom",
    name: "Fresh pasta and weeknight Italian sauces",
    category: "cooking",
    description:
      "Learn dough basics, shaping techniques and three reliable sauces you can cook any weekday.",
  },
  {
    owner: "laurasan",
    name: "English conversation for travel and work",
    category: "languages and culture",
    description:
      "Speaking-focused sessions for everyday fluency, small talk, meetings and travel situations.",
  },
  {
    owner: "sergiona",
    name: "Acoustic guitar essentials",
    category: "music",
    description:
      "Chords, rhythm patterns and song structure for people who want to start playing from week one.",
  },
  {
    owner: "claraiba",
    name: "Terrace herb garden setup",
    category: "gardening and horticulture",
    description:
      "Build a low-maintenance mini garden with basil, mint, rosemary and seasonal vegetables in small spaces.",
  },
  {
    owner: "pablomen",
    name: "Basic home repairs without panic",
    category: "everyday life skills",
    description:
      "A confidence-building workshop on simple wall fixes, tap care, safe tools and household maintenance.",
  },
  {
    owner: "inescast",
    name: "Yoga foundations and mobility",
    category: "sports",
    description:
      "Beginner-friendly practice for posture, flexibility, breathing and reducing desk stiffness.",
  },
  {
    owner: "alvarogi",
    name: "Backend APIs with Node and Express",
    category: "technology",
    description:
      "Design routes, validate input and structure a maintainable API with realistic examples.",
  },
  {
    owner: "norafuen",
    name: "Handmade sketchbook binding",
    category: "crafts",
    description:
      "Create stitched notebooks with simple tools, quality paper choices and neat finishing details.",
  },
  {
    owner: "hugovera",
    name: "Running form and beginner training plans",
    category: "sports",
    description:
      "Improve running posture, pacing and weekly planning if you are building up to your first 10K.",
  },
  {
    owner: "martinao",
    name: "Portfolio reviews for junior developers",
    category: "technology",
    description:
      "Feedback on presentation, structure and storytelling so your projects feel more intentional and credible.",
  },
  {
    owner: "laurasan",
    name: "Spanish for newcomers in Madrid",
    category: "languages and culture",
    description:
      "Useful phrases, pronunciation support and cultural context for daily life in the city.",
  },
];

const petitionSeeds = [
  {
    requester: "hugovera",
    name: "Looking for photography basics",
    category: "others",
    description:
      "I want to understand manual mode, framing and how to shoot better portraits with a mirrorless camera.",
  },
  {
    requester: "norafuen",
    name: "Need help with Python for data analysis",
    category: "technology",
    description:
      "Searching for someone patient who can explain pandas, CSV cleaning and first visualizations.",
  },
  {
    requester: "pablomen",
    name: "Beginner French conversation partner",
    category: "languages and culture",
    description:
      "I know basic grammar but need real conversation practice before travelling next spring.",
  },
  {
    requester: "claraiba",
    name: "Strength training for gardeners",
    category: "sports",
    description:
      "I would love a simple mobility and strength routine to avoid back pain while working with plants.",
  },
  {
    requester: "sergiona",
    name: "Healthy meal prep ideas",
    category: "cooking",
    description:
      "Looking for batch-cooking strategies that fit busy weeks and late rehearsals.",
  },
  {
    requester: "inescast",
    name: "Intro to pottery wheel techniques",
    category: "crafts",
    description:
      "I want to try ceramics and would like a first guided session on wheel basics and clay prep.",
  },
];

const ratingSeeds = [
  {
    sender: "davidrom",
    skill: "Modern JavaScript for absolute beginners",
    rate: 5,
    comment:
      "Clear explanations and very practical examples. I finally understood callbacks without getting lost.",
  },
  {
    sender: "laurasan",
    skill: "Modern JavaScript for absolute beginners",
    rate: 4,
    comment:
      "Very useful and friendly for beginners. I would only add one extra exercise at the end.",
  },
  {
    sender: "martinao",
    skill: "Fresh pasta and weeknight Italian sauces",
    rate: 5,
    comment:
      "Excellent class. The dough tips alone saved me from a lot of kitchen frustration.",
  },
  {
    sender: "sergiona",
    skill: "English conversation for travel and work",
    rate: 5,
    comment:
      "Natural conversations, zero pressure and lots of useful corrections. Super effective.",
  },
  {
    sender: "claraiba",
    skill: "Acoustic guitar essentials",
    rate: 4,
    comment:
      "A very good entry point. I left knowing my first chord progression and how to practice at home.",
  },
  {
    sender: "hugovera",
    skill: "Yoga foundations and mobility",
    rate: 5,
    comment:
      "I noticed the difference in my hips after only two sessions. Calm, structured and accessible.",
  },
  {
    sender: "norafuen",
    skill: "Backend APIs with Node and Express",
    rate: 5,
    comment:
      "Great if you want to understand what is really happening in a small API without overcomplicating it.",
  },
  {
    sender: "inescast",
    skill: "Handmade sketchbook binding",
    rate: 5,
    comment:
      "Beautiful process and very satisfying result. I made a notebook I actually want to use.",
  },
  {
    sender: "pablomen",
    skill: "Running form and beginner training plans",
    rate: 4,
    comment:
      "Simple and realistic. The pacing advice was especially helpful for my first training month.",
  },
];

const messageSeeds = [
  {
    skill: "Modern JavaScript for absolute beginners",
    sender: "davidrom",
    receiver: "martinao",
    content:
      "Hi Martina, I am interested in your JavaScript class. Would you be open to a first session next week?",
  },
  {
    skill: "Modern JavaScript for absolute beginners",
    sender: "martinao",
    receiver: "davidrom",
    content:
      "Yes, absolutely. Tuesday or Thursday evening would work well for me if that suits you.",
  },
  {
    skill: "Modern JavaScript for absolute beginners",
    sender: "davidrom",
    receiver: "martinao",
    content:
      "Thursday evening is perfect. I mainly need help understanding functions and array methods.",
  },
  {
    skill: "English conversation for travel and work",
    sender: "sergiona",
    receiver: "laurasan",
    content:
      "Hello Laura, I have a work trip in June and I would love to practice spoken English before then.",
  },
  {
    skill: "English conversation for travel and work",
    sender: "laurasan",
    receiver: "sergiona",
    content:
      "That sounds like a good fit. If you want, we can do short role-play sessions around travel and meetings.",
  },
  {
    skill: "Backend APIs with Node and Express",
    sender: "norafuen",
    receiver: "alvarogi",
    content:
      "Hi Alvaro, I am building a small side project and need help understanding routes and validation.",
  },
  {
    skill: "Backend APIs with Node and Express",
    sender: "alvarogi",
    receiver: "norafuen",
    content:
      "Happy to help. If you share what you already built, I can tailor the session to your current level.",
  },
  {
    skill: "Running form and beginner training plans",
    sender: "pablomen",
    receiver: "hugovera",
    content:
      "Hi Hugo, I am trying to prepare for my first 10K and I keep starting too fast. Could you help me structure a plan?",
  },
];

function createLookup(items, key = "username") {
  return new Map(items.map((item) => [item[key], item]));
}

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    await Promise.all([
      User.deleteMany({}),
      Skill.deleteMany({}),
      Message.deleteMany({}),
      Rating.deleteMany({}),
      Petition.deleteMany({}),
    ]);
    console.log("Database cleaned");

    const createdUsers = await User.create(
      userSeeds.map((user) => ({ ...user, password: DEFAULT_PASSWORD }))
    );
    const usersByUsername = createLookup(createdUsers);
    console.log(`Users created: ${createdUsers.length}`);

    const createdSkills = await Skill.create(
      skillSeeds.map((skill) => ({
        name: skill.name,
        category: skill.category,
        description: skill.description,
        owner: usersByUsername.get(skill.owner)._id,
      }))
    );
    const skillsByName = createLookup(createdSkills, "name");
    console.log(`Skills created: ${createdSkills.length}`);

    const createdPetitions = await Petition.create(
      petitionSeeds.map((petition) => ({
        name: petition.name,
        category: petition.category,
        description: petition.description,
        requester: usersByUsername.get(petition.requester)._id,
      }))
    );
    console.log(`Petitions created: ${createdPetitions.length}`);

    const createdRatings = await Rating.create(
      ratingSeeds.map((rating) => ({
        sender: usersByUsername.get(rating.sender)._id,
        skill: skillsByName.get(rating.skill)._id,
        rate: rating.rate,
        comment: rating.comment,
      }))
    );
    console.log(`Ratings created: ${createdRatings.length}`);

    for (const skill of createdSkills) {
      const ratingsForSkill = createdRatings.filter(
        (rating) => String(rating.skill) === String(skill._id)
      );

      if (ratingsForSkill.length) {
        skill.averageRate =
          ratingsForSkill.reduce((sum, rating) => sum + rating.rate, 0) /
          ratingsForSkill.length;
        await skill.save();
      }
    }
    console.log("Average rates updated");

    const createdMessages = await Message.create(
      messageSeeds.map((message) => ({
        skill: skillsByName.get(message.skill)._id,
        sender: usersByUsername.get(message.sender)._id,
        receiver: usersByUsername.get(message.receiver)._id,
        content: message.content,
      }))
    );
    console.log(`Messages created: ${createdMessages.length}`);

    console.log("");
    console.log("Seed completed successfully");
    console.log(`Default password for all users: ${DEFAULT_PASSWORD}`);
    console.log("");
    console.log("Users:");
    createdUsers.forEach((user) => {
      console.log(`- ${user.username} (${user.email})`);
    });
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("");
    console.log("MongoDB connection closed");
  }
}

seed();

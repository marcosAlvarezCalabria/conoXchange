const INTEREST_OPTIONS = [
  { value: "crafts", label: "Crafts", icon: "/img/icons/crafts.png" },
  { value: "cooking", label: "Cooking", icon: "/img/icons/Cooking.png" },
  {
    value: "gardening and horticulture",
    label: "Gardening",
    icon: "/img/icons/Gardening and Horticulture.png",
  },
  {
    value: "everyday life skills",
    label: "Life Skills",
    icon: "/img/icons/everyday life skills.png",
  },
  { value: "music", label: "Music", icon: "/img/icons/music.png" },
  { value: "sports", label: "Sports", icon: "/img/icons/sports.png" },
  {
    value: "technology",
    label: "Technology",
    icon: "/img/icons/technology.png",
  },
  {
    value: "languages and culture",
    label: "Languages",
    icon: "/img/icons/Languages and Culture.png",
  },
  { value: "others", label: "Others", icon: "/img/icons/others.png" },
];

function normalizeInterests(interests) {
  if (typeof interests === "undefined") {
    return [];
  }

  return Array.isArray(interests) ? interests : [interests];
}

function pickProfileUpdates(body) {
  return {
    description: body.description,
    interests: normalizeInterests(body.interests),
  };
}

module.exports = {
  INTEREST_OPTIONS,
  normalizeInterests,
  pickProfileUpdates,
};

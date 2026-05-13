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
  normalizeInterests,
  pickProfileUpdates,
};

const {
  normalizeInterests,
  pickProfileUpdates,
} = require("../controllers/users.helpers");

describe("users.controller helpers", () => {
  it("normalizes interests from a single value", () => {
    expect(normalizeInterests("music")).toEqual(["music"]);
  });

  it("returns an empty interests list when none is sent", () => {
    expect(normalizeInterests(undefined)).toEqual([]);
  });

  it("filters editable profile fields", () => {
    expect(
      pickProfileUpdates({
        description: "Builder",
        interests: "technology",
        password: "plain-text-should-not-pass",
        role: "admin",
      })
    ).toEqual({
      description: "Builder",
      interests: ["technology"],
    });
  });
});

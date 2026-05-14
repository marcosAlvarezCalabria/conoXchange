const {
  normalizeMessageContent,
  canMessageSkillOwner,
  buildConversationQuery,
} = require("../controllers/messages.helpers");

describe("messages.helpers", () => {
  it("trims message content", () => {
    expect(normalizeMessageContent("  hello there  ")).toBe("hello there");
  });

  it("returns an empty string for invalid content", () => {
    expect(normalizeMessageContent(undefined)).toBe("");
    expect(normalizeMessageContent(null)).toBe("");
  });

  it("prevents messaging your own skill listing", () => {
    expect(canMessageSkillOwner("abc123", "abc123")).toBe(false);
  });

  it("allows messaging another user", () => {
    expect(canMessageSkillOwner("abc123", "xyz789")).toBe(true);
  });

  it("builds a conversation query scoped to one skill", () => {
    expect(
      buildConversationQuery({
        skillId: "skill-id",
        currentUserId: "sender-id",
        ownerId: "owner-id",
      })
    ).toEqual({
      skill: "skill-id",
      $or: [
        { receiver: "owner-id", sender: "sender-id" },
        { sender: "owner-id", receiver: "sender-id" },
      ],
    });
  });
});

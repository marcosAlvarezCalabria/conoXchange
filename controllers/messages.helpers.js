function normalizeMessageContent(content) {
  if (typeof content !== "string") {
    return "";
  }

  return content.trim();
}

function canMessageSkillOwner(currentUserId, ownerId) {
  return String(currentUserId) !== String(ownerId);
}

function buildConversationQuery({ skillId, currentUserId, ownerId }) {
  return {
    skill: skillId,
    $or: [
      { receiver: ownerId, sender: currentUserId },
      { sender: ownerId, receiver: currentUserId },
    ],
  };
}

module.exports = {
  normalizeMessageContent,
  canMessageSkillOwner,
  buildConversationQuery,
};

const createError = require("http-errors");
const mongoose = require("mongoose");
const Skill = require("../models/skill.model");
const Message = require("../models/message.model");
const {
  normalizeMessageContent,
  canMessageSkillOwner,
  buildConversationQuery,
} = require("./messages.helpers");

function renderConversation(res, { skill, messages = [], errors = {}, formData = {} }, status = 200) {
  return res.status(status).render("messages/messages", {
    skill,
    messages,
    errors,
    formData,
    isOwnerConversation: !canMessageSkillOwner(res.locals.currentUser?.id, skill.owner.id),
  });
}

async function findConversationSkill(skillId) {
  return Skill.findById(skillId).populate("owner", "username email description");
}

async function findConversationMessages({ skillId, currentUserId, ownerId }) {
  return Message.find(
    buildConversationQuery({
      skillId,
      currentUserId,
      ownerId,
    })
  )
    .populate("sender", "username email")
    .populate("receiver", "username email")
    .sort({ createdAt: 1 });
}

module.exports.create = async (req, res, next) => {
  try {
    const { id } = req.params;
    const skill = await findConversationSkill(id);

    if (!skill) {
      return next(createError(404, "Skill not found"));
    }

    const messages = await findConversationMessages({
      skillId: skill.id,
      currentUserId: req.user.id,
      ownerId: skill.owner.id,
    });

    return renderConversation(res, { skill, messages });
  } catch (error) {
    return next(error);
  }
};

module.exports.doCreate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const skill = await findConversationSkill(id);

    if (!skill) {
      return next(createError(404, "Skill not found"));
    }

    if (!canMessageSkillOwner(req.user.id, skill.owner.id)) {
      const messages = await findConversationMessages({
        skillId: skill.id,
        currentUserId: req.user.id,
        ownerId: skill.owner.id,
      });

      return renderConversation(
        res,
        {
          skill,
          messages,
          errors: { content: "You cannot message your own skill listing." },
        },
        403
      );
    }

    const content = normalizeMessageContent(req.body.content);

    if (!content) {
      const messages = await findConversationMessages({
        skillId: skill.id,
        currentUserId: req.user.id,
        ownerId: skill.owner.id,
      });

      return renderConversation(
        res,
        {
          skill,
          messages,
          errors: { content: "Write a message before sending it." },
          formData: { content: req.body.content },
        },
        400
      );
    }

    await Message.create({
      skill: skill.id,
      content,
      sender: req.user.id,
      receiver: skill.owner.id,
    });

    return res.redirect(`/messages/${skill.id}`);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      try {
        const skill = await findConversationSkill(req.params.id);
        const messages = skill
          ? await findConversationMessages({
              skillId: skill.id,
              currentUserId: req.user.id,
              ownerId: skill.owner.id,
            })
          : [];

        if (skill) {
          return renderConversation(
            res,
            {
              skill,
              messages,
              errors: {
                content:
                  error.errors.content?.message || "Unable to send the message.",
              },
              formData: { content: req.body.content },
            },
            400
          );
        }
      } catch (renderError) {
        return next(renderError);
      }
    }

    return next(error);
  }
};

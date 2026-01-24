const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const Skill = require("../models/skill.model");
const Message = require("../models/message.model");

module.exports.create = (req, res, next) => {
  const { id } = req.params;

  Skill.findById(id)
    .populate("owner")
    .then((skill) => {
      res.render(`messages/messages`, { skill });
    })
    .catch((error) => next(error));
};
module.exports.doCreate = (req, res, next) => {
  const { id } = req.params;

  Skill.findById(id).then((skill) => {
    if (!skill) {
      next(createError(404, "skill not found"));
    } else {
      const message = req.body;
      message.content = req.body.content;
      message.sender = req.user.id;
      message.receiver = skill.owner;

      Message.create(message)
        .then((createdMessage) => {
          return Message.find({
            $or: [
              { receiver: skill.owner, sender: req.user.id },
              { sender: skill.owner, receiver: req.user.id },
            ],
          })
            .populate("sender")
            .populate("receiver");
        })
        .then((retrievedMessages) => {
          const messages = retrievedMessages;

          res.render("messages/messages", { skill, messages });
        })
        .catch((error) => next(error));
    }
  });
};


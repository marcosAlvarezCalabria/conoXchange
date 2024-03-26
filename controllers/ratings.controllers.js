const Skill = require("../models/skill.model");
const Rating = require("../models/rating.models");
const createError = require("http-errors");

module.exports.doCreate = async (req, res, next) => {
  try {
    const skillId = req.params.id;
    const ratingData = req.body;

    const skill = await Skill.findById(skillId);
    if (!skill) {
      return next(createError(404, 'Skill not found'));
    }

    ratingData.sender = req.user.id;
    ratingData.skill = skillId;
    ratingData.senderEmail = req.user.email;

    await Rating.create(ratingData);

    const updatedSkill = await Skill.findById(skillId).populate('owner');
    if (!updatedSkill) {
      return next(createError(404, 'Skill not found after rating creation'));
    }

    res.redirect(`/detail/${skillId}`);
  } catch (error) {
    next(error);
  }
};




const createError = require('http-errors');
const Rating = require('../models/rating.models');
const Skill = require('../models/skill.model');
const mongoose = require('mongoose');

module.exports.doCreate = async (req, res, next) => {
  const skillId = req.params.id;
  
  try {
    const skill = await Skill.findById(skillId);
    if (!skill) {
      return next(createError(404, 'Skill not found'));
    }

    const rating = req.body;
    rating.sender = req.user.id;
    rating.skill = skillId;

    await Rating.create(rating);

    const averageRatingResult = await Rating.aggregate([
      {
        $match: { skill: new mongoose.Types.ObjectId(skillId) }
      },
      {
        $group: {
          _id: '$skill',
          averageRate: { $avg: '$rate' }
        }
      }
    ]);

    skill.averageRate = averageRatingResult.length > 0 ? Math.round(averageRatingResult[0].averageRate) : 0;
    await skill.save();

    res.redirect(`/detail/${skillId}`);
  } catch (error) {
    next(error);
  }
};

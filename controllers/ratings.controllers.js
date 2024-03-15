const mongoose = require("mongoose");
const createError = require("http-errors");
const Rating = require("../models/rating.models");
const Skill = require("../models/skill.model");

module.exports.doCreate = (req, res, next) => {
  const skillId = req.params.id;
  Skill.findById(skillId)
    .then((skill) => {
      if (!skill) {
        next(createError(404, "Skill not found"));
      } else {
        const rating = req.body;
        rating.sender = req.user.id;
        rating.skill = skillId;
        return Rating.create(rating)
        
        .then(() =>{
            
            res.redirect(`/detail/${skillId}`)} )
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
              res
                .status(400)
                .render("skills/detail", {
                  skill,
                  errors: error.errors,
                  message: req.body,
                });
            } else {
              next(error);
            }
          });
      }
    })
    .catch((error) => next(error));
};
module.exports.edit = (req, res, next) => {
    res.send("edit")
}

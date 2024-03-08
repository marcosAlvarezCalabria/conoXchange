const Skill = require("../models/skill.model");
const mongoose = require("mongoose")
const User = require("../models/user.model")


module.exports.create = (req, res, next ) => res.render("skills/new") 
module.exports.doCreate = (req, res, next) => {
    const skill = req.body ;
    skill.owner = req.user.id;

    Skill.create(skill)
        .then((skill) => res.redirect("/profile"))
        .catch((error) => {
            if( error instanceof mongoose.Error.ValidationError) {
                res.status(400).render("skills/new", { skill: skill, errors: error.errors})
            } else {
                next(error);
            }
        });
};
module.exports.list = (req, res, next) => {
    Skill.find({ owner: req.user.id })
        .then((skills) => {
            res.render ("users/profile", { skills})
        })
        .catch((error) => next(error));


}
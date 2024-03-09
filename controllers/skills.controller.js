const createError = require("http-errors")
const Skill = require("../models/skill.model");
const mongoose = require("mongoose")
const User = require("../models/user.model")


module.exports.create = (req, res, next ) => res.render("skills/new") 
module.exports.doCreate = (req, res, next) => {
    const skill = req.body ;
    skill.owner = req.user;

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
    Skill.find({owner: req.user.id})
        .then((skills) => {
            res.render ("users/profile", {skills});
        })
        .catch((error) => next(error))
}
module.exports.detail = (req, res, next) => {
    const { id }= req.params
    Skill.findById(id)
        .then((skill) =>{
            res.render("skills/detail", {skill})
        } )
        .catch((error) => next(error))
}
module.exports.edit = (req, res, next) => {
    const { id } = req.params
    Skill.findById(id)
        .then((skill) => res.render("skills/edit", {skill}))
        .catch((error) => next (error))
}
module.exports.doEdit = (req, res, next) => {
    
    const skill = req.body
    skill.id = req.params.id 
    Skill.findByIdAndUpdate(req.params.id, req.body, {runValidators: true})
        .then((skill) => {
            if(!skill) {
                next (createError(400,"Skill not found"));
            } else {
                res.redirect(`/profile`);
            }
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).render("skills/edit", {skill: skill, errors: error.errors});

            } else {
                next(error)
            } 
        })
}
module.exports.delete = (req, res, next) => {
    const { id } = req.params
    Skill.findByIdAndDelete(id)
        .then ((skill) => {
            if(!skill) { 
                next(createError(404, "Skill not found"))
            } else {
                res.redirect("/profile")
            }
        })
        .catch((error) => next (error))
}
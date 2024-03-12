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
   const criterial = {}
   if(req.params.userId) {
    if (req.params.userId === 'me') {
        criterial.owner = req.user.id
    } else {
        criterial.owner = req.params.userId
    }
   }
    Skill.find(criterial)
        .populate("owner")
        .then((skills) => {
            const user = skills[0]?.owner;
            const isUserLogged = req.user.id == user.id;
            res.render ("users/profile", {skills, user, isUserLogged});
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
module.exports.show = (req, res, next) => {

    const {name,category} = req.query;
    const criterial = {};
    if(category) criterial.category = category
    if (name) criterial.name = new RegExp(name, "i");
    const userId = req.params.id
   
Skill.find(criterial)
    .populate("owner")
    .then ((skills) => {
        res.render("skills/search",{skills , userId})
    })
    .catch((error) => next(error))
}
module.exports.GoToOwnerProfile = (req, res, next) => {

    const ownerId = req.params.id
    const user = req.session.id
    console.debug (`este es el req.session ${ownerId}`)

    User.findById(ownerId)   
    .then((owner) => {
        res.redirect(`/profile/${ownerId}`)})
    .catch((error) => next(error))

    

}
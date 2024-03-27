const createError = require("http-errors");
const Skill = require("../models/skill.model");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const Rating = require("../models/rating.models")

module.exports.create = (req, res, next) => res.render("skills/new");
module.exports.doCreate = (req, res, next) => {
  const skill = req.body;
  skill.owner = req.user;

  Skill.create(skill)
    .then((skill) => res.redirect(`/profile/${skill.owner.id}`))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res
          .status(400)
          .render("skills/new", { skill: skill, errors: error.errors });
      } else {
        next(error);
      }
    });
};
module.exports.list = (req, res, next) => {
  const criterial = {};
  if (req.params.userId) {
    if (req.params.userId === "me") {
      criterial.owner = req.user.id;
    } else {
      criterial.owner = req.params.userId;
    }
  }
  User.findById(criterial.owner).then((user) => {
    Skill.find(criterial)
      .populate("owner")
      .then((skills) => {
        const isUserLogged = req.user?.id == criterial.owner;
        res.render("users/profile", { skills, user, isUserLogged });
      })
      .catch((error) => next(error));
  });
};
module.exports.detail = (req, res, next) => {
  const { id } = req.params;

  Skill.findById(id)
    .populate("owner")
    .populate({
      path: "ratings",
      populate: {
        path: "sender",
        select: "username email",
      },
    })
    //ratings width virtual
    .then((skill) => {
      const owner = skill.owner;
      const isUserLogged = req.user.id == skill.owner.id;
    
      console.debug(`esto es skill.owner ${skill.averageRate}`)
     res.render("skills/detail", { skill, isUserLogged, owner });
 
    })
    .catch((error) => next(error));
};
module.exports.edit = (req, res, next) => {
  const { id } = req.params;
  Skill.findById(id)
    .then((skill) => res.render("skills/edit", { skill }))
    .catch((error) => next(error));
};
module.exports.doEdit = (req, res, next) => {
  const skill = req.body;
  skill.id = req.params.id;
  Skill.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then((skill) => {
      if (!skill) {
        next(createError(400, "Skill not found"));
      } else {
        res.redirect(`/profile/${req.session.userId}`);
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res
          .status(400)
          .render("skills/edit", { skill: skill, errors: error.errors });
      } else {
        next(error);
      }
    });
};
module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  Skill.findByIdAndDelete(id)
    .then((skill) => {
      if (!skill) {
        next(createError(404, "Skill not found"));
      } else {
        
        res.redirect(`/profile/${req.session.userId}`);
      }
    })
    .catch((error) => next(error));
};
module.exports.show = (req, res, next) => {
  const { name, category, interests, /*description */} = req.query;
  const criterial = {};
  if (interests) criterial.interests = interests;
  if (category && category !== "all") criterial.category = category;
  if (name) criterial.name = {$regex: new RegExp(name, "i")};
  //if(description) criterial.description = {$regex: new RegExp(description, i)} //i insensible lowercase and capital letters
  const userId = req.params.id;
  

  Promise.all([
    Skill.find(criterial).populate("owner"),
    Skill.find({category: { $in:req.user.interests } }).populate("owner").sort({_id: -1 }).limit(2)
    ])
    .then(([skillsByFinder,skillsByInterests]) => {
        res.render("skills/search",{skillsByFinder,skillsByInterests})
    })
    .catch((error) => next(error))

};

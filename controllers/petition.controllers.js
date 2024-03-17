const Petition = require("../models/petition.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");


module.exports.show = (req, res, next) => {
    res.render("petitions/show");
}
module.exports.doCreate = (req, res, next) => {
   const petition = req.body;
   petition.name = req.body.name;
   petition.description = req.body.description;
   petition.requester = req.body.id;
   petition.category = req.body.category;
   console.debug(petition)

   Petition.create(petition)
    .then((petitionCreated) => res.redirect("/show"))
    .catch((error) => next (error))
}
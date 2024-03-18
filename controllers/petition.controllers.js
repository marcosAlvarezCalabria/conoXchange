const Petition = require("../models/petition.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");


module.exports.show = (req, res, next) => {
    Petition.find() 
        .populate("requester")
        .then ((petitions) => {
            console.debug(`esto es req.body.name ${petitions}`)
             res.render("petitions/show", { petitions });
        })
        .catch((error) => next(error));
    
   ;
}
module.exports.doCreate = (req, res, next) => {
   const petition = req.body;
   petition.name = req.body.name;
   petition.description = req.body.description;
   petition.requester = req.user.id;
   petition.category = req.body.category;
   

   Petition.create(petition)
    .then((petitionCreated) => res.redirect("/petitions/show"))
    .catch((error) => next (error))
}
module.exports.delete = (req, res, next) => {
    const { id } = req.params;
    Petition.findByIdAndDelete(id)
    .then(() => res.redirect("/petitions/show"))
    .catch((error) => next(error))
}
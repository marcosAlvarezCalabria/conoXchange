const Petition = require("../models/petition.model");
const mongoose = require("mongoose");
const { INTEREST_OPTIONS } = require("./users.helpers");

function renderPetitions(res, req, petitions, overrides = {}) {
  return res.render("petitions/show", {
    petitions,
    username: req.user.username,
    petition: {},
    petitionOptions: INTEREST_OPTIONS,
    ...overrides,
  });
}

module.exports.show = (req, res, next) => {
  Petition.find()
    .populate("requester")
    .sort({ createdAt: -1 })
    .then((petitions) => renderPetitions(res, req, petitions))
    .catch((error) => next(error));
};

module.exports.doCreate = (req, res, next) => {
  const petition = {
    name: req.body.name,
    description: req.body.description,
    requester: req.user.id,
    category: req.body.category,
  };

  Petition.create(petition)
    .then(() => {
      res.redirect("/petitions/show");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return Petition.find()
          .populate("requester")
          .sort({ createdAt: -1 })
          .then((petitions) =>
            renderPetitions(res, req, petitions, {
              petition: req.body,
              errors: error.errors,
            })
          );
      }

      return next(error);
    });
};

module.exports.delete = (req, res, next) => {
  const { id } = req.params;
  Petition.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/petitions/show");
    })
    .catch((error) => next(error));
};

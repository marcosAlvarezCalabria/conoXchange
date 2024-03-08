const User = require("../models/user.model");
const mongoose = require("mongoose");
const { sessions } = require("../middlewares/auth.middleware");

module.exports.create = (req, res, next) => res.render("users/register");
module.exports.doCreate = (req, res, next) => {
  const user = req.body;
  User.findOne({ email: req.body.email })
    .then((userFound) => {
      if (userFound) {
        res.status(409).render("users/register", {
          userFound,
          errors: { email: "already exists" },
        });
      } else {
        const user = {
          email: req.body.email,
          password: req.body.password,
          username: req.body.username,
        };
        return User.create(user).then(() => res.redirect("/login"));
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res
          .status(400)
          .render("users/register", { user, errors: error.errors });
      } else {
        next(error);
      }
    });
};
module.exports.login = (req, res, next) => res.render("users/login");

module.exports.doLogin = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).render("users/login", {
          user: req.body,
          errors: { password: "Invalid email or password" },
        });
      } else {
        return user.checkPassword(req.body.password).then((match) => {
          if (match) {
            req.session.userId = user.id;
            res.redirect("/profile");
          } else {
            res.status(401).render("users/login", {
              user: req.body,
              errors: {
                password: "Invalid email or password",
              },
            });
          }
        });
      }
    })
    .catch((error) => next(error));
};

/*module.exports.profile = (req, res, next) => {
  res.render("users/profile");
};*/

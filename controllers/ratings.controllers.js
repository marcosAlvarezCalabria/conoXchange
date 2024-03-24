const createError = require('http-errors');
const Rating = require('../models/rating.models');
const Skill = require('../models/skill.model');
const mongoose = require('mongoose');

module.exports.doCreate = (req, res, next) => {
    const skillId = req.params.id;
    Skill.findById(skillId)
    .then((skill) => {
        if (!skill) {
          next(createError(404, 'Skill not found'));
        } else {
          const rating = req.body;
          rating.sender = req.user.id;
          rating.sender.email= req.user.email;
          rating.skill = skillId;
          return Rating.create(rating)
            .then(() => {
              console.debug(`esto es rating${rating}`)
               return Rating.aggregate([
                  {
                    $match: { skill: new mongoose.Types.ObjectId(skillId) }
                  },
                  {
                    $group: {
                      _id: '$skill',
                      averageRate: { $avg: '$rate' }

                    }
                  }
                ])
                .then((result) => {
                  skill.averageRate =Math.round(result[0].averageRate);
                  return skill.save()
                    .then (() => {
                      console.log(`this is result ${result}`)
                      res.redirect(`/detail/${skillId}`)
                    })
                  
                })
                
            })
            .catch((error) => {
              if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).render('skills/detail', { skill, errors: error.errors, rating: req.body })
              } else {
                next(error);
              }
            });
        }
    })
    .catch(next);
  }



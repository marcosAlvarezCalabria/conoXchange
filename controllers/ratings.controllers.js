module.exports.doCreate = (req, res, next) => {
    const skillId = req.params.id;
    const rating = req.body;

    Skill.findById(skillId)
        .then((skill) => {
            if (!skill) {
                return next(createError(404, 'Skill not found'));
            }

            rating.sender = req.user.id;
            rating.skill = skillId;


            rating.senderEmail = req.user.email;


            return Rating.create(rating)
                .then(() => {

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

                            skill.averageRate = Math.round(result[0].averageRate);
                            return skill.save();
                        })
                        .then(() => {

                            res.redirect(`/detail/${skillId}`);
                        });
                })
                .catch((error) => {
                    if (error instanceof mongoose.Error.ValidationError) {

                        res.status(400).render('skills/detail', { skill, errors: error.errors, rating: req.body });
                    } else {

                        next(error);
                    }
                });
        })
        .catch(next);
};



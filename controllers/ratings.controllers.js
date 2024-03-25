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

          // Agregar el correo electrónico del remitente al rating
          rating.senderEmail = req.user.email;

          // Crear la calificación
          return Rating.create(rating)
              .then(() => {
                  // Calcular el promedio de calificación
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
                          // Actualizar el promedio de calificación en la habilidad
                          skill.averageRate = Math.round(result[0].averageRate);
                          return skill.save();
                      })
                      .then(() => {
                          // Redirigir a la vista de detalle con el ID de habilidad
                          res.redirect(`/detail/${skillId}`);
                      });
              })
              .catch((error) => {
                  if (error instanceof mongoose.Error.ValidationError) {
                      // Manejar errores de validación
                      res.status(400).render('skills/detail', { skill, errors: error.errors, rating: req.body });
                  } else {
                      // Pasar el error al siguiente middleware
                      next(error);
                  }
              });
      })
      .catch(next);
};



const express = require('express');
const misc = require ('../controllers/misc.controller')
const users = require ('../controllers/users.controller')
const router = express.Router();
const secure = require ('../middlewares/auth.middleware')





router.get("/",misc.home)
//register
router.get("/register", users.create)
router.post("/register",users.doCreate)
//login
router.get("/login", users.login)
router.post("/login", users.doLogin)
//profile
router.get("/profile", users.profile)

// skills
//router.get("/skills/new", skills.create)
//router.post('/skills/new', skills.doCreate)

// 1 - crear modelo de skill con los campos necesarios
// 2 - controllador skills.create que devuelva formulario skill
// 3 - controlador skills.doCreate que cree la SKILL en BDD



module.exports = router
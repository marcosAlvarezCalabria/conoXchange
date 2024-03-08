const express = require('express');
const misc = require('../controllers/misc.controller');
const users = require('../controllers/users.controller');
const skills = require('../controllers/skills.controller');
const secure = require('../middlewares/auth.middleware');
const router = express.Router();

router.get("/",misc.home);
//*****************************user************************** */
//register
router.get("/register", users.create);
router.post("/register",users.doCreate);
//login
router.get("/login", users.login);
router.post("/login", users.doLogin);
//profile
//router.get("/profile",secure.isAuthenticated, users.profile)
//edit
//router.get("/edit",users.edit)
//router.post("/edit",users.doEdit)
//*****************************skills************************* */
// skills create
router.get("/skills/new", skills.create);
router.post('/skills/new', skills.doCreate);
//skills list in profile
router.get("/profile",secure.isAuthenticated, skills.list);


module.exports = router
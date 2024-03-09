const express = require('express');
const misc = require('../controllers/misc.controller');
const users = require('../controllers/users.controller');
const skill = require('../controllers/skills.controller');
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
//router.get("/profile", users.profile);de
//edit
router.get("/edit",users.edit);
router.post("/edit",users.doEdit);
//*****************************skills************************* */
// skills
router.get("/skills/new", skill.create);
router.post('/skills/new', skill.doCreate);
//skills list in profile
router.get("/profile",secure.isAuthenticated, skill.list);
router.get("/detail/:id",secure.isAuthenticated, skill.detail)
//skills edit
router.get("/skills/:id/edit",secure.isAuthenticated,skill.edit);
router.post("/skills/:id/edit",secure.isAuthenticated,skill.doEdit)
//skills delete
router.get("/skills/:id/delete",secure.isAuthenticated,skill.delete)




module.exports = router
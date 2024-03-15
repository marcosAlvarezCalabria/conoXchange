const express = require('express');
const misc = require('../controllers/misc.controller');
const users = require('../controllers/users.controller');
const skills = require('../controllers/skills.controller');
const messages = require('../controllers/messages.controller');
const secure = require('../middlewares/auth.middleware');
const ratings = require('../controllers/ratings.controllers');
const router = express.Router();




router.get("/",misc.home);
//*****************************user************************** */
//register
router.get("/register", users.create);
router.post("/register",users.doCreate);
//login
router.get("/login", users.login);
router.post("/login", users.doLogin);
//logout
router.get("/logout/:id", users.logout)
//router.get("/profile",secure.isAuthenticated, users.doEdit);
//edit
router.get("/edit",secure.isAuthenticated,users.edit);
router.post("/edit",secure.isAuthenticated,users.doEdit);
//*****************************skills************************* */
// skills
router.get("/skills/new",secure.isAuthenticated, skills.create);
router.post('/skills/new',secure.isAuthenticated, skills.doCreate);
//skills list in profile
router.get("/profile/:userId", secure.isAuthenticated, skills.list);
router.get("/detail/:id", secure.isAuthenticated, skills.detail)
//skills edit
router.get("/skills/:id/edit", secure.isAuthenticated, skills.edit);
router.post("/skills/:id/edit", secure.isAuthenticated, skills.doEdit)
//skills delete
router.get("/skills/:id/delete", secure.isAuthenticated, skills.delete)
//*************************search_room************************** */
//search_room
router.get("/search",skills.show)

//**********************messages*********************** */
router.get("/messages/:id",secure.isAuthenticated, messages.create)
router.post("/messages/:id",secure.isAuthenticated, messages.doCreate)

/************************ratings******************** */
router.post("/detail/:id",secure.isAuthenticated, ratings.doCreate)





module.exports = router
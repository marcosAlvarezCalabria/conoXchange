const hbs = require('hbs');
const { options } = require('./routes.config');

hbs.registerPartials(`${__dirname}/../views/partials`);
hbs.registerHelper("categoryImage", function(category) {
    
    switch(category) {
        case "Crafts":
            return "/img/icons/crafts.png";
        case  "Cooking":
            return "/img/icons/cooking.png";
        case "Gardening and Horticulture":
            return "/img/icons/Gardening and Horticulture.png";
        case "Everyday Life skills" :
            return  "/img/icons/EverydayLifeSkills.png";
        case "Music":
            return "/img/icons/music.png";
        case "Sports":
            return "/img/icons/sports.png";
        case "Technology":
            return "/img/icons/technology.png";
        case "Languages and Culture":
            return "/img/icons/Languages and Culture";
        case "Others":
            return "/img/icons/others.png"        
    }
})

hbs.registerHelper('ifEq', function (category1, category2, options) {
    if (category1 === category2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })
hbs.registerHelper("ifRequesterIsLogged",function (requester, userLogged, options){
    if (requester === userLogged){
         return options.fn(this);
    } else {
        return options.inverse(this)
    }
})
hbs.registerHelper("ifUserRated", function(skillsRatings, currentUser, options) {
    for (let i = 0; i < skillsRatings.length; i++) {
        if (skillsRatings[i].id == currentUser.id) {
            return options.fn(this);
        }
    }
    return options.inverse(this);
});


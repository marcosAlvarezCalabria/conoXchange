const hbs = require('hbs')

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

   
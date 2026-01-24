const hbs = require('hbs');
const { options } = require('./routes.config');
const daysJs = require("./dayjs.config");



hbs.registerPartials(`${__dirname}/../views/partials`);
hbs.registerHelper("categoryImage", function (category) {
    const normalizedCategory = category?.toLowerCase();
    switch (normalizedCategory) {
        case "crafts":
            return "/img/icons/crafts.png";
        case "cooking":
            return "/img/icons/cooking.png";
        case "gardening and horticulture":
            return "/img/icons/gardening and horticulture.png";
        case "everyday life skills":
            return "/img/icons/everyday life skills.png";
        case "music":
            return "/img/icons/music.png";
        case "sports":
            return "/img/icons/sports.png";
        case "technology":
            return "/img/icons/technology.png";
        case "languages and culture":
            return "/img/icons/languages and culture.png";
        case "others":
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
hbs.registerHelper("dateFormat", function (options) {
    const { date, format } = options.hash;
    return daysJs(date).format(format || "YYYY-MM-DD HH:mm:ss")

})




hbs.registerHelper("ifRequesterIsLogged", function (requester, userLogged, options) {

    if (requester == userLogged) {
        return options.fn(this);
    } else {
        return options.inverse(this)
    }
})
hbs.registerHelper("ifUserRated", function (skillsRatings, currentUser, options) {
    if (!skillsRatings) {
        return options.fn(this)
    }

    for (let i = 0; i < skillsRatings.length; i++) {
        if (skillsRatings[i].sender.username === currentUser.username) {
            return options.inverse(this);
        }
    }

    return options.fn(this);
});



hbs.registerHelper("random", function(){
    return  Math.floor(Math.random() * 5) + 1;


})

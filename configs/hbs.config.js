const hbs = require('hbs');
const { options } = require('./routes.config');
const daysJs = require("./dayjs.config");



hbs.registerPartials(`${__dirname}/../views/partials`);
hbs.registerHelper("categoryImage", function (category) {

    switch (category) {
        case "Crafts":
            return "/img/icons/crafts.png";
        case "Cooking":
            return "/img/icons/cooking.png";
        case "Gardening and Horticulture":
            return "/img/icons/Gardening and Horticulture.png";
        case "Everyday Life skills":
            return "/img/icons/EverydayLifeSkills.png";
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







const hbs = require('hbs');
const { options } = require('./routes.config');
const daysJs = require("./dayjs.config");
const { INTEREST_OPTIONS } = require("../controllers/users.helpers");



hbs.registerPartials(`${__dirname}/../views/partials`);
hbs.registerHelper("categoryImage", function (category) {
    const normalizedCategory = category?.toLowerCase();
    const match = INTEREST_OPTIONS.find((option) => option.value === normalizedCategory);
    return match?.icon || "/img/icons/others.png";
})

hbs.registerHelper('ifEq', function (category1, category2, options) {
    if (category1 === category2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
})
hbs.registerHelper("hasInterest", function (selectedInterests, value) {
    if (!selectedInterests) return false;
    if (Array.isArray(selectedInterests)) return selectedInterests.includes(value);
    return selectedInterests === value;
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

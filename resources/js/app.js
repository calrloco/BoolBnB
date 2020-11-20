require("./bootstrap");
require("./add");
require("./sponsor");
require("./apt");
var $ = require("jquery");
const Handlebars = require("handlebars");

$(document).ready(function() {
    $(".nav__user-box").click(function() {
        $(".nav__user__menu").toggleClass("active");
        getcards();
    });
    $("#hidenav").click(function() {
        $(this).hide();
        hidenav();
    });
});

// animation
function hidenav() {
    $("nav__search-icon-big").addClass("active-flex");
    $(".nav__search-city").addClass("active-flex");
    $(".nav__search-date-start").addClass("active-flex");
    $(".nav__search-date-end").addClass("active-flex");
    $(".nav__search").addClass("nav__search-large");
    $(".nav__search-button").addClass("nav__search-button-large");
    $(".nav__search-icon-big").addClass("active-flex");
    $("#start-search").addClass("hidden");
}


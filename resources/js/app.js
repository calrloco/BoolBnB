require("./bootstrap");
require("./add");
require("./sponsor");
require("./apt");
var $ = require("jquery");
const Handlebars = require("handlebars");
const { Alert } = require("bootstrap");

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

/// delete messages



$(".delete").click(function() {
    update();
});
function update() {
    const id = $(".delete").attr("data-id");
   
    $.ajax({
        url: "http://127.0.0.1:8000/api/messages/"+id,
        method: "PATCH",
        headers: {
            KEY: "test",
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        success: function(response) {
               alert('ciao');
        },
        error: function() {
            alert('ciaoz');
        }
    });
}

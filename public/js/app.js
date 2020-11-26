let body = $('body');
let openBtn = $('#open');
let closeBtn = $('#close');
let cardImageOverlay = [[$('.card-img-overlay.one'), $('.show-on-hover.item-1')], [$('.card-img-overlay.two'), $('.show-on-hover.item-2')],
    [$('.card-img-overlay.three'), $('.show-on-hover.item-3')]];
const x = window.matchMedia("(min-width: 1200px)");
let imgUploadBtn = document.getElementById('img-upload-btn');
let imgUploadInput = document.getElementById('img-upload-input');
let photo = document.getElementById('photo-test');
photo = $("#photo-test");


$(document).ready(function() {

    toggleMenu();

    myFunction(x);

    x.addEventListener('change', myFunction);

    //imgUploadBtn.addEventListener('click', btnclick);


});

function btnclick() {
    if(imgUploadInput) {
        imgUploadInput.click();
    }
}

function getURL(input) {
    if(input.files && input.files[0]) {
        let fReader = new FileReader();

        fReader.onload = function(e) {
            //photo.setAttribute('src', e.target.result);
            photo.css({'background-image' : "url(" + e.target.result +")", "background-size" : "cover"});
        };

        fReader.readAsDataURL(input.files[0]);
    }



}


function myFunction(x) {
    if (x.matches) { // If media query matches
        cardImageOverlay.forEach(element => element[0].hover(function(){element[1].show()}, function (){element[1].hide()}));
    } else {
        cardImageOverlay.forEach(element => element[0].hover(function(){element[1].hide()}, function (){element[1].hide()}));
    }
}


let toggleMenu = function() {
    return $('#navbar-toggle-btn').click(function (e) {
        e.preventDefault();
        $('.menu').toggleClass('pull-sidebar');
        $('.menu-bottom-wrapper').toggleClass('pull-bottom-navbar');

        if(openBtn.hasClass('show')) {
            openBtn.removeClass('show').addClass('hide');
            closeBtn.removeClass('hide').addClass('show');
        } else {
            closeBtn.removeClass('show').addClass('hide');
            openBtn.removeClass('hide').addClass('show');
        }

    })
}

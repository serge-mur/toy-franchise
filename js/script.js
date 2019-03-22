$(document).ready(function(){
    
    $("#main-menu .nav-link").on("click", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
    });

// back to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#back-to-top').click(function () {
        event.preventDefault();          
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

// slider    
    $('.markets-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });

// mask
    $("[name='phone']").mask("+7(999) 999-9999");   

// forms
    $('form').submit(function(e) {

        var $form = $(this);
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize()
        }).done(function(data) {
            swal(data);
            console.log(data);
        }).fail(function(data) {
            console.log(data);
        });

        e.preventDefault();
    });    

// off canvas menu    
    $('#offCanvas').offcanvas({
        modifiers: 'left, overlay', // default options
        triggerButton: '#triggerButton' // btn to open offcanvas
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 900) {
            $('#triggerButton').fadeIn();
        } else {
            $('#triggerButton').fadeOut();
        }
    });

    var dataOffcanvas = $('#offCanvas').data('offcanvas-component');
    $("#offCanvas .nav-link").on("click", function (event) {
        event.preventDefault();        
        dataOffcanvas.close();
        var id = $(this).attr('href'),         
            top = $(id).offset().top;       
        $('body,html').animate({scrollTop: top}, 1000);
    });

// yandex maps
    ymaps.ready()
    .done(function (ym) {
        var myMap = new ym.Map('YMapsID', {
            center: [55.753215, 37.622504],
            zoom: 10,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        });

        myMap.behaviors.disable('scrollZoom');
        myMap.behaviors.disable('drag');

        jQuery.getJSON('data2.json', function (json) {
            /** Сохраним ссылку на геообъекты на случай, если понадобится какая-либо постобработка.
            * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoQueryResult.xml
            */
            var geoObjects = ym.geoQuery(json)
                    .addToMap(myMap)
                    .applyBoundsToMap(myMap, {
                        checkZoomRange: false
                    });
        });
    });  


});
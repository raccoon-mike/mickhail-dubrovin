$('.multiple-items').slick({
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,
    responsive: [
        {
            breakpoint: 1100,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});

// Элемент, куда вы хотите записать страницы
let pages = $('.paging-info');
// Элемент слайдера
let slider = $('.slider');

var mediaQuerySmall = window.matchMedia('(min-width: 300px)');

if (mediaQuerySmall.matches) {
    slider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {

        let i = (currentSlide / 1 ? currentSlide / 1 : 0) + 1;
        pages.text(i + ' / ' + slick.slideCount / 1);
    });
};

var mediaQueryMedium = window.matchMedia('(min-width: 700px)');

if (mediaQueryMedium.matches) {
    slider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {

        let i = (currentSlide / 2 ? currentSlide / 2 : 0) + 1;
        pages.text(i + ' / ' + slick.slideCount / 2);
    });
};

var mediaQueryLarge = window.matchMedia('(min-width: 1200px)');

if (mediaQueryLarge.matches) {
    // я выполнюсь только если ширина экрана 1500 или больше
    slider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {

        let i = (currentSlide / 3 ? currentSlide / 3 : 0) + 1;
        pages.text(i + ' / ' + slick.slideCount / 3);
    });

}
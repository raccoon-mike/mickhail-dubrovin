let search = document.querySelector('.header__btn-search');
let headerBtn = document.querySelectorAll('.header__btn');
let form = document.querySelector('.header__form');
let close = document.querySelector('.header__btn-close');

search.addEventListener('click', 

    function() {

        search.classList.toggle('header__btn--active');

        close.classList.remove('header__btn--hidden');

        close.disabled = false;

        form.classList.remove('header__form--hidden');
    })

close.addEventListener('click', 

    function() {
        close.classList.toggle('header__btn--hidden');

        close.disabled = true;

        form.classList.toggle('header__form--hidden');

        search.classList.remove('header__btn--active');
    })


let burger = document.querySelector('.burger');
let menu = document.querySelector('.header__nav');
let menuLinks = menu.querySelectorAll('.nav__link');

burger.addEventListener('click',

    function () {

        burger.classList.toggle('burger--active');

        menu.classList.toggle('header__nav--active');

        document.body.classList.toggle('stop-scroll');
    })

menuLinks.forEach(function (el) {
    el.addEventListener('click', function () {

        burger.classList.remove('burger--active');

        menu.classList.remove('header__nav--active');

        document.body.classList.remove('stop-scroll');
    })
})

const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 100,
    loop: true,

    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
});

document.querySelectorAll('.tabs-nav__btn').forEach(function(tabsBtn) {
    tabsBtn.addEventListener('click', function(e) {
        const path = e.currentTarget.dataset.path;

        document.querySelectorAll('.tabs-nav__btn').forEach(function(btn) {
            btn.classList.remove('tabs-nav__btn--active')
        });

        e.currentTarget.classList.add('tabs-nav__btn--active');

        document.querySelectorAll('.tabs-item').forEach(function(tabsBtn) {
            tabsBtn.classList.remove('tabs-item--active')
        });

        document.querySelector(`[data-target="${path}"]`).classList.add('tabs-item--active');
    });
});

$(".accordion").accordion({
    collapsible: true,
    active: false
});
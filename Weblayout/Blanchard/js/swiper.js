const swiper1 = new Swiper('.swiper-1', {
  // Optional parameters
  loop: true,
  slidesPerView: 1,
  autoplay: {
    delay: 5000,
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
});

const swiper2 = new Swiper('.swiper-2', {
    // Optional parameters
    loop: true,
    slidesPerView: 1,
    spaceBetween: 50,
    // autoplay: true,
    breakpoints: {
        700: {
            slidesPerView: 2,
            spaceBetween: 34,
            slidesPerGroup: 2,
        },
        1000: {
            slidesPerView: 3,
            spaceBetween: 27,
            slidesPerGroup: 3,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 50,
        }
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
});

const swiper3 = new Swiper('.swiper-3', {
    // Optional parameters
    loop: true,
    slidesPerView: 1,
    spaceBetween: 50,
    // autoplay: true,
    breakpoints: {
        700: {
            slidesPerView: 2,
            spaceBetween: 34,
        },
        1000: {
            slidesPerView: 2,
            spaceBetween: 50,
            slidesPerGroup: 2,
        },
        1500: {
            slidesPerView: 3,
            spaceBetween: 50,
            slidesPerGroup: 3,
        }
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

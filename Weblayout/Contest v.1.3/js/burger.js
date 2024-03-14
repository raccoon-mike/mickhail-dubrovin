let burger = document.querySelector('.burger');
let menu = document.querySelector('.headerRight');

burger.addEventListener('click',

    function () {

        burger.classList.toggle('burger--active');

        menu.classList.toggle('headerRight--active');

        document.body.classList.toggle('stop-scroll');
    }
)

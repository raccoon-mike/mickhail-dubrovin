let search = document.querySelector('.search__btn');
let form = document.querySelector('.hero__form');
let close = document.querySelector('.close__btn');

search.addEventListener('click',

    function () {

        search.classList.toggle('search__btn--active');

        close.classList.toggle('close__btn--active');

        close.disabled = false;

        form.classList.toggle('hero__form--active');
    })

close.addEventListener('click',

    function () {
        close.classList.remove('close__btn--active');

        close.disabled = true;

        form.classList.remove('hero__form--active');

        search.classList.remove('search__btn--active');
    })
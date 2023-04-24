document.querySelectorAll('.accordion__content').forEach(function (accordionBtn) {
  accordionBtn.addEventListener('click', function (e) {
    const path = e.currentTarget.dataset.path;

    document.querySelectorAll('.accordion__content').forEach(function (btn) {
      btn.classList.remove('accordion__content--active')
    });

    e.currentTarget.classList.add('accordion__content--active');

    document.querySelectorAll('.catalog__card').forEach(function (accordionBtn) {
      accordionBtn.classList.remove('catalog__card--active')
    });

    document.querySelector(`[data-target="${path}"]`).classList.add('catalog__card--active');
  });
});

document.querySelectorAll('.accordion-header').forEach(function (accordionHeader) {
  accordionHeader.addEventListener('click', function (f) {
    const path2 = f.currentTarget.dataset.path

    if (document.querySelector(`[data-target="${path2}"]`).classList.contains('open')) {
      document.querySelector(`[data-target="${path2}"]`).classList.toggle('open')
    }
    else {
      document.querySelectorAll('.accordion-item').forEach(function (r) {
        r.classList.remove('open')
      });

      document.querySelector(`[data-target="${path2}"]`).classList.toggle('open')
    };
  });
});

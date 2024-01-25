const wrapper = document.querySelector('.wrapper');
const layers = document.querySelectorAll('.parallax__layer');
const layers2 = document.querySelectorAll('.parallax__layer-2');
const layers3 = document.querySelectorAll('.parallax__layer-3');
const layers4 = document.querySelectorAll('.triangle-box');

const handleParallax = (evt) => {
    //размер области просмотра
    const parallaxLeftOffset = wrapper.getBoundingClientRect().left;
    const parallaxTopOffset = wrapper.getBoundingClientRect().top;

    // координаты центра экрана
    const coordX = evt.clientX - parallaxLeftOffset - 0.5 * wrapper.offsetWidth;
    const coordY = evt.clientY - parallaxTopOffset - 0.5 * wrapper.offsetHeight;

    layers.forEach((layer) => {
        const layerSpeed = layer.dataset.speed;
        const x = - (coordX * layerSpeed).toFixed(2);
        const y = - (coordY * layerSpeed).toFixed(2);
        layer.setAttribute('style', `transform: translate(${x}px, ${y}px) rotate(${x}deg);`)
    });

    layers2.forEach((layer) => {
        const layerSpeed = layer.dataset.speed;
        const y = - (coordY * layerSpeed).toFixed(2);
        layer.setAttribute('style', `transform: rotate(${y}deg);`)
    });

    layers3.forEach((layer) => {
        const layerSpeed = layer.dataset.speed;
        const x = - (coordX * layerSpeed).toFixed(2);
        const y = - (coordY * layerSpeed).toFixed(2);
        layer.setAttribute('style', `transform: translate(${-x}px, ${-y}px) rotate(${y}deg);`)
    });

    layers4.forEach((layer) => {
        const layerSpeed = layer.dataset.speed;
        const x = - (coordX * layerSpeed).toFixed(2);
        const y = - (coordY * layerSpeed).toFixed(2);
        layer.setAttribute('style', `transform: translate(${0.3 * x}px, ${0.3 * y}px)`)
    });
};

const reset = () => {
    layers.forEach((layer) => {
        layer.removeAttribute('style');
    });
    layers2.forEach((layer) => {
        layer.removeAttribute('style');
    });
    layers3.forEach((layer) => {
        layer.removeAttribute('style');
    });
    layers4.forEach((layer) => {
        layer.removeAttribute('style');
    });
}

wrapper.addEventListener('mousemove', handleParallax);
wrapper.addEventListener('mouseout', reset);
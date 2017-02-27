// Initialize slider if exist on a page

if ($('#slider-main').length) {
    Slider.init({
        id: 'slider-main',
        autoplay: true, // default: false
        // loop: false, // default: true
        // slideDuration: 4000, // default: 5000
        // transitionDuration: 500 // default: 1000
    });
}

var Slider = (function () {

    // Component variables
    var timeout;

    // Slides
    var $slider,
        $slides,
        length,
        current = 0;

    // Controls
    var $controlPrev,
        $controlNext;

    // Options
    var autoplay,
        loop,
        slideDuration,
        transitionDuration;

    // Show previous/next slide
    var _move = function (isLeft) {

        // Slide that will be shown next
        var next;

        // Going left (show previous slide)
        if (isLeft) {

            // Check if slide can be shown
            if (current === 0 && !loop) {
                return;
            }

            // Get slide
            next = current === 0 ? length - 1 : current - 1;

            // Hide prev control button if can't go more left
            if (next === 0 && !loop) {
                $controlPrev.hide();
            }

            // Show next control button if hidden
            if ($controlNext.is(':hidden')) {
                $controlNext.show();
            }

        } else { // Going right (show next slide)

            // Check if slide can be shown
            if (current === length - 1 && !loop) {
                return;
            }

            // Get slide
            next = current === length - 1 ? 0 : current + 1;

            // Hide next control button if can't go more right
            if (next === length - 1 && !loop) {
                $controlNext.hide();
            }

            // Show prev control button if hidden
            if ($controlPrev.is(':hidden')) {
                $controlPrev.show();
            }

        }

        // Show next slide and...
        $slides.eq(next).fadeIn(transitionDuration);

        // ...hide current slide at the same time
        $slides.eq(current).fadeOut(transitionDuration);

        // Set new slide as current active slide
        current = next;

        // Show next slide after some time
        if (autoplay) {
            clearTimeout(timeout);
            timeout = setTimeout(_move, slideDuration);
        }

    };

    // Initialize slider
    var init = function (options) {

        // Slider
        $slider = $('#' + options.id);
        $slides = $slider.find('.slider-slide');
        length = $slides.length;

        // Controls
        $controlPrev = $slider.find('.slider-controls-prev');
        $controlNext = $slider.find('.slider-controls-next');

        // Default options
        autoplay = options.autoplay !== undefined ? options.autoplay : false;
        loop = options.loop !== undefined ? options.loop : true;
        slideDuration = options.slideDuration || 5000;
        transitionDuration = options.transitionDuration || 1000;

        // Hide prev control button if can't go left
        if (!loop) {
            $controlPrev.hide();
        }

        // Controls listeners
        $controlPrev.on('click', function () {
            _move(true);
        });

        $controlNext.on('click', function () {
            _move();
        });

        // Show next slide after some time
        if (autoplay) {
            timeout = setTimeout(_move, slideDuration);
        }

    };

    // Return public object
    return {
        init: init
    };

})();

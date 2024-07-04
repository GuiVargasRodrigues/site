window.addEventListener('scroll', function() {
    let scrollPosition = window.pageYOffset;
    let parallaxElements = document.querySelectorAll('.parallax-container');

    parallaxElements.forEach(function(elem) {
        let depth = 0.5;
        let movement = -(scrollPosition * depth);
        elem.style.transform = `translateY(${movement}px)`;
    });
});

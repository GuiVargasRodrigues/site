window.addEventListener('scroll', function() {
    let scrollPosition = window.pageYOffset;
    let parallaxElements = document.querySelectorAll('.parallax-container:before');

    parallaxElements.forEach(function(elem, _parallax) {
        let depth = 0.5;
        let movement = -(scrollPosition * depth);
        elem.style.transform = `translateY(${movement}px)`;
    });
});

// JavaScript for scroll animation
document.addEventListener('DOMContentLoaded', function () {
    const services = document.querySelectorAll('.service');

    function checkVisibility() {
        const windowHeight = window.innerHeight;

        services.forEach(service => {
            const serviceRect = service.getBoundingClientRect();
            if (serviceRect.top < windowHeight * 0.75 && serviceRect.bottom >= 0) {
                service.classList.add('visible'); // Add class to make it visible
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Check visibility on initial load
});

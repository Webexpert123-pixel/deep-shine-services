const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  document.querySelector(".nav-bar").classList.toggle("active");
});

// Function to add 'in-view' class for scroll animation
const serviceCards = document.querySelectorAll(".service-card");

function handleScroll() {
  serviceCards.forEach((card) => {
    const cardPosition = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (cardPosition < windowHeight - 50) {
      card.classList.add("in-view");
    } else {
      card.classList.remove("in-view");
    }
  });
}

window.addEventListener("scroll", handleScroll);
let currentSlide = 1;  // Start from the first real slide
const sliderTrack = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slideWidth = slides[0].offsetWidth + 20;  // Adjust for width + margin

// Clone first and last slides for seamless loop
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);

sliderTrack.appendChild(firstClone);  // Clone first slide at the end
sliderTrack.insertBefore(lastClone, slides[0]);  // Clone last slide at the beginning

// Set initial position to the first real slide
sliderTrack.style.transform = `translateX(-${slideWidth}px)`;

// Move to the next slide
function nextSlide() {
    currentSlide++;
    sliderTrack.style.transition = 'transform 0.5s ease-in-out';
    sliderTrack.style.transform = `translateX(-${slideWidth * currentSlide}px)`;

    // If we reach the cloned first slide, reset to the real first slide
    if (currentSlide === totalSlides + 1) {
        setTimeout(() => {
            sliderTrack.style.transition = 'none';  // Disable animation for instant reset
            currentSlide = 1;  // Jump to the real first slide
            sliderTrack.style.transform = `translateX(-${slideWidth}px)`;
        }, 500);  // Wait for the animation to complete before resetting
    }
}

// Move to the previous slide
function prevSlide() {
    currentSlide--;
    sliderTrack.style.transition = 'transform 0.5s ease-in-out';
    sliderTrack.style.transform = `translateX(-${slideWidth * currentSlide}px)`;

    // If we move to the cloned last slide, reset to the real last slide
    if (currentSlide === 0) {
        setTimeout(() => {
            sliderTrack.style.transition = 'none';  // Disable animation for instant reset
            currentSlide = totalSlides;  // Jump to the real last slide
            sliderTrack.style.transform = `translateX(-${slideWidth * totalSlides}px)`;
        }, 500);  // Wait for the animation to complete before resetting
    }
}

// Auto slide every 3 seconds
let autoSlide = setInterval(nextSlide, 3000);

// Pause the auto slide when manually interacting
document.getElementById('nextButton').addEventListener('click', () => {
    clearInterval(autoSlide);
    nextSlide();
    autoSlide = setInterval(nextSlide, 3000);  // Restart auto slide after interaction
});

document.getElementById('prevButton').addEventListener('click', () => {
    clearInterval(autoSlide);
    prevSlide();
    autoSlide = setInterval(nextSlide, 3000);  // Restart auto slide after interaction
});

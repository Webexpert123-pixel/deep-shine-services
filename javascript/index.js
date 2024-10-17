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

document.addEventListener("DOMContentLoaded", function() {
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  
  function scrollToTop() {
    console.log("Scroll to top triggered"); // Debug line
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function toggleScrollButton() {
    if (window.scrollY > 200) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  }

  window.addEventListener('scroll', toggleScrollButton);
  scrollToTopBtn.addEventListener('click', scrollToTop);
});
const dots = document.querySelectorAll('.dot');
const testimonials = document.querySelectorAll('.testimonial-item');

// Function to show the selected testimonial
function showTestimonial(index) {
  testimonials.forEach((item, idx) => {
    item.classList.remove('active');
    dots[idx].classList.remove('active');
  });
  testimonials[index].classList.add('active');
  dots[index].classList.add('active');
}

// Add click event to each dot
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showTestimonial(index);
  });
});
let touchStartX = 0;
let touchEndX = 0;

const slider = document.querySelector('.testimonial-slider');

function handleGesture() {
  if (touchEndX < touchStartX) {
    // Swiped left
    nextTestimonial();
  }
  if (touchEndX > touchStartX) {
    // Swiped right
    prevTestimonial();
  }
}

slider.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchmove', (e) => {
  touchEndX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', handleGesture);

// Logic to go to the next/previous testimonial
function nextTestimonial() {
  let activeIndex = Array.from(testimonials).findIndex((item) => item.classList.contains('active'));
  let nextIndex = (activeIndex + 1) % testimonials.length;
  showTestimonial(nextIndex);
}

function prevTestimonial() {
  let activeIndex = Array.from(testimonials).findIndex((item) => item.classList.contains('active'));
  let prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(prevIndex);
}

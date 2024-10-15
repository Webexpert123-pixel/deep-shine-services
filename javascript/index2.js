// Function to make the certificate slider loop infinitely
window.addEventListener('load', function() {
    const slider = document.querySelector('.certificate-slider');
    const sliderWidth = slider.scrollWidth;
    let currentPosition = 0;
  
    function slideCertificates() {
      currentPosition -= 2; // Move slider 2px to the left each frame
      if (Math.abs(currentPosition) >= sliderWidth / 2) {
        currentPosition = 0; // Reset position when half the slider has scrolled
      }
      slider.style.transform = `translateX(${currentPosition}px)`;
      requestAnimationFrame(slideCertificates);
    }
  
    slideCertificates(); // Start the infinite sliding
  });
  
  // On scroll animation for zoom effect
  window.addEventListener('scroll', () => {
    const certificateSection = document.querySelector('.certificate-section');
    const sectionPosition = certificateSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.5;
  
    if (sectionPosition < screenPosition) {
      certificateSection.classList.add('scrolled');
    } else {
      certificateSection.classList.remove('scrolled');
    }
  });
  // index.js

window.addEventListener('scroll', function () {
  const progressSection = document.querySelector('.progress-bars');
  const sectionPosition = progressSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight;

  if (sectionPosition < screenPosition) {
    animateProgressBars();
  }
});

function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar');
  const percentages = document.querySelectorAll('.percentage');

  progressBars.forEach((bar, index) => {
    let width = 0;
    const targetWidth = bar.classList.contains('commercial')
      ? 90
      : bar.classList.contains('residential')
      ? 70
      : 50;

    const interval = setInterval(() => {
      if (width >= targetWidth) {
        clearInterval(interval);
      } else {
        width++;
        bar.style.width = width + '%';
        percentages[index].textContent = width + '%';
      }
    }, 15);
  });
}

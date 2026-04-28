/* ================= DOM CONTENT LOADED ================= */
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');

  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });
});


/* ================= HERO SLIDER ================= */
const slides = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let currentSlide = 0;

// Show Slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

// Next / Prev
next.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

prev.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

// Auto Slide every 5 seconds
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);


/* ================= COUNTER ANIMATION ================= */
const counters = document.querySelectorAll('.counter');

function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  let current = 0;
  const speed = target / 150;

  function update() {
    current += speed;

    if (current < target) {
      counter.textContent =
        target >= 1000
          ? Math.floor(current / 1000) + "K"
          : Math.floor(current);

      requestAnimationFrame(update);
    } else {
      counter.textContent =
        target >= 1000
          ? Math.floor(target / 1000) + "K"
          : target;
    }
  }

  update();
}


/* ================= INTERSECTION OBSERVER ================= */
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

// Observe all counters
counters.forEach(counter => observer.observe(counter));

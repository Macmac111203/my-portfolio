// Welcome message
console.log("🚀 Welcome to Marc's Portfolio 2025!");

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const currentTheme = savedTheme || (prefersDark.matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);
}

// Update theme icon
function updateThemeIcon(theme) {
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
}

// Toggle theme
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

// Initialize theme on load
initTheme();

// Listen for system theme changes
prefersDark.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
    updateThemeIcon(e.matches ? "dark" : "light");
  }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");

mobileMenuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenuToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    navLinks.classList.contains("active") &&
    !navLinks.contains(e.target) &&
    !mobileMenuToggle.contains(e.target)
  ) {
    navLinks.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
  }
});

// Typing Effect
const typingText = document.querySelector(".typed-text");
const typingOptions = [
  "Game Developer 🎮",
  "Creative IT Student 💻",
  "Full-Stack Developer 🚀",
  "IoT Enthusiast 🔧",
  "Digital Creator ✨",
];

let currentOption = 0;
let currentChar = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
  if (!typingText) return;

  const fullText = typingOptions[currentOption];

  if (isDeleting) {
    typingText.textContent = fullText.substring(0, currentChar - 1);
    currentChar--;
    typingSpeed = 50;
  } else {
    typingText.textContent = fullText.substring(0, currentChar + 1);
    currentChar++;
    typingSpeed = 100;
  }

  if (!isDeleting && currentChar === fullText.length) {
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && currentChar === 0) {
    isDeleting = false;
    currentOption = (currentOption + 1) % typingOptions.length;
    typingSpeed = 500;
  }

  setTimeout(typeText, typingSpeed);
}

// Start typing effect
if (typingText) {
  setTimeout(typeText, 1000);
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Scroll Animation with Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll(".section, .project-card, .skill-category, .contact-item").forEach((el) => {
  observer.observe(el);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// Animate numbers in stats
function animateNumbers() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const target = stat.textContent;
    const isPercentage = target.includes("%");
    const numericValue = parseInt(target.replace(/[^0-9]/g, ""));

    if (isNaN(numericValue)) return;

    let current = 0;
    const increment = numericValue / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        stat.textContent = target;
        clearInterval(timer);
      } else {
        const displayValue = Math.floor(current);
        stat.textContent = isPercentage ? `${displayValue}%` : `${displayValue}+`;
      }
    }, stepTime);
  });
}

// Observe stats section for animation
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateNumbers();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".about-stats");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Add parallax effect to gradient blobs
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const blobs = document.querySelectorAll(".gradient-blob");

  blobs.forEach((blob, index) => {
    const speed = (index + 1) * 0.5;
    const yPos = -(scrolled * speed);
    blob.style.transform = `translateY(${yPos}px)`;
  });
});

// Project card interactions
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add ripple effect to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Performance optimization: Lazy load images if any are added later
if ("loading" in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach((img) => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  document.body.appendChild(script);
}

// Add active state to navigation links on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".section, .hero");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Console easter egg
console.log(
  "%c👋 Hey there! 👋",
  "font-size: 20px; font-weight: bold; color: #6366f1;"
);
console.log(
  "%cInterested in the code? Check out my GitHub: https://github.com/Macmac111203",
  "font-size: 14px; color: #64748b;"
);
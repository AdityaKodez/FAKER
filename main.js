gsap.registerPlugin(ScrollTrigger);

// Loader
window.addEventListener('load', function() {
  const loader = document.querySelector('.loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 1500);
});

// Navbar visibility and scroll progress
const navbar = document.querySelector('.navbar');
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('visible');
  } else {
    navbar.classList.remove('visible');
  }
  
  // Update scroll progress
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / scrollHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Footer links smooth scroll
document.querySelectorAll('.footer-section a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Locomotive Scroll setup
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
  smartphone: {
    smooth: true
  },
  tablet: {
    smooth: true
  }
});

// Sync Locomotive Scroll with ScrollTrigger
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

// Page 1 Animations
gsap.from(".page1 h1", {
  y: 100,
  opacity: 0,
  delay: 1.8,
  duration: 0.8,
  stagger: 0.3
});

gsap.from(".page1 .video-container", {
  scale: 0.9,
  opacity: 0,
  delay: 2.5,
  duration: 0.6,
});

// Video container parallax
gsap.to(".page1 .video-container", {
  y: 20,
  duration: 3,
  scrollTrigger: {
    trigger: ".page1",
    scroller: ".main",
    start: "top -100%",
    end: "bottom 100%",
    scrub: 2,
  }
});

// Page 2 Animations - Marquee entrance
gsap.from(".moving", {
  opacity: 0,
  x: -100,
  duration: 1,
  scrollTrigger: {
    trigger: ".page2",
    scroller: ".main",
    start: "top 80%",
    end: "top 50%",
    scrub: 1,
  }
});

// Bottom section text animation
gsap.from(".bottom .main-text", {
  opacity: 0,
  y: 40,
  duration: 5,
  scrollTrigger: {
    trigger: ".bottom",
    scroller: ".main",
    start: "top 80%",
    end: "bottom 70%",
    scrub: 2,
  },
});

// Bottom section image animation
gsap.from(".bottom img", {
  opacity: 0,
  scale: 0.8,
  rotate: -5,
  duration: 1,
  scrollTrigger: {
    trigger: ".bottom",
    scroller: ".main",
    start: "top 70%",
    end: "top 40%",
    scrub: 1,
  }
});

// Bottom section paragraph animation
gsap.from(".bottom2 p", {
  opacity: 0,
  y: 20,
  duration: 1,
  scrollTrigger: {
    trigger: ".bottom2",
    scroller: ".main",
    start: "top 80%",
    end: "top 60%",
    scrub: 1,
  }
});

// Page 3 Timeline Elements - Staggered Animation
const elems = document.querySelectorAll(".elem");
elems.forEach((elem, index) => {
  gsap.from(elem, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: elem,
      scroller: ".main",
      start: "top 85%",
      end: "top 60%",
      scrub: 1,
    }
  });
});

// Timeline hover preview
const elemContainer = document.querySelector(".elem-container");
const fixed = document.querySelector(".fixed");

if (elemContainer && fixed) {
  elemContainer.addEventListener("mouseenter", function() {
    fixed.style.display = "block";
  });
  
  elemContainer.addEventListener("mouseleave", function() {
    fixed.style.display = "none";
  });
  
  elemContainer.addEventListener("mousemove", function(e) {
    fixed.style.left = e.clientX + "px";
    fixed.style.top = e.clientY + "px";
  });
  
  elems.forEach(function(elem) {
    elem.addEventListener("mouseenter", function() {
      const image = elem.getAttribute("data-image");
      fixed.style.backgroundImage = `url(${image})`;
      
      gsap.to(fixed, {
        scale: 1,
        opacity: 1,
        duration: 0.3
      });
    });
    
    elem.addEventListener("mouseleave", function() {
      gsap.to(fixed, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3
      });
    });
  });
}

// Page 4 Quotes Section Animation
gsap.from(".page4 .acha", {
  opacity: 0,
  x: -30,
  duration: 1,
  scrollTrigger: {
    trigger: ".page4",
    scroller: ".main",
    start: "top 80%",
    end: "top 60%",
    scrub: 1,
  }
});

// Swiper Configuration with autoplay
const swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 45,
  loop: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  speed: 800,
  effect: "slide",
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      spaceBetween: 20,
    },
    768: {
      spaceBetween: 30,
    },
    1024: {
      spaceBetween: 45,
    },
  }
});

// Swiper slides entrance animation
gsap.from(".swiper-slide", {
  opacity: 0,
  y: 30,
  duration: 1,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".page4",
    scroller: ".main",
    start: "top 70%",
    end: "top 40%",
    scrub: 1,
  }
});

// Footer entrance animation
gsap.from(".footer", {
  opacity: 0,
  y: 50,
  duration: 1,
  scrollTrigger: {
    trigger: ".footer",
    scroller: ".main",
    start: "top 90%",
    end: "top 70%",
    scrub: 1,
  }
});

// Footer sections staggered animation
gsap.from(".footer-section", {
  opacity: 0,
  y: 30,
  duration: 1,
  stagger: 0.15,
  scrollTrigger: {
    trigger: ".footer",
    scroller: ".main",
    start: "top 85%",
    end: "top 65%",
    scrub: 1,
  }
});

// Video error handling
const video = document.querySelector('.video1');
if (video) {
  video.addEventListener('error', function() {
    console.error('Video failed to load');
    const container = this.parentElement;
    container.style.background = 'linear-gradient(135deg, #1c59db 0%, #4076eb 100%)';
    container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; font-family: futura; font-size: 2rem;">FAKER</div>';
  });
}

// Active nav link highlighting
const sections = document.querySelectorAll('.page1, .page2, .page3, .page4');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Add parallax effect to shapes
gsap.to(".shape", {
  y: -50,
  rotation: 5,
  scrollTrigger: {
    trigger: ".page1",
    scroller: ".main",
    start: "top top",
    end: "bottom top",
    scrub: 2,
  }
});

// Optimize animations for performance
gsap.set([".hero1", ".hero2", ".hero3", ".gooey"], {
  willChange: "transform"
});

// Clean up will-change after animations
setTimeout(() => {
  gsap.set([".hero1", ".hero2", ".hero3", ".gooey"], {
    willChange: "auto"
  });
}, 5000);

// Update on resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    locoScroll.update();
    ScrollTrigger.refresh();
  }, 250);
});

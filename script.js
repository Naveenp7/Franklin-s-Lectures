document.addEventListener('DOMContentLoaded', function() {
  
  // get rid of preloader
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    preloader.classList.add('fade-out');
    document.body.classList.remove('loading');
  });

  // mobile nav stuff
  var mobileToggle = document.getElementById('mobile-toggle');
  var navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-links a');

  mobileToggle.addEventListener('click', function() {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    let isExpanded = mobileToggle.classList.contains('active');
    mobileToggle.setAttribute('aria-expanded', isExpanded);
  });

  // close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // shrink navbar on scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  // 3D tilt effect for cards
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      
      // Update glow position if it exists
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });


  // scroll reveal with Intersection Observer
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .scale-up, .stagger-child');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15 // trigger at 15% visibility
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // faq accordion behavior
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // close all first
      faqItems.forEach(faq => faq.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // fallback if load event was missed
  if (document.readyState === 'complete') {
    preloader.classList.add('fade-out');
    document.body.classList.remove('loading');
  }

  // whatsapp floating tooltip
  const waTooltip = document.querySelector('.whatsapp-tooltip');
  if (waTooltip) {
    setTimeout(function() {
      waTooltip.classList.add('show');
      
      // hide after 6s
      setTimeout(() => {
        waTooltip.classList.remove('show');
      }, 6000);
    }, 4000);
  }

  // dynamic text typer in hero
  const dynamicText = document.querySelector('.dynamic-text');
  if (dynamicText) {
    const words = ["Engineering", "Coding", "Your Future", "Design"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        dynamicText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        dynamicText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      // Pause at the end of word
      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        // Move to next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    // start typing effect after initial reveal animation (about 1s delay)
    setTimeout(typeEffect, 1000);
  }

  console.log("Franklin's Lectures loaded");
});

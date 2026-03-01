// Dark mode toggle
function initTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.classList.toggle('dark', theme === 'dark');
  updateThemeIcon();
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcon();
}

function updateThemeIcon() {
  const isDark = document.documentElement.classList.contains('dark');
  const sunIcons = document.querySelectorAll('.sun-icon');
  const moonIcons = document.querySelectorAll('.moon-icon');
  
  sunIcons.forEach(icon => icon.style.display = isDark ? 'block' : 'none');
  moonIcons.forEach(icon => icon.style.display = isDark ? 'none' : 'block');
}

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('active');
}

// Navbar scroll effect
function handleScroll() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Active link highlighting
function setActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Show success message
  const message = document.createElement('div');
  message.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: hsl(var(--primary));
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: var(--shadow-elevated);
    z-index: 9999;
    animation: slideDown 0.3s ease-out;
  `;
  message.innerHTML = `
    <strong>Message Sent!</strong><br>
    <span style="font-size: 0.875rem;">We'll get back to you within 24 hours.</span>
  `;
  
  document.body.appendChild(message);
  
  // Remove message after 3 seconds
  setTimeout(() => {
    message.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => message.remove(), 300);
  }, 3000);
  
  // Reset form
  event.target.reset();
}

// Smooth scroll for anchor links
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Add random animation variations
        const animations = ['animate-fade-in', 'animate-slide-up', 'animate-scale-in', 'animate-bounce-in'];
        if (!entry.target.classList.contains('animate-fade-in') && 
            !entry.target.classList.contains('animate-slide-up') &&
            !entry.target.classList.contains('card')) {
          const randomAnim = animations[Math.floor(Math.random() * animations.length)];
          entry.target.style.animation = `${randomAnim.replace('animate-', '')} 0.8s ease-out`;
        }
      }
    });
  }, observerOptions);

  // Observe all cards and major sections
  document.querySelectorAll('.card, section > div').forEach(el => {
    observer.observe(el);
  });
}

// Add parallax effect to hero sections
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[style*="background: linear-gradient"]');
    
    parallaxElements.forEach(el => {
      const speed = 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Add hover 3D effect to cards
function init3DCards() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
  });
}

// Add ripple effect to buttons
function initRippleEffect() {
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// Add floating animation to icons
function initFloatingIcons() {
  document.querySelectorAll('.logo-icon, .card svg').forEach((icon, index) => {
    icon.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
  });
}

// Add typewriter effect to main headings
function initTypewriter() {
  const headings = document.querySelectorAll('h1');
  headings.forEach(heading => {
    const text = heading.textContent;
    heading.textContent = '';
    heading.style.opacity = '1';
    
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        heading.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);
  });
}

// Add magnetic effect to buttons
function initMagneticButtons() {
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0) scale(1)';
    });
  });
}

// Add particles background effect
function initParticles() {
  const createParticle = () => {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: hsl(var(--primary) / 0.3);
      border-radius: 50%;
      pointer-events: none;
      z-index: -1;
      animation: float ${3 + Math.random() * 3}s ease-in-out infinite;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 100}vh;
      opacity: 0.${Math.floor(Math.random() * 5) + 3};
    `;
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 6000);
  };
  
  setInterval(createParticle, 300);
}

// Add smooth reveal animations
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
  
  reveals.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setActiveLink();
  window.addEventListener('scroll', handleScroll);
  
  // Initialize all animations
  setTimeout(() => {
    initScrollAnimations();
    initParallax();
    init3DCards();
    initRippleEffect();
    initFloatingIcons();
    initMagneticButtons();
    initParticles();
    initRevealAnimations();
  }, 100);
  
  // Add fadeOut and ripple animations to CSS
  if (!document.querySelector('#customAnimations')) {
    const style = document.createElement('style');
    style.id = 'customAnimations';
    style.textContent = `
      @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
      }
      @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
      }
      .in-view {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  }
});

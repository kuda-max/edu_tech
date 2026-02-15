// Initialize Lucide Icons
lucide.createIcons();

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
html.classList.add(currentTheme);

themeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        html.classList.add('light');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.remove('light');
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
    lucide.createIcons(); // Re-render icons for theme change
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenu.classList.add('hidden');
    });
});

// Scroll Reveal Animation using Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow and background opacity on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        navbar.style.background = html.classList.contains('dark') 
            ? 'rgba(10, 10, 15, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = html.classList.contains('dark') 
            ? 'rgba(10, 10, 15, 0.8)' 
            : 'rgba(255, 255, 255, 0.9)';
    }
    
    lastScroll = currentScroll;
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Subject Card Click Handler
document.querySelectorAll('.subject-card').forEach(card => {
    card.addEventListener('click', () => {
        const subject = card.querySelector('h4').textContent;
        showToast(`Interested in ${subject}? Book a tutor now!`);
    });
});

// Toast Notification System
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 px-6 py-3 rounded-xl bg-gradient-to-r from-electric-blue to-electric-purple text-white font-semibold shadow-2xl transform translate-y-20 opacity-0 transition-all duration-300 z-50';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Pricing Card Interaction
document.querySelectorAll('.glass-card button').forEach(btn => {
    if (btn.textContent.includes('Get Started')) {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.glass-card');
            const plan = card.querySelector('h3').textContent;
            showToast(`Selected ${plan} plan! Redirecting to checkout...`);
        });
    }
});

// Parallax Effect for Hero Background Elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.animate-float');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Form Validation Enhancement
const form = document.querySelector('form');
if (form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.style.borderColor = '#FF006E';
            } else {
                input.style.borderColor = '#00D9FF';
            }
        });
        
        input.addEventListener('focus', () => {
            input.style.borderColor = '#00D9FF';
        });
    });
}

// Dynamic Year in Footer (if needed)
const yearSpan = document.querySelector('footer p');
if (yearSpan && yearSpan.textContent.includes('2024')) {
    yearSpan.textContent = yearSpan.textContent.replace('2024', new Date().getFullYear());
}

// Performance: Disable animations on mobile for better performance
const isMobile = window.matchMedia('(max-width: 768px)').matches;
if (isMobile) {
    document.querySelectorAll('.animate-float').forEach(el => {
        el.style.animation = 'none';
    });
}

// Initialize animations on load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // GLOW CURSOR
  // ===============================
  const glow = document.getElementById("cursorGlow");

  document.addEventListener("mousemove", (e) => {
    gsap.to(glow, {
      x: e.clientX - 80,
      y: e.clientY - 80,
      duration: 0.4,
      ease: "power3.out"
    });
  });

  // Magnetic hover effect
  document.querySelectorAll("button, a").forEach(el => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5 });
    });
  });

  // ===============================
  // SCROLL PROGRESS BAR
  // ===============================
  const progress = document.getElementById("scrollProgress");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / height) * 100;
    progress.style.width = scrolled + "%";
  });

  // ===============================
  // SECTION WIPE REVEAL
  // ===============================
  gsap.utils.toArray("section").forEach(section => {
    gsap.from(section, {
      clipPath: "inset(0 0 100% 0)",
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
      }
    });
  });

  // ===============================
  // FLOATING PARTICLES
  // ===============================
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div");
    particle.className = "fixed w-2 h-2 bg-emerald-300/40 rounded-full z-[0]";
    document.body.appendChild(particle);

    gsap.set(particle, {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    });

    gsap.to(particle, {
      y: "+=" + (Math.random() * 200 - 100),
      x: "+=" + (Math.random() * 200 - 100),
      repeat: -1,
      yoyo: true,
      duration: Math.random() * 5 + 3,
      ease: "sine.inOut"
    });
  }

});
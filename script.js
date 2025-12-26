// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navigation
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Parallax Effect for Sections
function initParallax() {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        parallaxSections.forEach(section => {
            const speed = parseFloat(section.getAttribute('data-parallax-speed')) || 0.5;
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + scrollTop;
            
            // Check if section is in viewport
            if (rect.bottom >= 0 && rect.top <= windowHeight) {
                const parallaxContent = section.querySelector('.parallax-content');
                
                if (parallaxContent) {
                    // Calculate how much the section has scrolled relative to viewport
                    const scrolled = scrollTop - sectionTop;
                    // Apply parallax effect (negative for upward movement)
                    const offset = scrolled * speed;
                    parallaxContent.style.transform = `translateY(${offset}px)`;
                    parallaxContent.style.transition = 'transform 0.1s ease-out';
                }
            }
        });
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial call
    updateParallax();
    
    // Recalculate on resize
    window.addEventListener('resize', () => {
        updateParallax();
    });
}

// Initialize parallax on page load
document.addEventListener('DOMContentLoaded', () => {
    initParallax();
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe gallery items and cards
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.galeria-item');
    const eventoCards = document.querySelectorAll('.evento-card');
    const experienciaItems = document.querySelectorAll('.experiencia-item');
    const featureItems = document.querySelectorAll('.feature-item');
    
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    eventoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    experienciaItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
});

// Contacto Form Handler
const contactoForm = document.querySelector('.contacto-form');
if (contactoForm) {
    contactoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = contactoForm.querySelector('input[type="text"]').value;
        const email = contactoForm.querySelector('input[type="email"]').value;
        const phone = contactoForm.querySelector('input[type="tel"]').value;
        const message = contactoForm.querySelector('textarea').value;
        
        // Here you would typically send the data to a server
        // For now, we'll just show an alert
        alert(`Gracias por tu mensaje, ${name}. Nos pondremos en contacto contigo pronto.`);
        
        // Reset form
        contactoForm.reset();
    });
}

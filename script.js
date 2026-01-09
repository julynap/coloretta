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
const navPaintDecoration = document.querySelector('.nav-paint-decoration');
const nosotrosSection = document.querySelector('#nosotros');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || window.scrollY;
    const isMobile = window.innerWidth <= 576;
    
    // Obtener la posición de la sección Nosotros
    if (nosotrosSection && !isMobile) {
        const nosotrosRect = nosotrosSection.getBoundingClientRect();
        const nosotrosTop = nosotrosRect.top + currentScroll;
        
        // Si el scroll ha llegado a la sección Nosotros, ocultar el nav y la decoración (solo en desktop)
        if (nosotrosRect.top <= 100) {
            nav.style.display = 'none';
            if (navPaintDecoration) {
                navPaintDecoration.classList.add('hidden');
            }
        } else {
            nav.style.display = 'block';
            if (navPaintDecoration) {
                navPaintDecoration.classList.remove('hidden');
            }
        }
    } else if (isMobile) {
        // En móviles, siempre mostrar el nav y la decoración
        nav.style.display = 'block';
        if (navPaintDecoration) {
            navPaintDecoration.classList.remove('hidden');
        }
    }
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Asegurar que el nav y la decoración sean visibles en móviles al redimensionar
window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= 576;
    if (isMobile) {
        nav.style.display = 'block';
        if (navPaintDecoration) {
            navPaintDecoration.classList.remove('hidden');
        }
    }
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

// Parallax independiente para la galería - se desliza hacia arriba cuando baja el scroll
function initGalleryParallax() {
    const galleryGrid = document.querySelector('.parallax-gallery');
    if (!galleryGrid) return;
    
    function updateGalleryParallax() {
        const scrollTop = window.pageYOffset;
        const galeriaSection = document.querySelector('#galeria');
        if (!galeriaSection) return;
        
        const rect = galeriaSection.getBoundingClientRect();
        const sectionTop = rect.top + scrollTop;
        
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
            const scrolled = scrollTop - sectionTop;
            // Cuando el scroll baja (scrolled aumenta), la galería sube (offset negativo más grande)
            const offset = scrolled * -0.5;
            galleryGrid.style.transform = `translateY(${offset}px)`;
            galleryGrid.style.transition = 'transform 0.1s ease-out';
        }
    }
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateGalleryParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    updateGalleryParallax();
    window.addEventListener('resize', () => {
        updateGalleryParallax();
    });
}

// Parallax Effect for Hero Decorations - Moves independently from content for depth effect
function initHeroDecorationsParallax() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Store initial positions
    const decorations = [
        { selector: '.hero-brush-decoration', defaultSpeed: 0.1, element: null, initialTop: 0 },
        { selector: '.hero-flowers-decoration', defaultSpeed: 0.3, element: null, initialTop: 0 },
        { selector: '.hero-coffee-decoration', defaultSpeed: 0.5, element: null, initialTop: 0 },
        { selector: '.hero-churro-decoration', defaultSpeed: -0.1, element: null, initialTop: 0 },
        { selector: '.hero-flower-blue-decoration', defaultSpeed: -1.3, element: null, initialTop: 0 }
    ];
    
    // Initialize elements
    let brushAnimationComplete = false;
    let flowersAnimationComplete = false;
    let coffeeAnimationComplete = false;
    let churroAnimationComplete = false;
    const brushElement = document.querySelector('.hero-brush-decoration');
    const flowersElement = document.querySelector('.hero-flowers-decoration');
    const coffeeElement = document.querySelector('.hero-coffee-decoration');
    const churroElement = document.querySelector('.hero-churro-decoration');
    
    // Wait for Animate.css animation to complete before applying parallax to brush
    if (brushElement && brushElement.classList.contains('animate__animated')) {
        // Don't apply any transforms until animation completes
        brushElement.style.willChange = 'auto';
        
        const handleAnimationEnd = (e) => {
            // Only proceed if it's the rollIn animation
            if (e.animationName === 'rollIn' || e.animationName.includes('rollIn')) {
                brushAnimationComplete = true;
                brushElement.style.willChange = 'transform';
            }
        };
        
        brushElement.addEventListener('animationend', handleAnimationEnd, { once: true });
        
        // Fallback: if animation doesn't fire, enable after 1.5 seconds
        setTimeout(() => {
            if (!brushAnimationComplete) {
                brushAnimationComplete = true;
                brushElement.style.willChange = 'transform';
            }
        }, 1500);
    } else {
        // If no animation, allow parallax immediately
        brushAnimationComplete = true;
    }
    
    // Wait for Animate.css animation to complete before applying parallax to flowers
    if (flowersElement && flowersElement.classList.contains('animate__animated')) {
        // Don't apply any transforms until animation completes
        flowersElement.style.willChange = 'auto';
        
        const handleFlowersAnimationEnd = (e) => {
            // Only proceed if it's the fadeInBottomLeft animation
            if (e.animationName === 'fadeInBottomLeft' || e.animationName.includes('fadeInBottomLeft')) {
                flowersAnimationComplete = true;
                flowersElement.style.willChange = 'transform';
            }
        };
        
        flowersElement.addEventListener('animationend', handleFlowersAnimationEnd, { once: true });
        
        // Fallback: if animation doesn't fire, enable after 1.5 seconds
        setTimeout(() => {
            if (!flowersAnimationComplete) {
                flowersAnimationComplete = true;
                flowersElement.style.willChange = 'transform';
            }
        }, 1500);
    } else {
        // If no animation, allow parallax immediately
        flowersAnimationComplete = true;
    }
    
    // Wait for Animate.css animation to complete before applying parallax to coffee
    if (coffeeElement && coffeeElement.classList.contains('animate__animated')) {
        // NO modificar nada del elemento para no interferir con la animación
        // Solo esperar a que termine
        
        const handleCoffeeAnimationEnd = (e) => {
            // Only proceed if it's the fadeInBottomRight animation
            if (e.animationName === 'fadeInBottomRight' || e.animationName.includes('fadeInBottomRight') || e.animationName.includes('fadeIn')) {
                coffeeAnimationComplete = true;
                coffeeElement.style.willChange = 'transform';
                // Restaurar el transform original después de la animación
                coffeeElement.classList.add('animation-complete');
            }
        };
        
        coffeeElement.addEventListener('animationend', handleCoffeeAnimationEnd, { once: true });
        
        // Fallback: if animation doesn't fire, enable after 2 seconds (más tiempo)
        setTimeout(() => {
            if (!coffeeAnimationComplete) {
                coffeeAnimationComplete = true;
                coffeeElement.style.willChange = 'transform';
                // Restaurar el transform original
                coffeeElement.classList.add('animation-complete');
            }
        }, 2000);
    } else {
        // If no animation, allow parallax immediately
        coffeeAnimationComplete = true;
    }
    
    // Wait for Animate.css animation to complete before applying parallax to churro
    if (churroElement && churroElement.classList.contains('animate__animated')) {
        // NO modificar nada del elemento para no interferir con la animación
        // Solo esperar a que termine
        
        const handleChurroAnimationEnd = (e) => {
            // Only proceed if it's the fadeInBottomLeft animation
            if (e.animationName === 'fadeInBottomLeft' || e.animationName.includes('fadeInBottomLeft') || e.animationName.includes('fadeIn')) {
                churroAnimationComplete = true;
                churroElement.style.willChange = 'transform';
                // Restaurar el transform original después de la animación
                churroElement.classList.add('animation-complete');
                // Aplicar el transform base inmediatamente
                churroElement.style.setProperty('transform', 'translateY(-50%) rotate(-25deg)', 'important');
            }
        };
        
        churroElement.addEventListener('animationend', handleChurroAnimationEnd, { once: true });
        
        // Fallback: if animation doesn't fire, enable after 2 seconds
        setTimeout(() => {
            if (!churroAnimationComplete) {
                churroAnimationComplete = true;
                churroElement.style.willChange = 'transform';
                // Restaurar el transform original
                churroElement.classList.add('animation-complete');
                // Aplicar el transform base inmediatamente
                churroElement.style.setProperty('transform', 'translateY(-50%) rotate(-25deg)', 'important');
            }
        }, 2000);
    } else {
        // If no animation, allow parallax immediately
        churroAnimationComplete = true;
    }
    
    decorations.forEach(deco => {
        deco.element = document.querySelector(deco.selector);
        if (deco.element) {
            const rect = deco.element.getBoundingClientRect();
            deco.initialTop = rect.top + window.pageYOffset;
        } else {
            console.warn(`Element not found: ${deco.selector}`);
        }
    });
    
    function updateHeroDecorationsParallax() {
        const scrollTop = window.pageYOffset || window.scrollY;
        const heroRect = heroSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Always apply parallax when hero is in viewport
        if (heroRect.bottom >= 0 && heroRect.top <= windowHeight) {
            // Use scrollTop directly multiplied by speed for very visible effect
            decorations.forEach(({ selector, defaultSpeed, element }) => {
                if (element) {
                    // Don't apply parallax to brush until animation completes
                    if (element.classList.contains('hero-brush-decoration') && !brushAnimationComplete) {
                        return;
                    }
                    
                    // Don't apply parallax to flowers until animation completes
                    if (element.classList.contains('hero-flowers-decoration') && !flowersAnimationComplete) {
                        return;
                    }
                    
                    // Don't apply parallax to coffee until animation completes
                    if (element.classList.contains('hero-coffee-decoration') && !coffeeAnimationComplete) {
                        return;
                    }
                    
                    const speed = parseFloat(element.getAttribute('data-parallax-speed')) || defaultSpeed;
                    // Direct calculation with scrollTop - creates immediate visible movement
                    // Multiply by 3 to make it VERY visible
                    const offset = scrollTop * speed * 3;
                    
                    // Preserve existing transforms (like rotate) and add parallax
                    // Use !important to override CSS animations (except during animation)
                    if (element.classList.contains('hero-coffee-decoration') && coffeeAnimationComplete) {
                        // Apply parallax to coffee only after animation completes
                        // Use the base transform from animation-complete class if available
                        const baseTransform = element.classList.contains('animation-complete') 
                            ? 'translateY(-50%) rotate(19deg)' 
                            : 'translateY(-50%) rotate(19deg)';
                        element.style.setProperty('transform', `translateY(calc(-50% + ${offset}px)) rotate(19deg)`, 'important');
                    } else if (element.classList.contains('hero-churro-decoration') && churroAnimationComplete) {
                        // Apply parallax to churro only after animation completes
                        element.style.setProperty('transform', `translateY(calc(-50% + ${offset}px)) rotate(-25deg)`, 'important');
                    } else if (element.classList.contains('hero-brush-decoration') && brushAnimationComplete) {
                        // Apply parallax to brush only after animation completes
                        element.style.setProperty('transform', `translateY(${offset}px)`, 'important');
                    } else if (!element.classList.contains('hero-brush-decoration')) {
                        // For other elements without rotate, apply translateY with parallax
                        element.style.setProperty('transform', `translateY(${offset}px)`, 'important');
                    }
                    // Ensure will-change for better performance
                    element.style.willChange = 'transform';
                }
            });
        } else {
            // Reset transforms when out of viewport
            decorations.forEach(({ element }) => {
                if (element) {
                    if (element.classList.contains('hero-coffee-decoration')) {
                        element.style.transform = `translateY(-50%) rotate(19deg)`;
                    } else if (element.classList.contains('hero-churro-decoration')) {
                        element.style.transform = `translateY(-50%) rotate(-25deg)`;
                    } else {
                        element.style.transform = `translateY(0)`;
                    }
                }
            });
        }
    }
    
    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateHeroDecorationsParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial call
    updateHeroDecorationsParallax();
    
    // Recalculate on resize
    window.addEventListener('resize', () => {
        updateHeroDecorationsParallax();
    });
}

// Parallax para elementos decorativos de la sección nosotros
function initNosotrosDecorationsParallax() {
    const nosotrosSection = document.querySelector('#nosotros');
    if (!nosotrosSection) return;
    
    const decorations = [
        { selector: '.decoration-flores-rosa-wrapper', defaultSpeed: 0.3, element: null },
        { selector: '.decoration-churro-wrapper', defaultSpeed: 0.5, element: null },
        { selector: '.decoration-carita-wrapper', defaultSpeed: -0.2, element: null }
    ];
    
    // Initialize elements
    decorations.forEach(deco => {
        deco.element = document.querySelector(deco.selector);
    });
    
    // Track if animations are complete
    let animationsComplete = {
        flores: false,
        churro: false,
        carita: false
    };
    
    // Wait for initial animations to complete
    const floresElement = decorations.find(d => d.selector === '.decoration-flores-rosa-wrapper')?.element;
    const churroElement = decorations.find(d => d.selector === '.decoration-churro-wrapper')?.element;
    const caritaElement = decorations.find(d => d.selector === '.decoration-carita-wrapper')?.element;
    
    // Check if elements have animation classes and wait for them to complete
    if (floresElement && floresElement.classList.contains('animate__animated')) {
        floresElement.addEventListener('animationend', () => {
            animationsComplete.flores = true;
        }, { once: true });
        setTimeout(() => { animationsComplete.flores = true; }, 2000);
    } else {
        animationsComplete.flores = true;
    }
    
    if (churroElement && churroElement.classList.contains('animate__animated')) {
        churroElement.addEventListener('animationend', () => {
            animationsComplete.churro = true;
        }, { once: true });
        setTimeout(() => { animationsComplete.churro = true; }, 2000);
    } else {
        animationsComplete.churro = true;
    }
    
    if (caritaElement && caritaElement.classList.contains('animate__animated')) {
        caritaElement.addEventListener('animationend', () => {
            animationsComplete.carita = true;
        }, { once: true });
        setTimeout(() => { animationsComplete.carita = true; }, 2000);
    } else {
        animationsComplete.carita = true;
    }
    
    function updateNosotrosDecorationsParallax() {
        const scrollTop = window.pageYOffset || window.scrollY;
        const nosotrosRect = nosotrosSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Only apply parallax when nosotros section is in viewport
        if (nosotrosRect.bottom >= 0 && nosotrosRect.top <= windowHeight) {
            decorations.forEach(({ selector, defaultSpeed, element }) => {
                if (!element) return;
                
                // Check if animation is complete before applying parallax
                if (selector === '.decoration-flores-rosa-wrapper' && !animationsComplete.flores) return;
                if (selector === '.decoration-churro-wrapper' && !animationsComplete.churro) return;
                if (selector === '.decoration-carita-wrapper' && !animationsComplete.carita) return;
                
                const speed = parseFloat(element.getAttribute('data-parallax-speed')) || defaultSpeed;
                // Calculate offset relative to nosotros section
                const nosotrosTop = nosotrosRect.top + scrollTop;
                const scrolled = Math.max(0, scrollTop - nosotrosTop);
                const offset = scrolled * speed * 3;
                
                // Preserve existing transforms
                if (element.classList.contains('decoration-churro-wrapper')) {
                    // Churro wrapper doesn't have transform, but the image inside does
                    element.style.setProperty('transform', `translateY(${offset}px)`, 'important');
                } else if (element.classList.contains('decoration-carita-wrapper')) {
                    // Carita wrapper has translateY(-50%), preserve it
                    element.style.setProperty('transform', `translateY(calc(-50% + ${offset}px))`, 'important');
                } else if (element.classList.contains('decoration-flores-rosa-wrapper')) {
                    // Flores wrapper doesn't have transform
                    element.style.setProperty('transform', `translateY(${offset}px)`, 'important');
                }
            });
        }
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateNosotrosDecorationsParallax, { passive: true });
    updateNosotrosDecorationsParallax(); // Initial call
}

// Initialize parallax on page load
document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initGalleryParallax();
    initHeroDecorationsParallax();
    initNosotrosDecorationsParallax();
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
    
    // Observer específico para galería con delays escalonados
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); // Delay escalonado de 150ms entre cada imagen
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    galleryItems.forEach((item) => {
        galleryObserver.observe(item);
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

    // Observer específico para elementos de la sección nosotros
    const nosotrosSection = document.querySelector('#nosotros');
    const nosotrosElements = document.querySelectorAll('.nosotros-animate-item');
    
    if (nosotrosSection && nosotrosElements.length > 0) {
        // Ocultar elementos inicialmente
        nosotrosElements.forEach(element => {
            element.style.opacity = '0';
        });
        
        // Observer para la sección nosotros
        const nosotrosSectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Cuando la sección nosotros está visible, animar los elementos
                    nosotrosElements.forEach((element, index) => {
                        setTimeout(() => {
                            // Aplicar animaciones según el tipo de elemento
                            if (element.classList.contains('decoration-churro-wrapper')) {
                                element.classList.add('animate__animated', 'animate__fadeInBottomLeft');
                                // Restaurar transform después de la animación
                                const churroImg = element.querySelector('.decoration-churro');
                                element.addEventListener('animationend', () => {
                                    element.classList.add('animation-complete');
                                    if (churroImg) {
                                        churroImg.classList.add('animation-complete');
                                    }
                                }, { once: true });
                            } else if (element.classList.contains('decoration-carita-wrapper')) {
                                element.classList.add('animate__animated', 'animate__bounceIn');
                                // Restaurar transform después de la animación
                                const caritaImg = element.querySelector('.decoration-carita');
                                element.addEventListener('animationend', () => {
                                    element.classList.add('animation-complete');
                                    if (caritaImg) {
                                        caritaImg.classList.add('animation-complete');
                                    }
                                }, { once: true });
                            } else if (element.classList.contains('decoration-flores-rosa-wrapper')) {
                                element.classList.add('animate__animated', 'animate__fadeInTopLeft');
                            } else if (element.classList.contains('nosotros-main-image')) {
                                element.classList.add('animate__animated', 'animate__fadeInRight');
                            } else if (element.classList.contains('nosotros-sticker')) {
                                element.classList.add('animate__animated', 'animate__rotateIn');
                                // Restaurar transform después de la animación
                                element.addEventListener('animationend', () => {
                                    element.classList.add('animation-complete');
                                }, { once: true });
                            }
                            element.style.opacity = '1';
                        }, index * 150); // Delay escalonado de 150ms
                    });
                    // Dejar de observar después de activar las animaciones
                    nosotrosSectionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observar la sección nosotros
        nosotrosSectionObserver.observe(nosotrosSection);
    }
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

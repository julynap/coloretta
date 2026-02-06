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

    // Experiencia-header: animación backInDown por cada panel (Animate.css)
    const experienciaSection = document.querySelector('#experiencia');
    const experienciaHeaders = document.querySelectorAll('.experiencia-header');
    const isMobileView = () => window.innerWidth <= 576;
    if (experienciaSection && experienciaHeaders.length > 0) {
        experienciaHeaders.forEach(header => {
            header.style.opacity = '0';
        });
        if (isMobileView()) {
            // Móvil: cada header aparece al hacer scroll (cada ítem al entrar en vista)
            const experienciaItemsForHeader = document.querySelectorAll('.experiencia-item');
            const headerItemObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const header = entry.target.querySelector('.experiencia-header');
                        if (header) {
                            header.classList.add('animate__animated', 'animate__backInDown');
                            header.style.opacity = '1';
                        }
                        headerItemObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });
            experienciaItemsForHeader.forEach(item => headerItemObserver.observe(item));
        } else {
            // Pantallas grandes: al entrar la sección, mostrar los 4 y animar en cascada
            const experienciaHeaderObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.experiencia-item').forEach(item => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        });
                        const headers = entry.target.querySelectorAll('.experiencia-header');
                        headers.forEach((header, index) => {
                            setTimeout(() => {
                                header.classList.add('animate__animated', 'animate__backInDown');
                                header.style.opacity = '1';
                            }, index * 150);
                        });
                        experienciaHeaderObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
            experienciaHeaderObserver.observe(experienciaSection);
        }
    }

    // Pintura turquesa móvil: rubberBand cada vez que entra en vista (scroll abajo o arriba)
    const pinturaTurquezaMobile = document.querySelector('.experiencia-pintura-turqueza-mobile');
    if (pinturaTurquezaMobile) {
        const pinturaTurquezaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && window.innerWidth <= 576) {
                    const el = entry.target;
                    el.classList.remove('animate__animated', 'animate__rubberBand');
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            el.classList.add('animate__animated', 'animate__rubberBand');
                        });
                    });
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -20px 0px' });
        pinturaTurquezaObserver.observe(pinturaTurquezaMobile);
    }

    // Pintura rosada (experiencia-pintura-wrapper): rubberBand cada vez que entra en vista (scroll abajo o arriba)
    const experienciaPinturaWrapper = document.querySelector('.experiencia-pintura-wrapper');
    if (experienciaPinturaWrapper) {
        const pinturaWrapperObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.classList.remove('animate__animated', 'animate__rubberBand');
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            el.classList.add('animate__animated', 'animate__rubberBand');
                        });
                    });
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -20px 0px' });
        pinturaWrapperObserver.observe(experienciaPinturaWrapper);
    }

    // Números de experiencia (1, 2, 3, 4): wobble cuando cada uno entra en vista al hacer scroll
    const experienciaNumbers = document.querySelectorAll('.experiencia-number');
    if (experienciaNumbers.length > 0) {
        const experienciaNumberObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__wobble');
                    experienciaNumberObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -20px 0px' });
        experienciaNumbers.forEach(num => experienciaNumberObserver.observe(num));
    }

    // Foto eventos (eventos-image-wrapper): slideInUp cuando entra en vista al hacer scroll
    const eventosImageWrapper = document.querySelector('.eventos-image-wrapper');
    if (eventosImageWrapper) {
        const eventosImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__slideInUp');
                    eventosImageObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -20px 0px' });
        eventosImageObserver.observe(eventosImageWrapper);
    }

    // Galería: pinturas (rosada, azul y naranja) rubberBand cada vez que entran en vista (scroll abajo o arriba)
    const galeriaPinturasRubberBand = document.querySelectorAll('.galeria-pintura-rosada-mobile, .galeria-pintura-azul-mobile, .galeria-flowers-decoration');
    if (galeriaPinturasRubberBand.length > 0) {
        const galeriaPinturaRubberBandObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const el = entry.target;
                if (entry.isIntersecting) {
                    el.classList.remove('animate__animated', 'animate__rubberBand');
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            el.classList.add('animate__animated', 'animate__rubberBand');
                        });
                    });
                } else {
                    el.classList.remove('animate__animated', 'animate__rubberBand');
                }
            });
        }, { threshold: 0.02, rootMargin: '0px 0px 0px 0px' });
        galeriaPinturasRubberBand.forEach(el => galeriaPinturaRubberBandObserver.observe(el));
    }

    // Contacto: iconos (correo, teléfono, Instagram, TikTok) con efecto rotateIn cuando la sección entra en vista
    const contactoSection = document.querySelector('#contacto');
    const contactoIcons = document.querySelectorAll('.contacto-icon');
    if (contactoSection && contactoIcons.length > 0) {
        const contactoIconsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const icons = entry.target.querySelectorAll('.contacto-icon');
                    icons.forEach((icon, index) => {
                        setTimeout(() => {
                            icon.classList.add('animate__animated', 'animate__rotateIn');
                        }, index * 120);
                    });
                    contactoIconsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -20px 0px' });
        contactoIconsObserver.observe(contactoSection);
    }

    // Contacto: links (email, teléfono, Instagram, TikTok) con efecto backInRight cuando la sección entra en vista
    const contactoLinks = document.querySelectorAll('#contacto .contacto-info-item a');
    if (contactoSection && contactoLinks.length > 0) {
        const contactoLinksObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const links = entry.target.querySelectorAll('.contacto-info-item a');
                    links.forEach((link, index) => {
                        setTimeout(() => {
                            link.classList.add('animate__animated', 'animate__backInRight');
                        }, index * 120);
                    });
                    contactoLinksObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -20px 0px' });
        contactoLinksObserver.observe(contactoSection);
    }

    // Título contacto: backInLeft por palabra, manteniendo espacio entre palabras
    const contactoTitleEl = document.querySelector('#contacto-title');
    if (contactoSection && contactoTitleEl && !contactoTitleEl.querySelector('span')) {
        const contactoTitleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = contactoTitleEl.textContent;
                    contactoTitleEl.textContent = '';
                    const words = text.split(/\s+/);
                    const delayPerWord = 0.12;
                    words.forEach((word, i) => {
                        const wordSpan = document.createElement('span');
                        wordSpan.textContent = word;
                        wordSpan.className = 'animate__animated animate__backInLeft';
                        wordSpan.style.animationDelay = `${i * delayPerWord}s`;
                        contactoTitleEl.appendChild(wordSpan);
                        if (i < words.length - 1) {
                            const spaceSpan = document.createElement('span');
                            spaceSpan.innerHTML = '&nbsp;';
                            spaceSpan.className = 'contacto-title-word-space';
                            contactoTitleEl.appendChild(spaceSpan);
                        }
                    });
                    contactoTitleEl.style.opacity = '1';
                    contactoTitleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -80px 0px' });
        contactoTitleObserver.observe(contactoSection);
    }

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

    // Nosotros: título "Sobre nosotros" letra a letra, luego subtítulo "Donde el arte..." letra a letra (backInUp, coordinado)
    const nosotrosTitleEl = document.querySelector('#nosotros-title');
    const nosotrosSubtitleEl = document.querySelector('#nosotros-subtitle');
    if (nosotrosSection && nosotrosTitleEl && !nosotrosTitleEl.querySelector('span')) {
        const nosotrosTitleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delayPerLetter = 0.06;
                    // 1. Título: "Sobre nosotros" letra a letra (backInUp)
                    const titleText = nosotrosTitleEl.textContent;
                    nosotrosTitleEl.textContent = '';
                    const titleChars = titleText.split('');
                    titleChars.forEach((char, i) => {
                        const span = document.createElement('span');
                        if (char === ' ') {
                            span.innerHTML = '&nbsp;';
                            span.className = 'animate__animated animate__backInUp title-word-space';
                        } else {
                            span.textContent = char;
                            span.className = 'animate__animated animate__backInUp';
                        }
                        span.style.animationDelay = `${i * delayPerLetter}s`;
                        nosotrosTitleEl.appendChild(span);
                    });
                    nosotrosTitleEl.style.opacity = '1';
                    // 2. Tras terminar el título, subtítulo: "Donde el arte se encuentra con el aroma del café." letra a letra
                    const titleDuration = titleChars.length * delayPerLetter * 1000 + 800;
                    setTimeout(() => {
                        if (nosotrosSubtitleEl && !nosotrosSubtitleEl.querySelector('span')) {
                            const subText = nosotrosSubtitleEl.textContent;
                            nosotrosSubtitleEl.textContent = '';
                            const subChars = subText.split('');
                            subChars.forEach((char, i) => {
                                const span = document.createElement('span');
                                if (char === ' ') {
                                    span.innerHTML = '&nbsp;';
                                    span.className = 'animate__animated animate__backInUp title-word-space';
                                } else {
                                    span.textContent = char;
                                    span.className = 'animate__animated animate__backInUp';
                                }
                                span.style.animationDelay = `${i * delayPerLetter}s`;
                                nosotrosSubtitleEl.appendChild(span);
                            });
                            nosotrosSubtitleEl.style.opacity = '1';
                        }
                    }, titleDuration);
                    nosotrosTitleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -80px 0px' });
        nosotrosTitleObserver.observe(nosotrosSection);
    }

    // Título experiencia: animación zoomIn por letra, cada palabra envuelta para no cortarse al reducir pantalla
    const experienciaTitle = document.querySelector('#experiencia-title');
    if (experienciaSection && experienciaTitle && !experienciaTitle.querySelector('span')) {
        const experienciaTitleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = experienciaTitle.textContent;
                    experienciaTitle.textContent = '';
                    const words = text.split(/\s+/);
                    const delayPerLetter = 0.06;
                    let letterIndex = 0;
                    words.forEach((word, wordIndex) => {
                        const wordWrapper = document.createElement('span');
                        wordWrapper.className = 'experiencia-title-word';
                        word.split('').forEach((char) => {
                            const span = document.createElement('span');
                            span.textContent = char;
                            span.className = 'animate__animated animate__zoomIn';
                            span.style.animationDelay = `${letterIndex * delayPerLetter}s`;
                            wordWrapper.appendChild(span);
                            letterIndex++;
                        });
                        experienciaTitle.appendChild(wordWrapper);
                        if (wordIndex < words.length - 1) {
                            const spaceSpan = document.createElement('span');
                            spaceSpan.innerHTML = '&nbsp;';
                            spaceSpan.className = 'animate__animated animate__zoomIn title-word-space';
                            spaceSpan.style.animationDelay = `${letterIndex * delayPerLetter}s`;
                            experienciaTitle.appendChild(spaceSpan);
                            letterIndex++;
                        }
                    });
                    experienciaTitle.style.opacity = '1';
                    experienciaTitleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -80px 0px' });
        experienciaTitleObserver.observe(experienciaSection);
    }

    // Título eventos: animación zoomInUp por letra, cada palabra envuelta para no cortarse al reducir pantalla
    const eventosSection = document.querySelector('#eventos');
    const eventosTitle = document.querySelector('#eventos-title');
    if (eventosSection && eventosTitle && !eventosTitle.querySelector('span')) {
        const eventosTitleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = eventosTitle.textContent;
                    eventosTitle.textContent = '';
                    const words = text.split(/\s+/);
                    const delayPerLetter = 0.06;
                    let letterIndex = 0;
                    words.forEach((word, wordIndex) => {
                        const wordWrapper = document.createElement('span');
                        wordWrapper.className = 'eventos-title-word';
                        word.split('').forEach((char) => {
                            const span = document.createElement('span');
                            span.textContent = char;
                            span.className = 'animate__animated animate__zoomInUp';
                            span.style.animationDelay = `${letterIndex * delayPerLetter}s`;
                            wordWrapper.appendChild(span);
                            letterIndex++;
                        });
                        eventosTitle.appendChild(wordWrapper);
                        if (wordIndex < words.length - 1) {
                            const spaceSpan = document.createElement('span');
                            spaceSpan.innerHTML = '&nbsp;';
                            spaceSpan.className = 'animate__animated animate__zoomInUp title-word-space';
                            spaceSpan.style.animationDelay = `${letterIndex * delayPerLetter}s`;
                            eventosTitle.appendChild(spaceSpan);
                            letterIndex++;
                        }
                    });
                    eventosTitle.style.opacity = '1';
                    eventosTitleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -80px 0px' });
        eventosTitleObserver.observe(eventosSection);
    }

    // Galería: primero título "Comunidad Coloretta" letra a letra, luego subtítulo palabra a palabra
    const galeriaSection = document.querySelector('#galeria');
    const galeriaTitle = document.querySelector('#galeria-title');
    const galeriaSubtitle = document.querySelector('#galeria-subtitle');
    const galeriaNeedsAnim = galeriaSection && galeriaTitle && !galeriaTitle.querySelector('span');
    if (galeriaNeedsAnim) {
        const galeriaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 1. Título: "Comunidad Coloretta" letra a letra (backInRight)
                    const titleText = galeriaTitle.textContent;
                    galeriaTitle.textContent = '';
                    const titleChars = titleText.split('');
                    const delayPerLetter = 0.06;
                    titleChars.forEach((char, i) => {
                        const span = document.createElement('span');
                        if (char === ' ') {
                            span.innerHTML = '&nbsp;';
                            span.className = 'animate__animated animate__backInRight title-word-space';
                        } else {
                            span.textContent = char;
                            span.className = 'animate__animated animate__backInRight';
                        }
                        span.style.animationDelay = `${i * delayPerLetter}s`;
                        galeriaTitle.appendChild(span);
                    });
                    galeriaTitle.style.opacity = '1';
                    // 2. Tras terminar el título (~2s), subtítulo: "Inspírate con las creaciones..." palabra a palabra
                    const titleDuration = titleChars.length * delayPerLetter * 1000 + 800;
                    setTimeout(() => {
                        if (galeriaSubtitle && !galeriaSubtitle.querySelector('span')) {
                            const subText = galeriaSubtitle.textContent;
                            galeriaSubtitle.textContent = '';
                            const words = subText.split(/\s+/);
                            const delayPerWord = 0.12;
                            words.forEach((word, i) => {
                                const wordSpan = document.createElement('span');
                                wordSpan.textContent = word;
                                wordSpan.className = 'animate__animated animate__backInRight';
                                wordSpan.style.animationDelay = `${i * delayPerWord}s`;
                                galeriaSubtitle.appendChild(wordSpan);
                                if (i < words.length - 1) {
                                    const spaceSpan = document.createElement('span');
                                    spaceSpan.innerHTML = '&nbsp;';
                                    spaceSpan.className = 'galeria-subtitle-word-space';
                                    galeriaSubtitle.appendChild(spaceSpan);
                                }
                            });
                            galeriaSubtitle.style.opacity = '1';
                        }
                    }, titleDuration);
                    galeriaObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -80px 0px' });
        galeriaObserver.observe(galeriaSection);
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

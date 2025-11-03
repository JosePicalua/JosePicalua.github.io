// Animación de entrada para las cards
document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer para animaciones al hacer scroll
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

    // Observar todas las cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observar hobby cards
    const hobbies = document.querySelectorAll('.hobby-card');
    hobbies.forEach((hobby, index) => {
        hobby.style.opacity = '0';
        hobby.style.transform = 'translateY(30px)';
        hobby.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(hobby);
    });

    // Efecto de parallax suave en el hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Efecto de hover mejorado en las cards
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Animación de typing para el título
    const title = document.querySelector('.hero-content h1');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        let i = 0;
        
        const typing = setInterval(() => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 100);
    }

    // Efecto de contador para los números (si hay)
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Click en contact items para copiar al portapapeles
    const contactItems = document.querySelectorAll('.contact-item:not([href])');
    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            const text = item.textContent.trim();
            
            // Crear tooltip temporal
            const tooltip = document.createElement('div');
            tooltip.textContent = '¡Copiado!';
            tooltip.style.position = 'fixed';
            tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '10px 20px';
            tooltip.style.borderRadius = '10px';
            tooltip.style.top = '20px';
            tooltip.style.right = '20px';
            tooltip.style.zIndex = '1000';
            tooltip.style.animation = 'fadeIn 0.3s ease';
            
            document.body.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => tooltip.remove(), 300);
            }, 2000);
            
            // Copiar al portapapeles
            const textToCopy = text.split('\n').pop().trim();
            navigator.clipboard.writeText(textToCopy).catch(err => {
                console.error('Error al copiar:', err);
            });
        });
    });

    // Añadir efecto de partículas en el background del hero
    const createParticle = () => {
        const hero = document.querySelector('.hero');
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        particle.style.animation = 'particleFloat 3s ease-in-out infinite';
        
        hero.appendChild(particle);
        
        setTimeout(() => particle.remove(), 3000);
    };

    // Crear partículas periódicamente
    setInterval(createParticle, 500);

    // Smooth scroll para enlaces internos
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

    // Añadir estilos de animación para partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0) scale(1);
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);

    // Efecto de cambio de color en hover para los hobby cards
    hobbies.forEach(hobby => {
        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
        ];
        
        hobby.addEventListener('mouseenter', () => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            hobby.style.background = randomColor;
        });
        
        hobby.addEventListener('mouseleave', () => {
            hobby.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        });
    });

    console.log('✨ CV de Antonny Picalua cargado exitosamente - 2025 ✨');
});

// Función para imprimir el CV
function printCV() {
    window.print();
}

// Añadir event listener para el botón de imprimir si existe
const printButton = document.querySelector('[data-action="print"]');
if (printButton) {
    printButton.addEventListener('click', printCV);
}
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


document.getElementById('openModal').addEventListener('click', function(e) {
    e.preventDefault(); // Evita que abra el enlace
    
    // IMPORTANTE: Cambia la ruta absoluta por una relativa para que funcione en el navegador
    const rutaArchivo = 'component/pages/analisis.html'; 
    
    const modal = document.getElementById('myModal');
    const iframe = document.getElementById('modalFrame');
    
    iframe.src = rutaArchivo;
    modal.style.display = 'block';
});

// Cerrar el modal al hacer clic en la (X)
document.getElementById('closeModal').onclick = function() {
    document.getElementById('myModal').style.display = 'none';
    document.getElementById('modalFrame').src = ''; // Limpia el contenido
}

// Cerrar si hacen clic fuera del recuadro blanco
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

document.getElementById('openSegundoProyecto').addEventListener('click', function(e) {
    e.preventDefault(); // Evita que abra el enlace
    
    // IMPORTANTE: Cambia la ruta absoluta por una relativa para que funcione en el navegador
    const rutaArchivo = 'component/pages/geografico.html'; 
    
    const modal = document.getElementById('myModal');
    const iframe = document.getElementById('modalFrame');
    
    iframe.src = rutaArchivo;
    modal.style.display = 'block';
});

// Cerrar el modal al hacer clic en la (X)
document.getElementById('closeModal').onclick = function() {
    document.getElementById('myModal').style.display = 'none';
    document.getElementById('modalFrame').src = ''; // Limpia el contenido
}

// Cerrar si hacen clic fuera del recuadro blanco
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}






/////////////////////////////////////////////////////////////////////////////////////////////////////////7

// JavaScript para modal expandible
document.addEventListener('DOMContentLoaded', function() {
    const summary = document.querySelector('.summary');
    
    // Crear el modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Sobre Mí</h2>
            <p class="modal-text"></p>
        </div>
    `;
    document.body.appendChild(modal);
    
    const modalText = modal.querySelector('.modal-text');
    const closeBtn = modal.querySelector('.close');
    
    // Limitar altura del summary
    summary.style.maxHeight = '150px';
    summary.style.overflow = 'hidden';
    summary.style.cursor = 'pointer';
    summary.style.position = 'relative';
    
    // Verificar si el contenido desborda
    if (summary.scrollHeight > summary.clientHeight) {
        summary.style.paddingBottom = '30px';
        summary.title = 'Click para leer más';
        
        // Agregar indicador de "leer más"
        const readMore = document.createElement('div');
        readMore.className = 'read-more';
        readMore.textContent = 'Leer más...';
        readMore.style.cssText = `
            position: absolute;
            bottom: 0;
            right: 0;
            background: linear-gradient(to right, transparent, white 20%);
            padding: 5px 10px 5px 40px;
            color: #667eea;
            font-weight: 600;
            cursor: pointer;
        `;
        summary.style.position = 'relative';
        summary.appendChild(readMore);
    }
    
    // Abrir modal
    summary.addEventListener('click', function() {
        modalText.textContent = summary.textContent.replace('Leer más...', '').trim();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    // Cerrar modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // CSS para el modal
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .modal-content {
            background: white;
            padding: 40px;
            border-radius: 15px;
            max-width: 800px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            animation: slideUp 0.3s;
        }
        
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .modal-content h2 {
            color: #2d3748;
            margin-bottom: 20px;
            font-size: 2rem;
        }
        
        .modal-text {
            color: #4a5568;
            font-size: 1.1rem;
            line-height: 1.8;
        }
        
        .close {
            position: absolute;
            right: 20px;
            top: 20px;
            font-size: 2rem;
            font-weight: bold;
            color: #718096;
            cursor: pointer;
            transition: color 0.3s;
        }
        
        .close:hover {
            color: #2d3748;
        }
    `;
    document.head.appendChild(style);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////7
// JavaScript para modal con scroll interno
document.addEventListener('DOMContentLoaded', function() {
    const cardContents = document.querySelectorAll('.card-content');
    
    // Crear el modal (solo una vez)
    const modal = document.createElement('div');
    modal.className = 'modal-card';
    modal.innerHTML = `
        <div class="modal-card-content">
            <span class="close-card">&times;</span>
            <div class="modal-card-body"></div>
        </div>
    `;
    document.body.appendChild(modal);
    
    const modalBody = modal.querySelector('.modal-card-body');
    const closeBtn = modal.querySelector('.close-card');
    
    cardContents.forEach(card => {
        // Limitar altura del card
        card.style.maxHeight = '250px';
        card.style.overflow = 'hidden';
        card.style.cursor = 'pointer';
        card.style.position = 'relative';
        card.style.transition = 'all 0.3s ease';
        
        // Verificar si el contenido desborda
        if (card.scrollHeight > card.clientHeight) {
            card.title = 'Click para ver más';
            
            // Agregar overlay de gradiente
            const overlay = document.createElement('div');
            overlay.className = 'card-overlay';
            overlay.innerHTML = '<span>Ver más...</span>';
            overlay.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 60px;
                background: linear-gradient(to bottom, transparent, white);
                display: flex;
                align-items: flex-end;
                justify-content: center;
                padding-bottom: 10px;
                pointer-events: none;
            `;
            overlay.querySelector('span').style.cssText = `
                color: #667eea;
                font-weight: 600;
                font-size: 0.9em;
            `;
            card.appendChild(overlay);
        }
        
        // Abrir modal al hacer click
        card.addEventListener('click', function(e) {
            // Clonar el contenido sin el overlay
            const clone = card.cloneNode(true);
            const overlayToRemove = clone.querySelector('.card-overlay');
            if (overlayToRemove) {
                overlayToRemove.remove();
            }
            
            modalBody.innerHTML = clone.innerHTML;
            modalBody.scrollTop = 0; // Resetear scroll
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        // Efecto hover
        card.addEventListener('mouseenter', function() {
            if (this.scrollHeight > this.clientHeight) {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Cerrar modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // CSS para el modal con altura fija y scroll
    const style = document.createElement('style');
    style.textContent = `
        .modal-card {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .modal-card-content {
            background: white;
            padding: 40px;
            border-radius: 15px;
            max-width: 900px;
            width: 90%;
            height: 600px;
            max-height: 80vh;
            position: relative;
            animation: slideUp 0.3s;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: column;
        }
        
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .modal-card-body {
            color: #4a5568;
            overflow-y: auto;
            overflow-x: hidden;
            padding-right: 15px;
            flex: 1;
        }
        
        /* Scrollbar personalizado */
        .modal-card-body::-webkit-scrollbar {
            width: 12px;
        }
        
        .modal-card-body::-webkit-scrollbar-track {
            background: #f7fafc;
            border-radius: 10px;
        }
        
        .modal-card-body::-webkit-scrollbar-thumb {
            background: #667eea;
            border-radius: 10px;
            border: 3px solid #f7fafc;
        }
        
        .modal-card-body::-webkit-scrollbar-thumb:hover {
            background: #5568d3;
        }
        
        /* Firefox */
        .modal-card-body {
            scrollbar-width: thin;
            scrollbar-color: #667eea #f7fafc;
        }
        
        .modal-card-body ul {
            margin-left: 20px;
            margin-top: 10px;
        }
        
        .modal-card-body li {
            margin-bottom: 8px;
            line-height: 1.6;
        }
        
        .close-card {
            position: absolute;
            right: 15px;
            top: 15px;
            font-size: 2rem;
            font-weight: bold;
            color: #718096;
            cursor: pointer;
            transition: all 0.3s;
            z-index: 1;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }
        
        .close-card:hover {
            color: white;
            background: #667eea;
            transform: rotate(90deg);
        }
        
        @media (max-width: 768px) {
            .modal-card-content {
                width: 95%;
                height: 500px;
                padding: 30px 20px;
            }
        }
    `;
    document.head.appendChild(style);
});



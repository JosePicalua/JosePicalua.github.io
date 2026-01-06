 let currentSlide = 0;
            const totalSlides = 10;

            function initializeIndicators() {
                const indicatorsContainer = document.getElementById('indicators');
                for (let i = 0; i < totalSlides; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'indicator-dot' + (i === 0 ? ' active' : '');
                    dot.onclick = () => goToSlide(i);
                    indicatorsContainer.appendChild(dot);
                }
                const slideNumber = document.createElement('span');
                slideNumber.className = 'slide-number';
                slideNumber.id = 'slideNumber';
                slideNumber.textContent = '1 / ' + totalSlides;
                indicatorsContainer.appendChild(slideNumber);
            }

            function updateSlidePosition() {
                const container = document.getElementById('slidesContainer');
                container.style.transform = `translateX(-${currentSlide * 100}%)`;
                
                // Update indicators
                const dots = document.querySelectorAll('.indicator-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
                
                // Update slide number
                document.getElementById('slideNumber').textContent = `${currentSlide + 1} / ${totalSlides}`;
                
                // Update button states
                document.getElementById('prevBtn').disabled = currentSlide === 0;
                document.getElementById('nextBtn').disabled = currentSlide === totalSlides - 1;
            }

            function changeSlide(direction) {
                const newSlide = currentSlide + direction;
                if (newSlide >= 0 && newSlide < totalSlides) {
                    currentSlide = newSlide;
                    updateSlidePosition();
                }
            }

            function goToSlide(index) {
                currentSlide = index;
                updateSlidePosition();
            }

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') changeSlide(-1);
                if (e.key === 'ArrowRight') changeSlide(1);
            });

            // Touch/swipe support
            let touchStartX = 0;
            let touchEndX = 0;

            document.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            document.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                if (touchEndX < touchStartX - 50) changeSlide(1);
                if (touchEndX > touchStartX + 50) changeSlide(-1);
            }

            // Initialize
            initializeIndicators();
            updateSlidePosition();
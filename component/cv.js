        // Modal functionality
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('[data-modal]');
            const modals = document.querySelectorAll('.modal');
            const closeButtons = document.querySelectorAll('.close-modal');

            cards.forEach(card => {
                card.addEventListener('click', function() {
                    const modalId = this.getAttribute('data-modal');
                    const modal = document.getElementById(modalId);
                    if (modal) {
                        modal.style.display = 'flex';
                    }
                });
            });

            closeButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    this.closest('.modal').style.display = 'none';
                });
            });

            modals.forEach(modal => {
                modal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        this.style.display = 'none';
                    }
                });
            });
        });
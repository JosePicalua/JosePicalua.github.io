document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".image_detalles img");


    images.forEach(img => {
        const menuText = img.previousElementSibling; // Obtiene el texto del menú

        img.addEventListener("mouseover", function () {
            menuText.style.backgroundColor = "green";
            menuText.style.color = "white";
            menuText.style.fontSize = "22px";
            menuText.style.padding = "10px";
        });

        img.addEventListener("mouseout", function () {
            // Solo cambia el color si el modal NO está abierto
            const modalId = img.getAttribute("data-modal");
            if (!modalId || document.getElementById(modalId).style.display !== "flex") {
                menuText.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
                menuText.style.color = "white";
                menuText.style.fontSize = "20px";
                menuText.style.padding = "5px";
            }
        });

        // ✅ Evento para abrir el modal al hacer clic en la imagen
        img.addEventListener("click", function () {
            const modalId = img.getAttribute("data-modal");
            if (modalId) {
                openModal(modalId, menuText);
            }
        });
    });

    // ✅ Cierra los modales al hacer clic en el botón de cerrar
    document.querySelectorAll(".close-modal").forEach(button => {
        button.addEventListener("click", function () {
            const modal = this.closest(".modal");
            closeModal(modal.id);
        });
    });

    // ✅ Cierra el modal si se hace clic fuera del contenido
    document.querySelectorAll(".modal").forEach(modal => {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal(modal.id);
            }
        });
    });
});

// ✅ Función para abrir el modal
function openModal(id, menuText) {
    console.log("Abriendo modal:", id);
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = "flex"; // Abre el modal
    }

    // Mantiene el color verde del texto cuando el modal está abierto
    if (menuText) {
        menuText.style.backgroundColor = "green";
        menuText.style.color = "white";
        menuText.style.fontSize = "22px";
        menuText.style.padding = "10px";
    }
}

// ✅ Función para cerrar el modal
function closeModal(id) {
    console.log("Cerrando modal:", id);
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = "none"; // Cierra el modal
    }

    // Restaura el color del texto cuando se cierra el modal
    const img = document.querySelector(`img[data-modal="${id}"]`);
    if (img) {
        const menuText = img.previousElementSibling;
        if (menuText) {
            menuText.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
            menuText.style.color = "white";
            menuText.style.fontSize = "20px";
            menuText.style.padding = "5px";
        }
    }
}




document.addEventListener("DOMContentLoaded", function () {
    // Añade event listeners a los enlaces
    const links = document.querySelectorAll('.repositorio, .perfil-trabajo');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            // Depuración: imprime la URL del enlace
            console.log('Abriendo enlace:', this.href);
            
            // Asegúrate de que el enlace se abra en una nueva pestaña
            window.open(this.href, '_blank');
            
            // Previene cualquier comportamiento por defecto que pueda interferir
            event.preventDefault();
            event.stopPropagation();
        });
    });
});


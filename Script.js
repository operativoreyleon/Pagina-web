// Script para el slider
const slides = document.querySelectorAll(".slider-item");
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove("active");
    slide.style.opacity = "0";
  });

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].style.opacity = "1";
  slides[currentSlide].classList.add("active");
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function startSlideShow() {
  slideInterval = setInterval(nextSlide, 5000); // Cambia automáticamente cada 5 segundos
}

// Iniciar slider
showSlide(0);
startSlideShow();

// Script para menú móvil mejorado
const menuBtn = document.getElementById("menu-btn");
const closeMenuBtn = document.getElementById("close-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
const menuLinks = document.querySelectorAll(".menu-link");

const openMenu = () => {
  mobileMenu.classList.remove("translate-x-full");
  mobileMenuOverlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

const closeMenu = () => {
  mobileMenu.classList.add("translate-x-full");
  mobileMenuOverlay.classList.add("hidden");
  document.body.style.overflow = "";
};

menuBtn.addEventListener("click", openMenu);
closeMenuBtn.addEventListener("click", closeMenu);
mobileMenuOverlay.addEventListener("click", closeMenu);
menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// --- Script para animaciones de scroll y header ---

// 1. Fade-in para secciones
const sections = document.querySelectorAll(".section-fade-in");
const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeInObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach((section) => {
  fadeInObserver.observe(section);
});

// 2. Lógica del Header (active link)
const headerNavLinks = document.querySelectorAll("#main-header .nav-link");
const contentSectionsForNav = document.querySelectorAll("section[id]");
const activeLinkObserver = new IntersectionObserver(
  (entries) => {
    let visibleSectionId = null;
    // Find the last intersecting section, which is the most prominent one
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        visibleSectionId = entry.target.getAttribute("id");
      }
    });

    headerNavLinks.forEach((link) => {
      link.classList.remove("active-link");
      if (link.dataset.section === visibleSectionId) {
        link.classList.add("active-link");
      }
    });
  },
  {
    rootMargin: "-50% 0px -50% 0px", // Trigger when the section is in the middle of the viewport
    threshold: 0,
  }
);

contentSectionsForNav.forEach((section) => {
  activeLinkObserver.observe(section);
});

// --- Lógica para el carrusel de clientes ---
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.client-carousel-track');
    
    // Duplicar los logos para un efecto de bucle infinito
    if (track) {
        const logos = Array.from(track.children);
        logos.forEach(logo => {
            const clone = logo.cloneNode(true);
            track.appendChild(clone);
        });
    }
});


const form = document.getElementById('contact-form');
const submitButton = document.getElementById('submit-button');
const statusMessage = document.getElementById('status-message');

// IMPORTANTE: Pega aquí la URL que obtendrás de Google Apps Script.
const appScriptUrl = 'https://script.google.com/macros/s/AKfycbyQo3ihVKwBGYxOXy6iLn7PBHm3lXX1S3BiNivYQUwoQGSLRDo-XqJ_xu47Jr7xhgZ5Qg/exec';

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que la página se recargue

    // Mostrar estado de envío y deshabilitar el botón
    statusMessage.textContent = 'Enviando mensaje...';
    statusMessage.className = 'text-blue-700';
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    const formData = new FormData(form);

    fetch(appScriptUrl, {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.result === 'success') {
            // Mensaje de éxito
            statusMessage.textContent = '¡Mensaje enviado con éxito!';
            statusMessage.className = 'text-green-700';
            form.reset(); // Limpia el formulario
        } else {
            // Mensaje de error
            throw new Error(data.message || 'Ocurrió un error inesperado.');
        }
    })
    .catch(error => {
        // Mensaje si falla la conexión o hay un error en el script
        statusMessage.textContent = 'Error al enviar el mensaje. Inténtalo de nuevo.';
        statusMessage.className = 'text-red-700';
        console.error('Error:', error);
    })
    .finally(() => {
        // Habilitar el botón nuevamente después de 3 segundos
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Mensaje';
                statusMessage.textContent = ''; // Limpiar mensaje de estado
        }, 3000);
    });
});



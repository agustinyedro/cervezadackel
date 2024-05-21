const $carrusel = document.querySelector('.carrusel');
const $btnIzquierda = document.querySelector('.btn-izquierda');
const $btnDerecha = document.querySelector('.btn-derecha');
const $imagenes = document.querySelectorAll('#banner-carrusel li');

let currentIndex = 0;
const totalImagenes = $imagenes.length;

function mostrarImagen(indice) {
    actualizarBotones();
    $imagenes.forEach((imagen, idx) => {
        if (idx === indice) {
            imagen.classList.add('active');
            imagen.classList.remove('hidden');
        } else {
            imagen.classList.remove('active');
            imagen.classList.add('hidden');
        }
    });


}

function siguiente() {
    currentIndex = (currentIndex + 1) % totalImagenes;
    mostrarImagen(currentIndex);
}

function anterior() {
    currentIndex = (currentIndex - 1 + totalImagenes) % totalImagenes;
    mostrarImagen(currentIndex);
}

function actualizarBotones() {

    if (!mouseOverCarrusel) {
        $btnIzquierda.style.opacity = '0';
        $btnDerecha.style.opacity = '0';
        return;
    }

    const { left, width, top } = $carrusel.getBoundingClientRect();
    const xPos = (left + width / 2) - left;
    const yPos = (top + $carrusel.clientHeight / 2) - top;

    if (yPos >= 0 && yPos <= $carrusel.clientHeight) {
        if (xPos > width / 2) {
            $btnDerecha.style.opacity = '1';
            $btnIzquierda.style.opacity = '0';
        } else {
            $btnDerecha.style.opacity = '0';
            $btnIzquierda.style.opacity = '1';
        }
    }
}

$carrusel.addEventListener('mousemove', (event) => {
    const { left, width, top } = $carrusel.getBoundingClientRect();
    const xPos = event.clientX - left;
    const yPos = event.clientY - top;

    // Check if the mouse is within the vertical bounds of the carousel
    if (yPos >= 0 && yPos <= $carrusel.clientHeight) {
        if (xPos > width / 2) {
            $btnDerecha.style.opacity = '1';
            $btnIzquierda.style.opacity = '0';
        } else {
            $btnDerecha.style.opacity = '0';
            $btnIzquierda.style.opacity = '1';
        }
    }
});

$carrusel.addEventListener('mouseleave', () => {
    mouseOverCarrusel = false;
    $btnIzquierda.style.opacity = '0';
    $btnDerecha.style.opacity = '0';
});

document.querySelector('.btn-izquierda').addEventListener('click', anterior);
document.querySelector('.btn-derecha').addEventListener('click', siguiente);

setInterval(siguiente, 3000);

// Inicializar
mostrarImagen(currentIndex);


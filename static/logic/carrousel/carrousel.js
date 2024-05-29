export function carrousel(carouselImages, btnLeft, btnRight) {

    const totalImages = carouselImages.length;
    let currentIndex = 0;

    function showImage(index) {
        // Ocultar todas las imágenes
        carouselImages.forEach((image) => {
            image.classList.add("hidden");
            image.classList.remove("active");
        });

        // Mostrar la imagen correspondiente al índice
        carouselImages[index].classList.remove("hidden");
        carouselImages[index].classList.add("active");
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    }

    function previousImage() {
        console.log(currentIndex);
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
    }

    btnLeft.addEventListener("click", previousImage);
    btnRight.addEventListener("click", nextImage);

    setInterval(nextImage, 6000);
}

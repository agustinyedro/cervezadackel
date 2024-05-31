export function crearCarusel2(cardData) {
  const template = /* HTML */ `
    <div class="carousel">
      <div class="card-producto-imgCel">
        ${cardData.imagen
          .map(
            (element) =>
              /* HTML */
              `<img src="${element}" alt="${cardData.name}" />`
          )
          .join("")}
      </div>
      <div class="indicadores">
        ${cardData.imagen.forEach((_, index) => {
          return /* HTML */ `<span
            class="indicador ${index === 0 ? "active" : ""}"
            data-index="${index}"
            onclick="goToSlide(${index})"
          ></span>`;
        })}
      </div>
    </div>
  `;

  let counter = 0;
  let startX = 0;
  let moveX = 0;

  function shiftSlide(direction) {
    counter = counter + direction;
    if (counter < 0) {
      counter = cardData.imagen.length - 1;
    } else if (counter >= cardData.imagen.length) {
      counter = 0;
    }
    const slideWidth = imgCel.offsetWidth;
    imgCel.style.transform = `translateX(${-slideWidth * counter}px)`;
    updateIndicators();
  }

  function goToSlide(index) {
    counter = index;
    const slideWidth = imgCel.offsetWidth;
    imgCel.style.transform = `translateX(${-slideWidth * counter}px)`;
    updateIndicators();
  }

  function updateIndicators() {
    const indicators = document.querySelectorAll(".indicador");

    indicators.forEach((indicator, index) => {
      if (index === counter) {
        // console.log(counter, index);
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  const imgCel = document.querySelector(".card-producto-imgCel");
  // Desplazamiento táctil
  imgCel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    imgCel.style.transition = "none";
  });

  imgCel.addEventListener("touchmove", (e) => {
    moveX = e.touches[0].clientX - startX;
    const slideWidth = imgCel.offsetWidth;
    imgCel.style.transform = `translateX(${-slideWidth * counter + moveX}px)`;
  });

  imgCel.addEventListener("touchend", () => {
    const sensitivity = 100; // Sensibilidad para cambiar de diapositiva
    if (Math.abs(moveX) > sensitivity) {
      if (moveX > 0 && counter > 0) {
        shiftSlide(-1); // Cambia a la diapositiva anterior
      } else if (moveX < 0 && counter < cardData.imagen.length - 1) {
        shiftSlide(1); // Cambia a la siguiente diapositiva
      }
    }
    const slideWidth = imgCel.offsetWidth;
    imgCel.style.transition = "transform 0.5s ease";
    imgCel.style.transform = `translateX(${-slideWidth * counter}px)`;
    updateIndicators();
  });

  return template;
}
export function crearCarusel(cardData, cardDetalles) {
  const imgCel = document.createElement("div");
  imgCel.classList.add("card-producto-imgCel");

  cardData.imagen.forEach((element, index) => {
    const img = document.createElement("img");
    img.classList.add("card-producto-img-cel");
    img.src = element;
    img.alt = cardData.name;
    imgCel.appendChild(img);
  });

  const carousel = document.createElement("div");
  carousel.classList.add("carousel");

  const indicadoresContainer = document.createElement("div");
  indicadoresContainer.classList.add("indicadores");

  cardData.imagen.forEach((_, index) => {
    const indicador = document.createElement("span");

    indicador.classList.add("indicador");
    if (index === 0) {
      indicador.classList.add("active");
    }
    indicador.dataset.index = index;
    indicador.addEventListener("click", () => goToSlide(index));
    indicadoresContainer.appendChild(indicador);
  });

  carousel.appendChild(imgCel);
  carousel.appendChild(indicadoresContainer);

  cardDetalles.appendChild(carousel);

  let counter = 0;
  let startX = 0;
  let moveX = 0;

  function shiftSlide(direction) {
    counter = counter + direction;
    if (counter < 0) {
      counter = cardData.imagen.length - 1;
    } else if (counter >= cardData.imagen.length) {
      counter = 0;
    }
    const slideWidth = imgCel.offsetWidth;
    imgCel.style.transform = `translateX(${-slideWidth * counter}px)`;
    updateIndicators();
  }

  function goToSlide(index) {
    counter = index;
    const slideWidth = imgCel.offsetWidth;
    imgCel.style.transform = `translateX(${-slideWidth * counter}px)`;
    updateIndicators();
  }

  function updateIndicators() {
    const indicators = document.querySelectorAll(".indicador");

    indicators.forEach((indicator, index) => {
      if (index === counter) {
        // console.log(counter, index);
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  // Desplazamiento táctil
  imgCel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    imgCel.style.transition = "none";
  });

  imgCel.addEventListener("touchmove", (e) => {
    moveX = e.touches[0].clientX - startX;
    const slideWidth = imgCel.offsetWidth;
    imgCel.style.transform = `translateX(${-slideWidth * counter + moveX}px)`;
  });

  imgCel.addEventListener("touchend", () => {
    const sensitivity = 100; // Sensibilidad para cambiar de diapositiva
    if (Math.abs(moveX) > sensitivity) {
      if (moveX > 0 && counter > 0) {
        shiftSlide(-1); // Cambia a la diapositiva anterior
      } else if (moveX < 0 && counter < cardData.imagen.length - 1) {
        shiftSlide(1); // Cambia a la siguiente diapositiva
      }
    }
    const slideWidth = imgCel.offsetWidth;
    imgCel.style.transition = "transform 0.5s ease";
    imgCel.style.transform = `translateX(${-slideWidth * counter}px)`;
    updateIndicators();
  });
}

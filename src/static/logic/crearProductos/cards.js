import { crearCarusel } from "./carousel.js";
export function crearCards(cardData) {
  const template = /* HTML */ `
    <div class="card-producto-detalles">
      <div class="div-fondo"></div>
      <h2 class="card-producto-titulo">${cardData.name}</h2>
      <div id="carusel" class="carousel"></div>
      <p class="card-producto-precio">$${cardData.precio}</p>
      <p class="card-producto-stock">${stock()}</p>
      ${cardData.tipo === "cervezas" ? detallesCervezas() : ""}
      ${cardData.tipo === "calcomanias" ? detallesCalcomanias() : ""}
    </div>
  `;



  return template;

  /*** FUNCIONES ***/
  function stock() {
    if (cardData.tipo !== "remeras") {
      if (cardData.cantidad > 0) {
        return `Disponibles: ${cardData.cantidad} unidades`;
      } else if (cardData.cantidad > 0 && cardData.cantidad <= 12) {
        return `Ultimas ${cardData.cantidad} unidades`;
      } else {
        return `Stock agotado`;
      }
    }
  }

  function detallesCervezas() {
    return /* HTML */ `
    <p class="detalles">
      alc ${cardData.alcohol}% - IBU:${cardData.IBU}
    </p>`;
  }

  function detallesCalcomanias() {
    return /* HTML */ `
    <p class="detalles">
      Tamaño: ${cardData.tamano}
    </p> `;

  }
  function crearCarusel2() {
    if (cardData.tipo === "remeras") {
      // Obtener tallas únicas
      const tallasUnicas = [
        ...new Set(cardData.variantes.map((variante) => variante.talla)),
      ];

      const coloresDisponibles = cardData.variantes
        .filter((variante) => variante.talla === talla)
        .map((variante) => variante.color);
      // Eliminar colores duplicados
      const coloresUnicos = [...new Set(coloresDisponibles)];

      const template = /* HTML */ `
  < div class="detalles" >
    <h3>Tallas</h3>
          ${tallasUnicas.forEach((talla) => {
        return /* HTML */ `
              <button class="detalles-btn-talla">${talla}</button>
            `;
      })}
        </div >
  `;

      const $detalles = document.querySelector(".detalles");

      const $btnTallas = document.querySelectorAll(".detalles-btn-talla");

      $detalles.addEventListener("click", () => {
        $btnTallas.forEach((btn) => {
          btn.classList.remove("selected");
        });

        $btnTallas.classList.toggle("selected");

        if ($btnTallas.classList.contains("selected")) {
          $detalles.innerHTML += /* HTML */ `
  < h3 > Colores</h3 >
    ${coloresUnicos.forEach((color) => {
            switch (color) {
              case "Negro":
                btnColor.style.backgroundColor = "black";
                break;
              case "Blanco":
                btnColor.style.backgroundColor = "white";
                break;
              case "Rojo":
                btnColor.style.backgroundColor = "red";
                break;
              default:
                btnColor.style.backgroundColor = "gray";
                break;
            }

            return /* HTML */ `
        <button
          class="detalles-btn-color"
          style="background-color: ${color};"
        ></button>
      `;
          })}
`;

          const $btnColor = document.querySelectorAll(".detalles-btn-color");

          $btnColor.addEventListener("click", () => {
            $btnColor.forEach((btn) => {
              btn.classList.remove("selected");
            });

            $btnColor.classList.toggle("selected");

            const stock = cardData.variantes
              .filter((variante) => variante.talla === talla)
              .filter((variante) => variante.color === color)
              .map((variante) => variante.cantidad);

            const $stock = document.querySelector(".card-producto-stock");

            sinStock.textContent = `Disponibles: ${stock[0]} `;
          });
        } else {
          $detalles.innerHTML = "";
        }
      });
    }
  }
}

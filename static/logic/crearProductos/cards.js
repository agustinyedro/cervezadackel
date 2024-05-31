import { crearCarusel } from "./carousel.js";
export function crearCards(cardData) {
  const template = /* HTML */ `
    <div class="card-producto-detalles">
      <div class="div-fondo"></div>
      <h2 class="card-producto-titulo">${cardData.name}</h2>
      ${crearCarusel(cardData)}
      <p class="card-producto-precio">$${cardData.precio}</p>
      <p class="card-producto-stock">${stock()}</p>
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
}

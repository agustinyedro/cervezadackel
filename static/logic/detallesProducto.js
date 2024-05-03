// detallesProducto.js

export function crearDetallesProducto(cardData, $cardDetailsContainer) {
  const detallesProducto = document.createElement("div");
  detallesProducto.classList.add("producto-detalles");
  detallesProducto.innerHTML = `
      <h3>Caracteristicas Pricipales</h3>
      <p>${cardData.descripcion}</p>
      ${cardData.calibre ? `<p><b>Calibre:</b> ${cardData.calibre}</p>` : ""}
      ${cardData.estilo ? `<p><b>Estilo:</b> ${cardData.estilo}</p>` : ""}
      ${cardData.sabor ? `<p><b>Sabor:</b> ${cardData.sabor}</p>` : ""}
      ${cardData.tamano ? `<p><b>Tamano:</b> ${cardData.tamano}</p>` : ""}
      ${cardData.material ? `<p><b>Material:</b> ${cardData.material}</p>` : ""}
      ${
        cardData.premios
          ? `<h3>Premios</h3>
            <ul>
              ${cardData.premios.map((item) => `<li>${item}</li>`).join("")}
            </ul>`
          : ""
      }
    `;
  $cardDetailsContainer.appendChild(detallesProducto);
}
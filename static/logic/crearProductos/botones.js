export function crearBotones(cardData) {
    const template = /* HTML */`
    <div class="btn-stock">
        <div class="stock">
            <button class="restar" id="restar-1">-</button>
            <input class="cantidad" type="number" id="cantidad-1">
            <button class="sumar" id="sumar-1">+</button>
         </div>
    <button class="card-producto-boton">Comprar ahora</button>
    <button class="btn-agregar" id="btn-agregar-1">Agregar al carrito</button>
    </div>
    `;
    return template;
}
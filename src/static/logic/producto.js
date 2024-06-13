import { crearImagenes } from "./crearProductos/imagenesProducto.js";
import { crearDetallesProducto } from "./crearProductos/detallesProducto.js";
// import { crearCarusel2 } from "./crearProductos/carousel.js";

import { crearCards } from "./crearProductos/cards.js";

const fetchData = async (cardId) => {
    const response = await fetch(`/productos/${cardId}`);
    const data = await response.json();
    return data;
};


document.addEventListener("DOMContentLoaded", async function () {
    // Obtener el ID de la tarjeta de la URL
    const id = window.location.pathname.split('/').pop();


    //llamo a la api

    const cardData = await fetchData(id);
    // console.log(cardData);
    document.title = cardData.name;

    /******* ITEM NAV TIPO DE PRODUCTO  *********/
    const $itemProducto = document.getElementById("item-producto");

    switch (cardData.tipo) {
        case "cervezas":
            $itemProducto.textContent = "Cerveza";
            break;
        case "remeras":
            $itemProducto.textContent = "Remeras";
            break;
        case "gorras":
            $itemProducto.textContent = "Gorras";
            break;
        case "calcomanias":
            $itemProducto.textContent = "Calcomanias";
            break;
    }

    const $cardDetailsContainer = document.getElementById("producto");

    /***** Imagenes ******/

    $cardDetailsContainer.innerHTML = crearImagenes(cardData);

    /********* descripción  *********/

    $cardDetailsContainer.innerHTML += crearDetallesProducto(cardData);


    /********* CARD *********/

    $cardDetailsContainer.innerHTML += crearCards(cardData);

    const cardDetalles = document.createElement("div");
    cardDetalles.classList.add("card-producto-detalles");

    /********* FONDO *********/

    const fondo = document.createElement("div");
    fondo.classList.add("div-fondo");
    cardDetalles.appendChild(fondo);

    /********* TITULO *********/

    const titulo = document.createElement("h2");
    titulo.textContent = cardData.name;
    titulo.classList.add("card-producto-titulo");
    cardDetalles.appendChild(titulo);

    /********* CARUSSEL DE IMAGENES CELULARES *********/

    crearCarusel2(cardData, cardDetalles);

    /************ PRECIO *************/
    const precio = document.createElement("p");
    precio.classList.add("card-producto-precio");
    precio.textContent = `$ ${cardData.precio}`;
    cardDetalles.appendChild(precio);

    /************ STOCK *************/
    const sinStock = document.createElement("p");
    sinStock.classList.add("card-producto-stock");

    let detallesTallas = "";
    let detallesColores = "";

    if (cardData.tipo !== "remeras") {
        if (cardData.cantidad > 0) {
            sinStock.textContent = `Disponibles: ${cardData.cantidad} unidades`;
        } else if (cardData.cantidad > 0 && cardData.cantidad <= 12) {
            sinStock.textContent = `Ultimas ${cardData.cantidad} unidades`;
        } else {
            sinStock.textContent = `Stock agotado`;
        }
    }
    cardDetalles.appendChild(sinStock);

    /********** ELEMENTOS INDIVIDUALES *******/

    if (cardData.alcohol != null && cardData.IBU != null) {
        const detallesAlcohol = document.createElement("p");
        detallesAlcohol.classList.add("detalles");
        detallesAlcohol.textContent = `alc ${cardData.alcohol}%  - IBU:${cardData.IBU}`;
        cardDetalles.appendChild(detallesAlcohol);
    }

    if (cardData.tipo === "remeras") {
        const detallesTalla = document.createElement("div");
        detallesTalla.classList.add("detalles");

        // Obtener tallas únicas
        const tallasUnicas = [
            ...new Set(cardData.variantes.map((variante) => variante.talla)),
        ];
        const tallas = document.createElement("h3");
        tallas.textContent = "Tallas";
        detallesTalla.appendChild(tallas);
        // Crear botones para cada talla única
        tallasUnicas.forEach((talla) => {
            const btnTalla = document.createElement("button");
            btnTalla.classList.add("detalles-btn-talla");
            btnTalla.textContent = talla;
            btnTalla.dataset.talla = talla;

            // Agregar evento de clic para seleccionar la talla y mostrar los colores disponibles
            btnTalla.addEventListener("click", () => {
                detallesTalla.querySelectorAll(".detalles-btn-talla").forEach((btn) => {
                    btn.classList.remove("selected");
                });
                // console.log(btnTalla.classList.contains("selected"));



            });

            detallesTalla.appendChild(btnTalla);
        });
        cardDetalles.appendChild(detallesTalla);
    }

});
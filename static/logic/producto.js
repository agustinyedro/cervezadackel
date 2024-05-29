import { crearImagenes } from "./crearProductos/imagenesProducto.js";
import { crearDetallesProducto } from "./crearProductos/detallesProducto.js";
import { crearCarusel } from "./crearProductos/carousel.js";

document.addEventListener("DOMContentLoaded", async function () {
  // Obtener el ID de la tarjeta de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const cardId = urlParams.get("id");

  // Obtener los datos de la tarjeta según el ID
  const cardData = await obtenerDatosDeLaTarjeta(cardId);
  // console.log(cardData);
  document.title = cardData.name;

  const $cardDetailsContainer = document.getElementById("cardDetails");

  //***** Imagenes ******/

  crearImagenes(cardData, $cardDetailsContainer);

  /*******************/

  /********* descripción  *********/

  crearDetallesProducto(cardData, $cardDetailsContainer);

  /********* CARD *********/

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

  crearCarusel(cardData, cardDetalles);

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

        btnTalla.classList.toggle("selected");

        const coloresDisponibles = cardData.variantes
          .filter((variante) => variante.talla === talla)
          .map((variante) => variante.color);
        // Eliminar colores duplicados
        const coloresUnicos = [...new Set(coloresDisponibles)];
        // Limpiar los botones de colores anteriores
        if (btnTalla.classList.contains("selected")) {
          detallesColor.innerHTML = "<h3>Colores</h3>";
          // Crear botón para cada color único
          coloresUnicos.forEach((color) => {
            const btnColor = document.createElement("button");
            btnColor.classList.add("detalles-btn-color");
            btnColor.dataset.color = color; // Guardar el color en el atributo data-color

            // Asignar color de fondo según el color
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

            // Agregar evento de clic para seleccionar el color
            btnColor.addEventListener("click", () => {
              // Deseleccionar todos los otros colores
              detallesColor
                .querySelectorAll(".detalles-btn-color")
                .forEach((btn) => {
                  btn.classList.remove("selected");
                });
              // Seleccionar el color actual
              btnColor.classList.add("selected");

              // obtener stock del color seleccionado
              const stock = cardData.variantes
                .filter((variante) => variante.talla === talla)
                .filter((variante) => variante.color === color)
                .map((variante) => variante.cantidad);

              detallesColores = color;
              detallesTallas = talla;
              // console.log(detallesColores, detallesTallas);
              sinStock.textContent = `Disponibles: ${stock[0]}`;
            });

            detallesColor.appendChild(btnColor);
          });
        } else {
          detallesColor.innerHTML = "";
        }
      });

      detallesTalla.appendChild(btnTalla);
    });

    const detallesColor = document.createElement("div");
    detallesColor.classList.add("detalles");

    cardDetalles.appendChild(detallesTalla);
    cardDetalles.appendChild(detallesColor);
  }

  if (cardData.tamano != null) {
    const detallesTamano = document.createElement("p");
    detallesTamano.classList.add("detalles");
    detallesTamano.textContent = `Tamaño: ${cardData.tamano}`;
    cardDetalles.appendChild(detallesTamano);
  }

  /********* BOTONES *********/

  const boton = document.createElement("button");
  boton.classList.add("card-producto-boton");
  boton.textContent = "Comprar ahora";

  const btnStock = document.createElement("div");
  btnStock.classList.add("btn-stock");

  const stock = document.createElement("div");
  stock.classList.add("stock");

  const btnRestar = document.createElement("button");
  btnRestar.classList.add("restar");
  btnRestar.id = `restar-${cardData.id}`;
  btnRestar.textContent = "-";

  const btnSumar = document.createElement("button");
  btnSumar.classList.add("sumar");
  btnSumar.id = `sumar-${cardData.id}`;
  btnSumar.textContent = "+";

  const input = document.createElement("input");
  input.classList.add("cantidad");
  input.type = "number";
  input.id = `cantidad-${cardData.id}`;
  input.value = 0;
  stock.appendChild(btnRestar);
  stock.appendChild(input);
  stock.appendChild(btnSumar);

  const btnAgregar = document.createElement("button");
  btnAgregar.classList.add("btn-agregar");
  btnAgregar.id = `btn-agregar-${cardData.id}`;
  btnAgregar.textContent = "Agregar al carrito";

  const detalles = document.createElement("p");
  detalles.classList.add("detalles");
  detalles.textContent = cardData.descripcion;

  btnStock.appendChild(stock);
  btnStock.appendChild(boton);
  btnStock.appendChild(btnAgregar);

  cardDetalles.appendChild(btnStock);
  $cardDetailsContainer.appendChild(cardDetalles);

  const botonSumar = document.querySelector(`#sumar-${cardData.id}`);
  const botonRestar = document.querySelector(`#restar-${cardData.id}`);
  const $btnAgregar = document.querySelector(`#btn-agregar-${cardData.id}`);

  botonSumar.addEventListener("click", () => {
    const cantidadElemento = document.querySelector(`#cantidad-${cardData.id}`);
    let cantidad = parseInt(cantidadElemento.value);
    if (cardData.tipo !== "remeras") {
      if (cantidad < cardData.cantidad) {
        cantidad++;
        cantidadElemento.value = cantidad;
        const cantidadReal = cardData.cantidad - cantidad;
        sinStock.textContent = `Disponibles: ${cantidadReal}`;
      }
    } else {
      const stock = cardData.variantes
        .filter((variante) => variante.talla === detallesTallas)
        .filter((variante) => variante.color === detallesColores)
        .map((variante) => variante.cantidad);

      if (
        detallesTallas !== null &&
        detallesColores !== null &&
        cantidad < stock[0]
      ) {
        cantidad++;
        cantidadElemento.value = cantidad;
        const cantidadReal = stock - cantidad;
        sinStock.textContent = `Disponibles: ${cantidadReal}`;
      }
    }
  });

  botonRestar.addEventListener("click", () => {
    const cantidadElemento = document.querySelector(`#cantidad-${cardData.id}`);
    let cantidad = parseInt(cantidadElemento.value);
    if (cardData.tipo !== "remeras") {
      if (cantidad > 0) {
        cantidad--;
        cantidadElemento.value = cantidad;
        if (cantidad < cardData.cantidad) {
          const cantidadReal = cardData.cantidad - cantidad;
          sinStock.textContent = `Disponibles: ${cantidadReal}`;
        }
      }
    } else {
      const stock = cardData.variantes
        .filter((variante) => variante.talla === detallesTallas)
        .filter((variante) => variante.color === detallesColores)
        .map((variante) => variante.cantidad);

      if (detallesTallas !== null && detallesColores !== null && cantidad > 0) {
        cantidad--;
        cantidadElemento.value = cantidad;
        const cantidadReal = stock - cantidad;
        sinStock.textContent = `Disponibles: ${cantidadReal}`;
      }
    }
  });

  $btnAgregar.addEventListener("click", () => {
    const cantidadElemento = document.querySelector(`#cantidad-${cardData.id}`);
    let cantidad = parseInt(cantidadElemento.value);
    // console.log(cantidad);
    alert(`Cervezas agregadas: ${cantidad}`);
  });

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
});

async function obtenerDatosDeLaTarjeta(cardId) {
  const fetchData = async () => {
    const response = await fetch("../static/data/tienda.json");
    const data = await response.json();
    return data;
  };

  try {
    const data = await fetchData();
    const producto = data.productos;
    // console.log(producto);
    for (let element of producto) {
      if (element.id == cardId) {
        //  console.log(element);
        return element;
      }
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return null;
  }
  return null;
}

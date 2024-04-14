document.addEventListener("DOMContentLoaded", async function () {
  // Obtener el ID de la tarjeta de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const cardId = urlParams.get("id");

  // Obtener los datos de la tarjeta según el ID
  const cardData = await obtenerDatosDeLaTarjeta(cardId);
// console.log(cardData);
  document.title = cardData.name;

  const $cardDetailsContainer = document.getElementById("cardDetails");

  const card = document.createElement("div");
  card.classList.add("card-producto");
  card.id = `producto-${cardData.id}`;

  const img = document.createElement("img");
  img.classList.add("card-producto-img");
  img.src = cardData.imagen;
  img.alt = cardData.name;
  card.appendChild(img);

  const img2 = document.createElement("img");
  img2.classList.add("card-producto-img2");
  img2.src = cardData.imagen2;
  img2.alt = cardData.name;
  card.appendChild(img2);

  const titulo = document.createElement("h2");
  titulo.textContent = cardData.name;
  titulo.classList.add("card-producto-titulo");
  card.appendChild(titulo);

  const detalles = document.createElement("p");
  detalles.classList.add("detalles");
  detalles.textContent = cardData.descripcion;
  card.appendChild(detalles);

  if (cardData.alcohol != null && cardData.IBU != null) {
    const detallesAlcohol = document.createElement("p");
    detallesAlcohol.classList.add("detalles");
    detallesAlcohol.textContent = `alc ${cardData.alcohol}%  - IBU:${cardData.IBU}`;
    card.appendChild(detallesAlcohol);
  }


  const precio = document.createElement("p");
  precio.classList.add("card-producto-precio");
  precio.textContent = `$ ${cardData.precio}`;
  card.appendChild(precio);

  if(cardData.cantidad > 0) {
    const stock = document.createElement("p");
    stock.classList.add("card-producto-precio");
    stock.textContent = `Stock disponible`;
    card.appendChild(stock);
  }


  const boton = document.createElement("button");
  boton.classList.add("card-producto-boton");
  boton.textContent = "Comprar";
  card.appendChild(boton);



  $cardDetailsContainer.appendChild(card);


  const $itemProducto = document.getElementById("item-producto");
  console.log($itemProducto);
  
  if (cardData.tipo==="cervezas") {
    $itemProducto.textContent = "Cerveza";
  }else if (cardData.tipo==="remeras") {
    $itemProducto.textContent = "Remeras";
  }else if (cardData.tipo==="gorras") {
    $itemProducto.textContent = "Gorras";
  }else if (cardData.tipo==="calcomanias") {
    $itemProducto.textContent = "Calcomanias";
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


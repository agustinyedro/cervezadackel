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
  

  const img2 = document.createElement("img");
  img2.classList.add("card-producto-img2");
  img2.src = cardData.imagen2;
  img2.alt = cardData.name;
  

  const imgPequenias = document.createElement("div");
  imgPequenias.classList.add("card-producto-imgPequenias");
  imgPequenias.appendChild(img);
  imgPequenias.appendChild(img2);
  card.appendChild(imgPequenias);

  

  const imgGrande = document.createElement("img");
  imgGrande.classList.add("card-producto-imgGrande");

  imgGrande.src = cardData.imagen;
  imgGrande.alt = cardData.name;



  img.addEventListener("click", () => {
    imgGrande.src = cardData.imagen;
  })
  img2.addEventListener("click", () => {
    imgGrande.src = cardData.imagen2;
  })
  card.appendChild(imgGrande);

  const cardDetalles= document.createElement("div");
  cardDetalles.classList.add("card-producto-detalles");

  const titulo = document.createElement("h2");
  titulo.textContent = cardData.name;
  titulo.classList.add("card-producto-titulo");
  cardDetalles.appendChild(titulo);

  const precio = document.createElement("p");
  precio.classList.add("card-producto-precio");
  precio.textContent = `$ ${cardData.precio}`;
  cardDetalles.appendChild(precio);

  if (cardData.alcohol != null && cardData.IBU != null) {
    const detallesAlcohol = document.createElement("p");
    detallesAlcohol.classList.add("detalles");
    detallesAlcohol.textContent = `alc ${cardData.alcohol}%  - IBU:${cardData.IBU}`;
    cardDetalles.appendChild(detallesAlcohol);
  }

  // const detalles = document.createElement("p");
  // detalles.classList.add("detalles");
  // detalles.textContent = cardData.descripcion;
  // cardDetalles.appendChild(detalles);




  

  if(cardData.cantidad > 0) {
    const stock = document.createElement("p");
    stock.classList.add("card-producto-stock");
    stock.textContent = `Stock disponible`;
    cardDetalles.appendChild(stock);
  }


  const boton = document.createElement("button");
  boton.classList.add("card-producto-boton");
  boton.textContent = "Comprar ahora";
  cardDetalles.appendChild(boton);


  card.appendChild(cardDetalles);

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


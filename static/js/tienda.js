const $tienda = document.querySelector("#tienda-container");

const fetchData = async () => {
  const response = await fetch("../static/data/tienda.json");
  const data = await response.json();
  return data;
};


fetchData().then((data) => {
  const cervezas = data.productos[0].cervezas;
  renderCards(cervezas);
});

const renderCards = (productos) => {

  productos.forEach((producto, index) => {
    const card = document.createElement("div");
    card.classList.add("card-tienda");


    const img = document.createElement("img");
    img.classList.add("card-tienda-img");
    img.src = producto.imagen;
    img.alt = producto.name;
    card.appendChild(img);
    
    const titulo = document.createElement("h2");
    titulo.textContent = producto.name;
    titulo.classList.add("card-tienda-titulo");
    card.appendChild(titulo);


    if (producto.alcohol != null && producto.IBU != null) {
      const detallesAlcohol = document.createElement("p");
      detallesAlcohol.classList.add("detalles");
      detallesAlcohol.textContent = `alc ${producto.alcohol}%  - IBU:${producto.IBU}`;
      card.appendChild(detallesAlcohol);
    }

    const precio = document.createElement("p");
    precio.classList.add("precio");
    precio.textContent = `$ ${producto.precio}`;
    card.appendChild(precio);

    const btnStock = document.createElement("div");
    btnStock.classList.add("btn-stock");

    const stock = document.createElement("div");
    stock.classList.add("stock");

    const btnRestar = document.createElement("button");
    btnRestar.classList.add("restar");
    btnRestar.id = `restar-${index}`;
    btnRestar.textContent = "-";

    const btnSumar = document.createElement("button");
    btnSumar.classList.add("sumar");
    btnSumar.id = `sumar-${index}`;
    btnSumar.textContent = "+";

    const input = document.createElement("input");
    input.classList.add("cantidad");
    input.type = "number";
    input.id = `cantidad-${index}`;
    input.value = 0;
    stock.appendChild(btnRestar); 
    stock.appendChild(input);
    stock.appendChild(btnSumar);
  

    const btnAgregar = document.createElement("button");
    btnAgregar.classList.add("btn-agregar");
    btnAgregar.id = `btn-agregar-${index}`;
    btnAgregar.textContent = "Agregar";

    btnStock.appendChild(stock);
    btnStock.appendChild(btnAgregar);

    card.appendChild(btnStock);

    $tienda.appendChild(card);

    const botonSumar = document.querySelector(`#sumar-${index}`);
    const botonRestar = document.querySelector(`#restar-${index}`);
    const $btnAgregar = document.querySelector(`#btn-agregar-${index}`);

    botonSumar.addEventListener("click", () => {
      const cantidadElemento = document.querySelector(`#cantidad-${index}`);
      let cantidad = parseInt(cantidadElemento.value);

      if (cantidad < producto.cantidad) {
        cantidad++;
        cantidadElemento.value = cantidad;
      } else {
        alert("no hay stock");
      }
    });

    botonRestar.addEventListener("click", () => {
      const cantidadElemento = document.querySelector(`#cantidad-${index}`);
      let cantidad = parseInt(cantidadElemento.value);
      if (cantidad > 0) {
        cantidad--;
        cantidadElemento.value = cantidad;
      }
    });

    $btnAgregar.addEventListener("click", () => {
      const cantidadElemento = document.querySelector(`#cantidad-${index}`);
      let cantidad = parseInt(cantidadElemento.value);
      console.log(cantidad);
      alert(`Cervezas agregadas: ${cantidad}`);
    });
  });
};

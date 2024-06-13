
document.title = "Tienda Dackel";

const $tienda = document.querySelector("#tienda-container");

const fetchData = async () => {
  const response = await fetch("/productos");
  const data = await response.json();
  return data;
};

fetchData().then((data) => {
  // console.log(data);

  renderCards(data);
});

const renderCards = (productos) => {
  const $tienda = document.getElementById("tienda-container");

  let cardsHTML = '';

  productos.forEach((producto, index) => {

    // se crean los detalles según características
    let detallesHtml = '';

    if (producto.alcohol != null && producto.IBU != null) {
      detallesHtml = `<p class="detalles">alc ${producto.alcohol}%  - IBU:${producto.IBU}</p>`;
    } else if (producto.tipo === "remeras") {
      const tallasUnicas = new Set(producto.variantes.map(variante => variante.talla));
      detallesHtml = `<p class="detalles">Tallas: ${[...tallasUnicas].join(", ")}</p>`;
    } else if (producto.tamano != null) {
      detallesHtml = `<p class="detalles">Tamaño: ${producto.tamano}</p>`;
    }

    // se crea la card con toda la info para luego renderizarla

    cardsHTML += /* HTML */ `
          <div class="card-tienda" id="producto-${producto.id}">
              <img class="card-tienda-img" src="${producto.imagen[0]}" alt="${producto.name}">
              <h2 class="card-tienda-titulo">${producto.name}</h2>
              ${detallesHtml}
              <p class="precio">$ ${producto.precio}</p>
              <div class="btn-stock">
                  <div class="stock">
                      <button class="restar" id="restar-${index}">-</button>
                      <input class="cantidad" type="number" id="cantidad-${index}" value="0">
                      <button class="sumar" id="sumar-${index}">+</button>
                  </div>
                  <button class="btn-agregar" id="btn-agregar-${index}">Agregar</button>
              </div>
          </div>
      `;
  });

  $tienda.innerHTML = cardsHTML;

  // Agregar event listeners después de renderizar las tarjetas
  productos.forEach((producto, index) => {
    const card = document.getElementById(`producto-${producto.id}`);
    const botonSumar = document.getElementById(`sumar-${index}`);
    const botonRestar = document.getElementById(`restar-${index}`);
    const botonAgregar = document.getElementById(`btn-agregar-${index}`);
    const cantidadElemento = document.getElementById(`cantidad-${index}`);

    card.addEventListener("click", (event) => {
      const clickedElement = event.target;
      if (
        clickedElement.classList.contains("btn-agregar") ||
        clickedElement.classList.contains("sumar") ||
        clickedElement.classList.contains("restar") ||
        clickedElement.classList.contains("btn-stock") ||
        clickedElement.classList.contains("cantidad")
      ) {
        // Evitar redireccionamiento si se hizo clic en un área interactiva
        return;
      }
      const productoId = producto.id;
      window.location.href = `/tienda/${productoId}`;
    });

    botonSumar.addEventListener("click", () => {
      let cantidad = parseInt(cantidadElemento.value);
      if (cantidad < producto.cantidad) {
        cantidad++;
        cantidadElemento.value = cantidad;
      } else {
        alert("No hay suficiente stock disponible.");
      }
    });

    botonRestar.addEventListener("click", () => {
      let cantidad = parseInt(cantidadElemento.value);
      if (cantidad > 0) {
        cantidad--;
        cantidadElemento.value = cantidad;
      }
    });

    botonAgregar.addEventListener("click", () => {
      let cantidad = parseInt(cantidadElemento.value);
      alert(`Se han agregado ${cantidad} unidades de ${producto.name} a la compra.`);
    });
  });
};

// Filtros
const filtroMobile = document.querySelectorAll(".filtro-mobile");
filtroMobile.forEach((filtro) => {
  const btnS = filtro.querySelector(".btn");
  const caretD = filtro.querySelector(".caretD");
  const menuD = filtro.querySelector(".menuD");

  btnS.addEventListener("click", () => {
    btnS.classList.toggle("btn-clicked");
    caretD.classList.toggle("caretD-rotate");
    menuD.classList.toggle("menuD-open");
  });
});


const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".menu");
  const options = dropdown.querySelectorAll(".menu li");
  const selected = dropdown.querySelector(".selected");

  select.addEventListener("click", () => {
    select.classList.toggle("select-clicked");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");
      options.forEach((option) => {
        option.classList.remove("active");
      });
      option.classList.add("active");
    });
  });
});
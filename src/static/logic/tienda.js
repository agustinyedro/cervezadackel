
document.title = "Tienda Dackel";

const $tienda = document.querySelector("#tienda-container");

/* Obtener todos los productos al inicio de la pagina */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await fetchData([]);
    renderCards(data); // Renderizar todos los productos inicialmente
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

// Función para obtener todos los productos y segurnos filtrados
const fetchData = async (tipos) => {
  let url = '/productos';
  
  // Construir la URL de solicitud basada en los tipos seleccionados
  if (tipos.length > 0) {
    url += `?tipos=${tipos.join(',')}`;
  }
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


// Manejar cambios en los checkboxes
const checkboxes = document.querySelectorAll('.filtros-lista input[type="checkbox"]');

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', async () => {
    // Obtener tipos seleccionados
    const tiposSeleccionados = [];
    checkboxes.forEach((cb) => {
      if (cb.checked) {
        tiposSeleccionados.push(cb.value);
      }
    });

    // Si no hay ningún tipo seleccionado, obtener todos los productos
    if (tiposSeleccionados.length === 0) {
      try {
        const data = await fetchData([]);
        renderCards(data); // Renderizar todos los productos
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      // Llamar fetchData con los tipos seleccionados
      try {
        const data = await fetchData(tiposSeleccionados);
        renderCards(data); // Renderizar productos filtrados
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  });
});

/* Funciones para limpiar los filtros */

const limpiarBtn = document.getElementById('limpiar-filtros');

// Función para limpiar los checkboxes seleccionados
const limpiarFiltros = () => {
  const checkboxes = document.querySelectorAll('.filtros-lista input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false; // Deseleccionar cada checkbox
  });

  // Llamar fetchData sin filtros para obtener todos los productos
  fetchData([]).then((data) => {
    renderCards(data); // Renderizar todos los productos
  }).catch((error) => {
    console.error('Error fetching data:', error);
  });
};

// Agregar evento de clic al botón "Limpiar filtros"
limpiarBtn.addEventListener('click', limpiarFiltros);


// Función para renderizar las tarjetas de productos

const renderCards = (productos) => {
  const $tienda = document.getElementById("tienda-container");

  let cardsHTML = '';

  productos.forEach((producto, index) => {
    
    // se crean los detalles según características
    let detallesHtml = '';
    // console.log(producto);


    switch (producto.tipo) {
      case 'remeras': 
      const variantesString = producto.variantes;

      // Paso 1: Dividir la cadena por comas para obtener cada variante
      const variantesArray = variantesString.split(",");
      
      // Paso 2: Iterar sobre cada parte para crear un objeto por cada variante
      const variantes = variantesArray.map((variante) => {
        const [tamaño, color, cantidad] = variante.split(":");
        return {
          tamaño,
          color,
          cantidad: parseInt(cantidad)  // Convertir cantidad a número si es necesario
        };        
      });
        console.log();
      
     const tallasUnicas = new Set(variantes.map(variante => variante.tamaño ));
        detallesHtml = `<p class="detalles">Tallas: ${[...tallasUnicas].join(", ")}</p>`;
        break;

      case 'cervezas':
        detallesHtml = `<p class="detalles">alc ${producto.alcohol}%  - IBU:${producto.ibu}</p>`;
        break;
      case 'calcomanias':
        detallesHtml = `<p class="detalles">Tamaño: ${producto.medida}</p>`;
        break;
      default:
        break;
    }
        
    // se crea la card con toda la info para luego renderizarla

    const imagenesString = producto.imagenes;
    const imagenesArray = imagenesString.split(",");
    
    cardsHTML += /* HTML */ `
          <div class="card-tienda" id="producto-${producto.id}">
              <img class="card-tienda-img" src="${imagenesArray[0]}" alt="${producto.nombre}">
              <h2 class="card-tienda-titulo">${producto.nombre}</h2>
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
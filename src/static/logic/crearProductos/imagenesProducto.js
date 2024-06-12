export function crearImagenes(cardData) {
  const template = /* HTML */ `
    <div class="card-producto-imagenes">
      <img
        id="img-grande"
        class="card-producto-imgGrande"
        src=${cardData.imagen[0]}
        alt=${cardData.name}
      />
      <div class="card-producto-imgPequenias">
        ${cardData.imagen
          .map(
            (element) => /*html*/ `
              <img 
              class="card-producto-img" 
              src="${element}" 
              alt="${cardData.name}" 
              onclick="updateImage('${element}', '${cardData.name}')" />`
          )
          .join("")}
      </div>
    </div>
  `;

  window.updateImage = (src, alt) => {
    const imgGrande = document.getElementById("img-grande");
    imgGrande.src = src;
    imgGrande.alt = alt;
  };

  return template;
}
// export function crearImagenes(cardData, $cardDetailsContainer) {
//   const imgPequenias = document.createElement("div");
//   imgPequenias.classList.add("card-producto-imgPequenias");

//   const imgGrande = document.createElement("img");
//   imgGrande.classList.add("card-producto-imgGrande");
//   imgGrande.src = cardData.imagen[0];
//   imgGrande.alt = cardData.name;

//   cardData.imagen.forEach((element, index) => {
//     const img = document.createElement("img");
//     img.classList.add("card-producto-img");
//     img.src = element;
//     img.alt = cardData.name;
//     imgPequenias.appendChild(img);

//     img.addEventListener("click", () => {
//       imgGrande.src = element;
//       imgGrande.alt = cardData.name;
//     });
//   });

//   const imagenes = document.createElement("div");
//   imagenes.classList.add("card-producto-imagenes");
//   imagenes.appendChild(imgGrande);
//   imagenes.appendChild(imgPequenias);
//   $cardDetailsContainer.appendChild(imagenes);
// }

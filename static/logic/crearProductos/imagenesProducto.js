export function crearImagenes(cardData, $cardDetailsContainer) {
  const imgPequenias = document.createElement("div");
  imgPequenias.classList.add("card-producto-imgPequenias");

  const imgGrande = document.createElement("img");
  imgGrande.classList.add("card-producto-imgGrande");
  imgGrande.src = cardData.imagen[0];
  imgGrande.alt = cardData.name;

  cardData.imagen.forEach((element, index) => {
    const img = document.createElement("img");
    img.classList.add("card-producto-img");
    img.src = element;
    img.alt = cardData.name;
    imgPequenias.appendChild(img);

    img.addEventListener("click", () => {
      imgGrande.src = element;
      imgGrande.alt = cardData.name;
    });
  });

  const imagenes = document.createElement("div");
  imagenes.classList.add("card-producto-imagenes");
  imagenes.appendChild(imgGrande);
  imagenes.appendChild(imgPequenias);
  $cardDetailsContainer.appendChild(imagenes);
}

import { carrousel } from "./carrousel/carrousel.js";

const carouselImages = document.querySelectorAll(".img-carrousel");
const btnLeft = document.querySelector(".btn-left")
const btnRight = document.querySelector(".btn-right")

carrousel(carouselImages, btnLeft, btnRight);

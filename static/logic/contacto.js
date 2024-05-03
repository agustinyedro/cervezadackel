const dropdowns = document.querySelectorAll(".motivo");
let motivo = "hola";
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
      motivo = "" + selected.innerText;
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

const whatsapp = document.querySelector(".whatsapp");

whatsapp.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const Mensaje = document.getElementById("message").value;

  // Validar campos

  if (name === "" || email === "" || Mensaje === "") {
    alert("Por favor, rellene todos los campos.");
    return;
  }
  if (email.indexOf("@") === -1) {
    alert("Por favor, ingrese un correo electrónico válido.");
    return;
  }
  if (motivo === "Motivo") {
    alert("Por favor, seleccione un motivo.");
    return;
  }

  // console.log(name, email, Mensaje);

  //envía la petición a WhatsApp
  window.open(
    `https://wa.me/3513075338/?text=Hola,%20soy%20${name}.%20Estoy%20interesado/a%20en%20${motivo}.%20Mi%20correo%20es:%20${email}.%20${Mensaje}%20`
  );
});


allUsers();

function allUsers() {
  const tablaHTML = document.getElementById("user-table-body");

  fetch("http://localhost:3000/contactos")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((user) => showData(user))
    .catch((error) => {
      console.log("There has been an error consiming the API: ", error);
      tablaHTML.textContent =
        "There has been an error: No data has been found. Please try again.";
    });

  const showData = (user) => {
    let body = "";
    for (let i = 0; i < user.length; i++) {
      body += `<tr><td>${user[i].nombre}</td><td>${user[i].apellido}</td><td>${user[i].telefono}</td></tr>`;
    }

    document.getElementById("user-table-body").innerHTML = body;
  };
}

//Botón ocultar formulario
function ocultarFormulario() {
  const formContent = document.getElementById("form-content");
  if (formContent.firstChild) {
    formContent.innerHTML = ""; 
  }
}

//New user
function newUser() {
  const contenedorFormulario = document.getElementById("form-content");

  if (document.querySelector(".new-form")) {
    return;
  }

  // Crear el formulario dinámicamente
  const formulario = document.createElement("form");
  formulario.setAttribute("action", "post");
  formulario.classList.add("new-form");
  formulario.innerHTML = `
    <label for="contact-name">Name</label>
    <input name="nombre" type="text" placeholder="Enter name" id="contact-name" />
    <label for="lastname">Lastname</label>
    <input name="apellido" type="text" placeholder="Enter lastname" id="lastname" />
    <label for="phonenumber">Phone number</label>
    <input name="telefono" type="text" placeholder="Enter phone number" id="phonenumber" />
    <button type="submit" class="action-buttons" id="new-button">New Contact</button>
    <button class="action-buttons" type="button" onclick="ocultarFormulario()">Hide form</button>
    
  `;

  // Insertar el formulario en el contenedor
  contenedorFormulario.appendChild(formulario);

  //Obtener datos del formulario generado
  const elementoformulario = document.querySelector(".new-form");

  elementoformulario.addEventListener("submit", (event) => {
    event.preventDefault(); //Esto evita que el navegador recargue la pagina raro

    const datosform = new FormData(elementoformulario);
    const datos = Object.fromEntries(datosform);
    console.log(datos);

    fetch("http://localhost:3000/contactos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.text();
      })
      .then((TextoRespuesta) => {
        alert("Your contact has been saved!");
        location.reload(); //recarga la pagina para que se llene la tabla
      })
      .catch((error) => {
        console.error("Error al enviar los datos a la API: ", error);
      });
  });
}

//show new form
const formelement = document.querySelector(".new-form");

formelement.addEventListener("submit", (event) => {
  event.preventDefault();
});

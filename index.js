const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET
app.get("/contactos", async (req, res) => {
    try {
        const response = await axios.get("http://www.raydelto.org/agenda.php");
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los contactos" });
    }
});

// POST
app.post("/contactos", async (req, res) => {
    const { nombre, apellido, telefono } = req.body;
  
    if (!nombre || !apellido || !telefono) {
      return res.status(400).json({ error: "Faltan datos" });
    }
  
    try {
      // Convertimos a formato de formulario
      const formData = new URLSearchParams();
      formData.append("nombre", nombre);
      formData.append("apellido", apellido);
      formData.append("telefono", telefono);
  
      // Enviamos al backend de Raydelto
      const response = await axios.post(
        "http://www.raydelto.org/agenda.php",
        formData
      );
  
      res.json({
        mensaje: "Contacto agregado correctamente",
        data: response.data,
      });
    } catch (error) {
      res.status(500).json({ error: "Error al agregar el contacto" });
    }
  });
  
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors")

//import routes
const clienteRoutes = require('./routes/Cliente')

//app
const app = express();

//db
const jsonFilePath =
  "C:/Users/vitor/OneDrive/Escritorio/PROGRAMAÇÃO/15 - Dejair Remake/Projeto/Front/public/entregas_atrasadas.json";

//middleware
app.use(cors())
app.use(bodyParser.json());

//routes
app.use('/api',clienteRoutes)

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

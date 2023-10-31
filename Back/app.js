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

app.post("/updateData", (req, res) => {
  const updatedData = req.body;

  fs.writeFile(
    "entregas_atrasadas.json",
    JSON.stringify(updatedData, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
        res.status(500).send("Error saving data");
      } else {
        console.log("JSON file updated successfully");
        res.send("Data saved successfully");
      }
    }
  );
});

//middleware
app.use(cors())
app.use(bodyParser.json());

//routes
app.use('/api',clienteRoutes)

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

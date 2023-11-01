const fs = require("fs");

// Load the JSON file data
let jsonData = require("C:/Users/vitor/OneDrive/Escritorio/PROGRAMAÇÃO/15 - Dejair Remake/Projeto/Front/public/entregas_atrasadas.json");

// Get client by ID function
exports.clientById = (req, res, next, clientId) => {
  // Perform any necessary operations based on the client ID
  // For example, you can use this middleware to validate the client ID or load the client's data

  const clientData = jsonData.find((item) => item.id === clientId);
  // console.log(clientData);
  // console.log(clientId);

  if (!clientData) {
    return res.status(404).json({ message: "Client not found" });
  }

  // Attach the client data to the request object for further use
  req.clientData = clientData;
  next();
};

// Update function
exports.update = (req, res) => {
  
  //pegando os dados cliente de ID especeficado graças ao middleware getClientById
  const clientData = req.clientData
  if(!clientData){
    return res.status(404).json({message:"Client not found"})
  }
  
  console.log(req.body)
  const updatedData = req.body;

  clientData.Logistica_c01_F0FFF0 = updatedData.Logistica_c01_F0FFF0;
  clientData.Tentativas_entregas_c01_F0FFF0 = updatedData.Tentativas_entregas_c01_F0FFF0;
  clientData.Transportador_c01_F0FFF0 = updatedData.Transportador_c01_F0FFF0;


  // // Save the updated JSON data back to the file
  fs.writeFile("C:/Users/vitor/OneDrive/Escritorio/PROGRAMAÇÃO/15 - Dejair Remake/Projeto/Front/public/entregas_atrasadas.json", JSON.stringify(jsonData, null, 2), "utf8", (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
      res.status(500).json({ message: "Error saving data" });
    } else {
      console.log("JSON file updated successfully");
      res.status(200).json({ message: "Data saved successfully" });
    }
  });
};

// Read one client function
exports.read = (req, res) => {
  // You can customize this to read a specific client's data
  // For example, based on the client's ID passed in the request params
  const clientId = req.params.clientId;

  const clientData = jsonData.find((item) => item.id === clientId);

  if (!clientData) {
    return res.status(404).json({ message: "Client not found" });
  }

  res.status(200).json(clientData);
};

// Get all clients function
exports.getAllClients = (req, res) => {
  res.status(200).json(jsonData);
};

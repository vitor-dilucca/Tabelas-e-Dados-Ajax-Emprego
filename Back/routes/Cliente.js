const express = require("express");
const router = express.Router();

const {
  getAllClients,
  read,
  update,
  clientById,
} = require("../controllers/Cliente");

router.get("/clients", getAllClients);
router.route("/clients/:clientId").get(read).put(update);

router.param("clientId", clientById);
module.exports = router;

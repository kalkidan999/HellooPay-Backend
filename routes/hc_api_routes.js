const express = require("express");
const hellocash_api = require("../controllers/hellocash_api")
const router = express.Router();
const hellocash_api_controller = require("../controllers/hellocash_api");

router.post('/create_invoice', hellocash_api_controller.create_invoice);

module.exports = router;
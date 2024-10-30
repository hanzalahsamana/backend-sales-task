const express = require("express");
const { getCountries } = require("../Controllers/countries");
const router = express.Router();

router.get("/countries", getCountries)

module.exports = router;

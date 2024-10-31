const express = require("express");
const { getCountries } = require("../Controllers/countries");
const { getSalesRep } = require("../Controllers/SalesRep");
const router = express.Router();

router.get("/countries", getCountries)
router.get("/salesrep", getSalesRep)

module.exports = router;

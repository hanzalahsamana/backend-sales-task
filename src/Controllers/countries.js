const Country = require("../Models/countryModel");

const getCountries = async (req, res) => {
    try {
        const { region } = req.query;

        const countries = await Country.find(region ? { region } : {});

        if (countries.length === 0) {
            return res.status(404).json({ message: "No countries found" });
        }



        res.status(200).json(countries);
    } catch (error) {
        console.error("Error fetching countries:", error);
        res.status(500).json({ message: "Internal Server Error" || error.message });
    }
};

module.exports = { getCountries };

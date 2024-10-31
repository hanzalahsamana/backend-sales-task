const Country = require("../Models/countryModel");

const getSalesRep = async (req, res) => {
    try {
        const countries = await Country.find();

        const regions = {};
        const representatives = {};

        countries.forEach((country) => {
            const { region, name } = country;
            if (!regions[region]) {
                regions[region] = [];
            }
            regions[region].push(name);
        });

        Object.keys(regions).forEach((region) => {
            const countriesInRegion = regions[region];
            let currentRep = 1;
            while (countriesInRegion.length > 0) {
                if (!representatives[region]) {
                    representatives[region] = {};
                }
                let numCountries = Math.min(
                    7,
                    Math.max(3, countriesInRegion.length >= 3 ? Math.floor(Math.random() * 5) + 3 : countriesInRegion.length)
                );
                representatives[region][`Rep${currentRep}`] = countriesInRegion.splice(0, numCountries);
                if (countriesInRegion.length < 3 && countriesInRegion.length > 0) {
                    representatives[region][`Rep${currentRep}`].push(...countriesInRegion.splice(0));
                }
                currentRep++;
            }
        });

        res.json(representatives);
    } catch (error) {
        console.error("Error fetching sales representatives:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getSalesRep };  
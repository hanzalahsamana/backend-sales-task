const Country = require("../Models/countryModel");

const getSalesRep = async (req, res) => {
    try {
        const countries = await Country.find();

        const regions = countries.reduce((acc, { region, name }) => {
            if (!acc[region]) acc[region] = [];
            acc[region].push(name);
            return acc;
        }, {});

        const representatives = Object.entries(regions).reduce((acc, [region, countries]) => {
            acc[region] = splitCountriesIntoReps(countries);
            return acc;
        }, {});

        res.json(representatives);
    } catch (error) {
        console.error("Error fetching sales representatives:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const splitCountriesIntoReps = (countries) => {
    const reps = {};
    let repIndex = 1;

    while (countries.length > 0) {
        const numCountries = Math.min(7, Math.max(3, Math.floor(Math.random() * countries.length) + 1));

        if (countries.length - numCountries < 3 && countries.length - numCountries !== 0) {
            continue;
        } else {
            reps[`Rep${repIndex}`] = countries.splice(0, numCountries);
            repIndex++;
        }
    }

    return reps;
};

module.exports = { getSalesRep };

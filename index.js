const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); //
const morgan = require("morgan"); 
const router = require("./src/Routes/routes");
dotenv.config();
const connectDB = require("./src/Config/database"); 

const app = express();
const port = process.env.PORT || 3080;



connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); 

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.use("/api/v1", router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const express = require("express");
const cors = require("cors");
const app = express();

require("./database");
app.use(express.json());
app.use(cors());
// routes
app.use("/api", require("./routes/index.js"));
app.listen(3000);

console.log("server on port ", 3000);

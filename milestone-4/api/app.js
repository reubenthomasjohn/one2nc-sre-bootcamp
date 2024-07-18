const express = require("express");
const cors = require("cors");

// test

const app = express();
var corsOptions = {
  origin: "http://localhost:4200",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

const routes_v1 = require("./v1/routes");
const routes_v2 = require("./v1/routes");

app.use("/api", routes_v1);
app.use("/api", routes_v2);

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = server;

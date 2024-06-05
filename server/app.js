const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

app.use(express.static("build"));
app.use(bodyParser.json());
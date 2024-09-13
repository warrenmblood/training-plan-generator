const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

app.use(express.static("build"));
app.use(bodyParser.json());

const info = {
    jargon: {
        easy: {
            term: "easy pace",
            def: 'a relaxed, "conversational" pace. Under 75% Max HR'
        },
        tempo: {
            term: "tempo pace",
            def: "a harder effort, but maintainable for 40-60 minutes. 85-90% Max HR"
        }
    },
    offDay: {
        title: "Off Day",
        description: "Take a day to rest.",
        terms: []
    },
};

const plans = [];
let currentPlan = {};

app.get("/api/info", (req, res) => {
    console.log("GET info successful");
    res.send(info);
});

app.get("/api/plans", (req, res) => {
    console.log("GET plans successful");
    res.send(plans);
});

app.put("/api/plans/put", (req, res) => {
    console.log("PUT plans successful");
    let newPlan = req.body;
    plans.push(newPlan);
    res.send(plans);
});

app.get("/api/currentPlan", (req, res) => {
    console.log("GET currentPlan successful");
    res.send(currentPlan);
});

app.put("/api/currentPlan/put", (req, res) => {
    console.log("PUT currentPlan successful");
    currentPlan = req.body;
    res.send(currentPlan);
});
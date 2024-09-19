const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");

const { db } = require("./firebase.js");

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

let currentPlan = {};

app.get("/api/info", (req, res) => {
    res.send(info);
});

app.get("/api/plans", async (req, res) => {
    try {
        const result = await db.collection('plans').get();
        const plans = [];
        result.forEach(doc => plans.push(doc.data()));
        res.status(200).send(plans);
    } catch {
        res.sendStatus(400);
    }
});

app.put("/api/plans/put", async (req, res) => {
    try {
        const newPlan = req.body;
        const result = await db.collection('plans').add(newPlan);
        res.status(200).send(newPlan);
    } catch {
        res.sendStatus(400);
    }
});

app.get("/api/currentPlan", (req, res) => {
    res.send(currentPlan);
});

app.put("/api/currentPlan/put", (req, res) => {
    currentPlan = req.body;
    res.send(currentPlan);
});
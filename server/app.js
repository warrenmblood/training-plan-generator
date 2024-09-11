import { generatePlan } from "../src/utils.js";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

app.use(express.static("build"));
app.use(bodyParser.json());

const jargon = {
    easy: {
      term: "easy pace",
      def: 'a relaxed, "conversational" pace. Under 75% Max HR'
    },
    tempo: {
      term: "tempo pace",
      def: "a harder effort, but maintainable for 40-60 minutes. 85-90% Max HR"
    }
};

const offDay = {
    title: "Off Day",
    description: "Take a day to rest.",
    terms: []
};

const today = new Date();

const sampleInputs = {
    goalDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 90),
    startDate: today,
    goalDistance: 26.2,
    name: "Boston Marathon 2025",
    runsPerWeek: 5,
    startDistance: 9,
    unit: "mi"
};

const samplePlan = generatePlan(sampleInputs, offDay, jargon);
const plans = [samplePlan];

app.get("/api/plans", (req, res) => {
    console.log("GET successful");
    res.send(plans);
});

app.put("/api/plans/put", (req, res) => {
    console.log("PUT successful");
    let newPlan = req.body;
    plans.push(newPlan);
    res.send(plans);
});


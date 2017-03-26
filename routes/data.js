const express = require("express");
const DummyDB = require("../services/database");
const _ = require("lodash");
const router = express.Router();

outer.post("/mark", function(req, res, next) {
    new DummyDB().SaveMarks(req.body).then(() => {
        res.sendStatus(201);
    }, function() {
        res.sendStatus(500);
    });
});

router.post("/car", function(req, res, next) {
    new DummyDB().SaveCar(req.body).then(() => {
        res.sendStatus(201);
    }, () => {
        res.sendStatus(500);
    });
});

router.get("/intervalls", (req, res, next) => {
    new DummyDB().GetIntervalls(req.query.page).then((data) => {
        res.json(data);
    }, () => {
        res.sendStatus(500);
    });
});

router.post("/intervalls", (req, res, next) => {
    new DummyDB().SaveIntervalls(req.body).then(() => {
        res.sendStatus(201);
    }, () => {
        res.sendStatus(500);
    });
});

router.get("/cars", (req, res, next) => {
    new DummyDB().GetCars(req.query.page).then((data) => {
        res.json(data);
    }, () => {
        res.sendStatus(500);
    });
});

router.get("/marks", (req, res, next) => {
    new DummyDB().GetMarks().then((data) => {
        res.json(data);
    }, () => {
        res.sendStatus(500);
    });
});

module.exports = router;
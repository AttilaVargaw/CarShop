const express = require("express");
const DummyDB = require("../services/database");
const _ = require("lodash");
const router = express.Router();

class FilterType {
    constructor(selections, name) {
        this.selections = selections;
        this.name = name;
    }
}

class Model {
    constructor(marks, filters) {
        this.marks = marks;
        this.filters = filter;
    }
}

router.post("/mark", function(req, res, next) {
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

router.get("/", function(req, res, next) {
    const db = new DummyDB();

    Promise.all([

    ]).then((data) => {
        let model = new Model(data, [
            new FilterType()
        ]);
        res.render("admin", model);
    }, (err) => {
        res.status = 500;
        res.end();
    });

    //    Promise.all(db.GetMarks(), db.GetCarsByPriceInterval(), db.)
});

module.exports = router;
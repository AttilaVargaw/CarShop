var express = require("express");
let DummyDB = require("../services/database");
let _ = require("lodash");
var router = express.Router();

class Model {
    constructor(marks) {
        this.marks = marks;
    }
}

router.post("/addMark", function(req, res, next) {
    res.statusCode = 202;

    let db = new DummyDB().SaveMarks(req.body);

    res.end();
});

router.post("/addMark", function(req, res, next) {
    res.statusCode(202).end();
});

router.get("/", function(req, res, next) {
    let db = new DummyDB();

    db.GetMarks().then((data) => {
        let model = new Model(data);
        res.render("admin", model);
    }, (err) => {
        res.status = 500;
        res.end();
    });
});

module.exports = router;
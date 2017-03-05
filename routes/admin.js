var express = require("express");
let DummyDB = require("../services/database");
let _ = require("lodash");
var router = express.Router();

class Model {
    constructor(marks) {
        this.marks = marks;
    }
}

router.get("/", function(req, res, next) {
    let db = new DummyDB();

    let model = new Model(db.GetMarks());

    res.render("admin", model);
});

module.exports = router;
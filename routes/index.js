var express = require("express");
let _ = require("lodash");
var router = express.Router();
let Dummydb = require("../services/database");

class Model {
    constructor(cars) {
        this.cars = cars;
    }
}
router.get("/", function(req, res, next) {
    let db = new Dummydb();

    let model = new Model(db.GetCars(req.query.page || 0));

    res.render("index", model);
});

module.exports = router;
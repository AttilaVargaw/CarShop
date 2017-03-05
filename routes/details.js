var express = require("express");
var router = express.Router();
let Dummydb = require("../services/database");

class Model {
    constructor(car) {
        this.car = car;
    }
}

router.get("/", function(req, res, next) {
    let db = new Dummydb();
    db.CreateRandom();

    if (!req.query.id) {
        res.render("error", {
            errMsg: "Az autó nem található",
            errStatus: 500
        });
        return;
    }
    let car = db.GetCarById(req.query.id);

    if (car) {
        let model = new Model(car);
        res.render("details.pug", model);
    } else {
        res.render("error", {
            errMsg: "Az autó nem található",
            errStatus: 500
        });
    }

});

module.exports = router;
const express = require("express");
const router = express.Router();
const Dummydb = require("../services/database");

class Model {
    constructor(car) {
        this.car = car;
    }
}

router.get("/", function(req, res, next) {
    let db = new Dummydb();

    if (!req.query.id) {
        res.render("error", {
            errMsg: "Az autó nem található",
            errStatus: 500
        });
        return;
    }

    db.GetCarById(req.query.id).then((car) => {
        if (car) {
            let model = new Model(car);
            res.render("details.pug", model);
        } else {
            return Promise.fail();
        }
    }).catch((error) => {
        res.render("error", {
            errMsg: "Az autó nem található",
            errStatus: 500
        });
    });
});

module.exports = router;
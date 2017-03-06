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

    let model = db.GetCars(req.query.page || 0).then((data) => {
        let model = new Model(data);
        res.render("index", model);
    }, () => {
        res.render("error", {
            errorMsg: "",
            errorMsgStatus: 500
        });
    });

});

module.exports = router;
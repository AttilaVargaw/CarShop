const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Dummydb = require("../services/database");

class Model {
    constructor(cars, filters, page, isNext) {
        this.cars = cars;
        this.filters = filters;
        this.page = page;
        this.isNext = isNext;
    }
}

router.get("/", function(req, res, next) {
    const numPerPage = 6;
    const db = new Dummydb();
    let page = Number.parseInt(req.query.page) || 0;
    const cleanedFilters = CleanFilters(req.query);

    function CleanFilters(filter) {
        return _.pickBy(filter, (e, k, o) => {
            return e !== "-1" && k !== "page";
        });
    }

    Promise.all([db.GetCars(page, cleanedFilters, numPerPage), db.GetFilters()]).then((cars) => {
        return Promise.all(cars).then(result => {
            _.forEach(cleanedFilters, (e, k) => {
                _.find(result[1], (e2) => e2.name === k).selected = e;
            });
            let startIndex = (((page + 1) * numPerPage) / result[0].count);
            let isNext = 1 > startIndex;
            res.render("index", new Model(result[0], result[1], page, isNext));
        });
    }).catch((e) => {
        console.log(e);
        res.sendStatus(500);
    });
});

module.exports = router;
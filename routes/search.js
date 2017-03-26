const express = require("express");
const router = express.Router();

class Model {
    constructor() {

    }
}

router.get("/", function(req, res, next) {
    let model = new Model();

    res.render("search.html", model);
});

module.exports = router;
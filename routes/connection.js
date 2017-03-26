const express = require("express");
const _ = require("lodash");
const router = express.Router();

class Model {

}

router.get("/", function(req, res, next) {
    let model = new Model();

    res.render("connection", model);
});

module.exports = router;
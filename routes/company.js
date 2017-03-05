var express = require("express");
let _ = require("lodash");
var router = express.Router();

class Model {

}

router.get("/", function(req, res, next) {
    let model = new Model();

    res.render("company", model);
});

module.exports = router;
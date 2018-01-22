const express = require('express');
const router = express.Router();
const randomstring = require("randomstring");
const validator = require("validator");

const Short = require("./models/short");

router.get("/", (req, res) => {
    res.render("index");
});

module.exports = router;
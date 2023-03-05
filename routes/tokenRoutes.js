
const express = require("express");
const { getTokensByLocation , createToken, getNumberOfTokensByLocation } = require("../controllers/tokenController")
const router = express.Router();


router.route("/:address").get(getTokensByLocation);
router.route("/number/:address").get(getNumberOfTokensByLocation);
router.route("/").post(createToken);


module.exports = router;
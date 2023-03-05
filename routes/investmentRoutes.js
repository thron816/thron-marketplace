const express = require("express");
const {
    getTotalInvestment,
    createInvestment,
    addInvestment,
    WithdrawInvestment
} = require("../controllers/investmentController");
const router = express.Router();

router.route("/:address").get(getTotalInvestment);
router.route("/").post(createInvestment);
router.route("/:address").put(addInvestment);
router.route("/withdraw/:address").put(WithdrawInvestment);

module.exports = router;

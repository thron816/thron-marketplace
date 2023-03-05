const express = require("express");
const {
  getNftsByLocation,
  createNft,
  getNumberOfNftsByLocation,
  updateNftOwner,
  stakeNft,
  getAllNftsOfUser,
} = require("../controllers/nftController");
const router = express.Router();

router.route("/:address").get(getNftsByLocation);
router.route("/total/:address").get(getAllNftsOfUser);

router.route("/number/:address").get(getNumberOfNftsByLocation);
router.route("/").post(createNft);
router.route("/:name").put(updateNftOwner);
router.route("/stake/:name").put(stakeNft);

module.exports = router;

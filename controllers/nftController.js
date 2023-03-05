const Nft = require("../models/nftModel");
const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");

// get all nfts of a user
exports.getAllNftsOfUser = catchAsyncErrors(async (req, res, next) => {
  const nfts = await Nft.find({ address: req.params.address });
  res.status(200).json({
    // sucess: true,
    nfts,
  });
});

// Get Nfts by address
exports.getNftsByLocation = catchAsyncErrors(async (req, res, next) => {
  const nfts = await Nft.find({ address: req.params.address });
  res.status(200).json({
    sucess: true,
    nfts,
  });
});
// Get number of Nfts by address
exports.getNumberOfNftsByLocation = catchAsyncErrors(async (req, res, next) => {
  const nfts = await Nft.find({ address: req.params.address }).count();
  res.status(200).json({
    sucess: true,
    nfts,
  });
});

exports.createNft = catchAsyncErrors(async (req, res, next) => {
  const nftt = await Nft.findOne({ name: req.body.name });

  if (nftt) {
    return next(new ErrorHandler("Nft already exists", 404));
  }
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  // console.log(images);

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "nfts",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  const nft = await Nft.create(req.body);

  res.status(201).json({
    success: true,
    nft,
  });
});

exports.updateNftOwner = catchAsyncErrors(async (req, res, next) => {
  const updatedNft = await Nft.findOneAndUpdate(
    { name: req.params.name },
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  // sendToken(updatedBarber, 200, res);
  res.status(200).json({
    success: true,
    updatedNft,
  });
});

//Stake Nft
exports.stakeNft = catchAsyncErrors(async (req, res, next) => {
  const nft = await Nft.findOne({ name: req.params.name });

  if (!nft) {
    return next(new ErrorHandler("Nft not found", 404));
  }

  const updatedNft = await Nft.findOneAndUpdate(
    { name: req.params.name },
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    updatedNft,
  });
});

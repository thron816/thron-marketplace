const Token = require('../models/tokenModel')
const cloudinary = require("cloudinary")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// Get Tokens by address
exports.getTokensByLocation = catchAsyncErrors(async(req, res, next) => {
    const tokens = await Token.find({ address: req.params.address })
    res.status(200).json({
        sucess: true,
        tokens
    })

})

// Get number of Tokens by address
exports.getNumberOfTokensByLocation = catchAsyncErrors(async(req, res, next) => {
    const tokens = await Token.find({ address: req.params.address }).count()
    
    res.status(200).json({
        sucess: true,
        tokens
    })

})


exports.createToken = catchAsyncErrors(async(req, res, next) => {
    let images = []

    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    const imagesLinks = []

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'tokens',
        })

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        })
    }

    req.body.images = imagesLinks

    const token = await Token.create(req.body)

    res.status(201).json({
        success: true,
        token,
    })

})

const Investment = require('../models/investmentModel')
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");



// Get Investment By Address
exports.getTotalInvestment = catchAsyncErrors(async(req, res, next) => {
    const investment = await Investment.findOne({ address: req.params.address })
    const amount = investment?.investment;
    res.status(200).json({
        sucess: true,
        amount
    })

})

//Create Investment
exports.createInvestment = catchAsyncErrors(async(req, res, next) => {
    const investment = await Investment.create(req.body)
    res.status(201).json({
        success: true,
        investment,
    })

})
//Add Investment amount
exports.addInvestment = catchAsyncErrors(async(req, res, next) => {

    const investmentVal = await Investment.findOne({ address: req.params.address })
    let updatedInvestment;
    if(investmentVal){
    const filter = { address: req.params.address };    
    const number= Number(req.body.investment)
    const update = { investment: investmentVal.investment + number };
    updatedInvestment = await Investment.findOneAndUpdate(filter , update)}
    else{
        
        updatedInvestment = await Investment.create(req.body)
    }
    res.status(200).json({
        success: true,
        updatedInvestment
    })
})


//Withdraw Investment amount
exports.WithdrawInvestment = catchAsyncErrors(async(req, res, next) => {

    const investmentVal = await Investment.findOne({ address: req.params.address })

    if (!investmentVal) {
        return next(new ErrorHandler("Investment not found", 404));
     }
    if (Number(req.body.investment)>investmentVal.investment){
        return next(new ErrorHandler("Withdrawal Greater than Investment", 404));
    }
    
    const filter = { address: req.params.address };    
    const number= Number(req.body.investment)
    const update = { investment: investmentVal.investment - number };
    let updatedInvestment = await Investment.findOneAndUpdate(filter , update)
    res.status(200).json({
        success: true,
        updatedInvestment
    })
})

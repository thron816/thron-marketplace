const mongoose = require('mongoose')

const investmentSchema = mongoose.Schema({

        address: {
            type: String,
            required: true,
        },
        investment: {
            type: Number,
            default: 0,
            required : false
          },

    },
)

module.exports = mongoose.model('Investment', investmentSchema)
const mongoose = require('mongoose')

const nftSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        staked: {
            type: Number,
            default: 0,
            required : false
          },


        images: [{
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }],




    },

)




module.exports = mongoose.model('Nft', nftSchema)
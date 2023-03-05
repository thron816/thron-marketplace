const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // symbol: {
  //     type: String,
  //     required: true,
  // },
  totalSupply: {
    type: Number,
    default: 0,
  },

  address: {
    type: String,
    required: true,
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Token", tokenSchema);

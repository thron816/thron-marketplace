const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
var path = require("path");
var cors = require("cors");
const dotenv = require("dotenv");
const port = process.env.PORT ||5000;
dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloudinaryCloudName,
  api_key: process.env.APIKey,
  api_secret: process.env.APISecret,
});

const corsOptions = {
  origin: true,
  // origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./client/build")))

app.get("*", (req, res) => {
  res.sendFile(
      path.join(__dirname, "./client/build/index.html"),
      function (err) {
          res.status(500).send(err)
      }
  )
})

const nft = require("./routes/nftRoutes");
const token = require("./routes/tokenRoutes");
const investment = require("./routes/investmentRoutes");

app.use("/api/nfts", nft);
app.use("/api/tokens", token);
app.use("/api/investments", investment);

const connectDB = async () => {
  console.log(process.env.mongoUri);
  try {
    const conn = await mongoose.connect(process.env.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};



const server = app.listen(process.env.PORT, () =>

  console.log(`Server started on port ${process.env.PORT}`),
  connectDB()
);
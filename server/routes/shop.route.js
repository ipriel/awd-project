const express = require("express");
const router = express.Router();
const { ShopAddress } = require("../models/shop.model");

router.get("/addresses", async (req, res) => {
  try {
    const addresses = await ShopAddress.find({});

    res.status(200).send({
      shopAddresses: addresses.map((address) => address.toJSON()),
    });
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;

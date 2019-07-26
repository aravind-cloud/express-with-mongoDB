const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const productModel = require("../models/Product");

// Get all products
router.get("/", (req, res) => {
  productModel
    .find()
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json({
          message: "Success",
          response: result
        });
      } else {
        res.status(404).json({
          message: "No records found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
});

//Get product by productID
router.get("/:productId", (req, res) => {
  const id = req.params.productId;
  productModel
    .findById(id)
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json({
          message: "Success",
          response: result
        });
      } else {
        res.status(404).json({
          message: "No records found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
});

//Create a product
router.post("/", (req, res) => {
  console.log(req.body);
  const pType = req.body.metadata.productType
    ? req.body.metadata.productType
    : "Electronics";
  const productEntity = new productModel({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    quantity: req.body.quantity,
    available: req.body.available,
    metadata: {
      description: req.body.metadata.description,
      imported: req.body.metadata.imported,
      productType: pType
    }
  });
  productEntity
    .save()
    .then(result => {
      console.log("Response " + result);
      res.status(201).json({
        message: "Successfully created the product",
        createdProduct: productEntity
      });
    })
    .catch(err => {
      console.log(`ERROR OCCURED @@@ ${err}`);
      res.status(500).json({
        message: "Error occured",
        errorDetails: err
      });
    });
});

module.exports = router;

const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  quantity: { type: Number, default: 1 },
  available: { type: Boolean, default: true },
  metadata: {
    description: String,
    productType: { type: String, default: "Electronics" },
    imported: { type: Boolean, default: false }
  }
});

const productModel = mongoose.model("productModel", productSchema);

module.exports = productModel;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShedSchema = new Schema({
  location: {
    x: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    y: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
  },
  boxes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Box",
    },
  ],
  capacity: {
    type:Number,
    required:true
  },
  height:{
    type:mongoose.Types.Decimal128,
    required:true
  },
  rowNumber: {
    type:Number,
    required:true
  }
});

module.exports = mongoose.model("Shed", ShedSchema);

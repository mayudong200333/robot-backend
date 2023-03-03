const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GunnerSchema = new Schema({
  location: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
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
  }
});

module.exports = mongoose.model("Gunner", GunnerSchema);

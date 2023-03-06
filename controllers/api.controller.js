const Shed = require("../models/shed");
const Box = require("../models/box");

module.exports.getShedsCapacity = async (req, res) => {
  const sheds = await Shed.find({}).populate({ path: "boxes" });;
  const result = sheds.map((shed) => {
    curcap = shed.capacity - shed.boxes.length;
    const used_index = []
    shed.boxes.forEach(box=>{
      used_index.push(box.index);
    })
    const unused_index = []
    for (let i = 0;i<shed.capacity;i++){
      if (!(i in used_index)){
        unused_index.push(i)
      } 
    }
    return {
      location: shed.location,
      current_capacity: curcap,
      unused_index
    };
  });
  res.status(200).json(result)
};

module.exports.createNewShed = async (req, res) => {
  if (!req.body.shed) {
    res.status(400).send({ message: "You should post a shed!" });
    return;
  }

  const shed = new Shed(req.body.shed);

  try {
    const savedshed = await shed.save();
    res.status(200).json(savedshed);
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message || "Something wrong in the server" });
  }
};

module.exports.appendNewBox = async (req, res) => {
  if (!req.body.box) {
    res.status(400).send({ message: "You should post a box!" });
    return;
  }

  const { shedid } = req.params;
  const shed = await Shed.findById(shedid);

  if (!shed) {
    res
      .status(404)
      .send({ message: "Can't find the specific Id of the shed" });
    return;
  }

  if (shed.boxes.length + 1 > shed.capacity) {
    res
      .status(400)
      .send({ message: "The shed have no capacity to append new box" });
    return;
  }

  const box = new Box(req.body.box);
  box.shed = shed;

  shed.boxes.push(box);
  await shed.save();
  await box.save();

  res
    .status(200)
    .send({ message: `Successfully to append the new box in ${shedid}` });
};

module.exports.takebox = async (req, res) => {
  if (!req.body.boxId) {
    res.status(400).send({ message: "You should request a boxId!" });
    return;
  }

  const { shedid } = req.params;
  const shed = await Shed.findById(shedid);

  if (!shed) {
    res
      .status(404)
      .send({ message: "Can't find the specific Id of the shed" });
    return;
  }

  const box = await Box.findById(req.body.boxId);

  if (!box) {
    res.status(404).send({ message: "Can't find the specific Id of the box" });
    return;
  }

  box.index = -1;
  box.shed = null;
  const newboxes = shed.boxes.filter((box) => box._id != req.body.boxId);
  shed.boxes = newboxes;
  await shed.save();
  await box.save();
  res.status(200).send({
    message: `You take box ${req.body.boxId} from shed ${shedid}`,
  });
};

module.exports.appendBox = async (req, res) => {
  if (!req.body.boxId || !req.body.index) {
    res
      .status(400)
      .send({ message: "You should request a boxId and set the index" });
    return;
  }
  const boxId = req.body.boxId;
  const index = req.body.index;

  const { shedid } = req.params;
  const shed = await Shed.findById(shedid);

  if (!shed) {
    res
      .status(404)
      .send({ message: "Can't find the specific Id of the shed" });
    return;
  }
  if (shed.boxes.length + 1 > shed.capacity) {
    res
      .status(400)
      .send({ message: "The shed have no capacity to append new box" });
    return;
  }
  if (index > shed.capacity) {
    res.status(400).send({ message: "Index is large than the capacity" });
    return;
  }

  const box = await Box.findById(boxId);

  if (!box) {
    res.status(404).send({ message: "Can't find the box" });
    return;
  }
  if (box.index !== -1) {
    res.status(400).send({ message: "The box is existed in some shed" });
    return;
  }

  box.index = index;
  box.shed = shed
  shed.boxes.push(box);
  await shed.save();
  await box.save();

  res
    .status(200)
    .send({
      message: `Successfully to append box ${boxId} to shed ${shedid}`,
    });
};

module.exports.deleteShed = async (req, res) => {
  const { shedid } = req.params;
  const shed = await Shed.findById(shedid).populate({ path: "boxes" });

  if (!shed) {
    res
      .status(404)
      .send({ message: "Can't find the specific Id of the shed" });
    return;
  }

  for (const box of shed.boxes) {
    box.index = -1;
    box.shed = null;
    await box.save();
  }

  await Shed.findByIdAndDelete(shedid);
  res.status(200).send({ message: `deleted the shed ${shedid}` });
};

module.exports.deleteBox = async (req, res) => {
    const {shedid,boxid} = req.params;
    await Shed.findByIdAndUpdate(shedid,{$pull:{boxes:boxid}});
    await Box.findByIdAndDelete(boxid);
    res.status(200).send({message:`You deleted box ${boxid} in shed ${shedid}`})
};

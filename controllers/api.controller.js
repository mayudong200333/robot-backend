const Gunner = require("../models/gunner");
const Box = require("../models/box");

module.exports.getGunnersCapacity = async (req, res) => {
  const gunners = await Gunner.find({});
  const result = gunners.map((gunner) => {
    curcap = gunner.capacity - gunner.boxes.length;
    return {
      location: gunner.location,
      current_capacity: curcap,
    };
  });
  res.status(200).send(JSON.stringify(result));
};

module.exports.createNewGunner = async (req, res) => {
  if (!req.body.gunner) {
    res.status(400).send({ message: "You should post a gunner!" });
    return;
  }

  const gunner = new Gunner(req.body.gunner);

  try {
    const savedgunner = await gunner.save();
    res.status(200).send(JSON.stringify(savedgunner));
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

  const { gunnerid } = req.params;
  const gunner = await Gunner.findById(gunnerid);

  if (!gunner) {
    res
      .status(404)
      .send({ message: "Can't find the specific Id of the gunner" });
    return;
  }

  if (gunner.boxes.length + 1 > gunner.capacity) {
    res
      .status(400)
      .send({ message: "The gunner have no capacity to append new box" });
    return;
  }

  const box = new Box(req.body.box);

  gunner.boxes.push(box);
  gunner.save();
  box.save();

  res
    .status(200)
    .send({ message: `Successfully to append the new box in ${gunnerid}` });
};

module.exports.takebox = async (req, res) => {
  if (!req.body.boxId) {
    res.status(400).send({ message: "You should request a boxId!" });
    return;
  }

  const { gunnerid } = req.params;
  const gunner = await Gunner.findById(gunnerid);

  if (!gunner) {
    res
      .status(404)
      .send({ message: "Can't find the specific Id of the gunner" });
    return;
  }

  const box = await Box.findById(req.body.boxId);

  if (!box) {
    res.status(404).send({ message: "Can't find the specific Id of the box" });
    return;
  }
  box.index = -1;
  const newboxes = gunner.boxes.filter((box) => box._id != req.body.boxId);
  gunner.boxes = newboxes;
  await gunner.save();
  await box.save();
  res.status(200).send({
    message: `You take box ${req.body.boxId} from gunner ${gunnerid}`,
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

  const { gunnerid } = req.params;
  const gunner = await Gunner.findById(gunnerid);

  if (!gunner) {
    res
      .status(404)
      .send({ message: "Can't find the specific Id of the gunner" });
    return;
  }
  if (gunner.boxes.length + 1 > gunner.capacity) {
    res
      .status(400)
      .send({ message: "The gunner have no capacity to append new box" });
    return;
  }
  if (index > gunner.capacity) {
    res.status(400).send({ message: "There are something in the index" });
    return;
  }

  const box = await Box.findById(boxId);

  if (!box) {
    res.status(404).send({ message: "Can't find the box" });
    return;
  }
  if (box.index !== -1) {
    res.status(400).send({ message: "The box is existed in some gunner" });
    return;
  }

  box.index = index;
  gunner.boxes.push(box);
  await gunner.save();
  await box.save();

  res
    .status(200)
    .send({
      message: `Successfully to append box ${boxId} to gunner ${gunnerid}`,
    });
};

module.exports.deleteGunner = async (req, res) => {
  const { gunnerid } = req.params;
  const gunner = await Gunner.findById(gunnerid).populate({ path: "boxes" });

  if (!gunner) {
    res
      .status(404)
      .send({ message: "Can't find the specific Id of the gunner" });
    return;
  }

  for (const box of gunner.boxes) {
    box.index = -1;
    await box.save();
  }
  console.log(gunner);

  await Gunner.findByIdAndDelete(gunnerid);
  res.status(200).send({ message: `deleted the gunner ${gunnerid}` });
};

module.exports.deleteBox = async (req, res) => {
    const {gunnerid,boxid} = req.params;
    await Gunner.findByIdAndUpdate(gunnerid,{$pull:{boxes:boxid}});
    await Box.findByIdAndDelete(boxid);
    res.status(200).send({message:`You deleted box ${boxid} in gunner ${gunnerid}`})
};

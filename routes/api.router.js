const express = require("express");
const router = express.Router();
const api = require("../controllers/api.controller");

router.get("/currentcapacity",api.getGunnersCapacity);

router.post("/newgunner", api.createNewGunner);

router.post("/appendnewbox/:gunnerid",api.appendNewBox);

router.patch("/takebox/:gunnerid",api.takebox);

router.patch("/appendbox/:gunnerid",api.appendBox);

router.delete("/deletegunner/:gunnerid",api.deleteGunner);

router.delete("/deletebox/:gunnerid/:boxid",api.deleteBox);
  
module.exports = router;

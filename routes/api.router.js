const express = require("express");
const router = express.Router();
const api = require("../controllers/api.controller");

router.get("/currentcapacity",api.getShedsCapacity);

router.post("/newshed", api.createNewShed);

router.post("/appendnewbox/:shedid",api.appendNewBox);

router.patch("/takebox/:shedid",api.takebox);

router.patch("/appendbox/:shedid",api.appendBox);

router.delete("/deleteshed/:shedid",api.deleteShed);

router.delete("/deletebox/:shedid/:boxid",api.deleteBox);
  
module.exports = router;

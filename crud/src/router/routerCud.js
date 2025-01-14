const express = require("express");
const router = express.Router();

const controller = require("../controller/controllerCud");

router.post("/authRegister", controller.authRegister);
router.post("/authLogin", controller.authLogin);
router.get("/logout", controller.processLogout);
router.post("/add-collection", controller.addCollections);
router.post("/add-task/:id", controller.addTask);
router.patch("/done/:id", controller.doneGaBang);
router.patch("/pending/:id", controller.pendingNeh);
router.patch("/updateTask/:id", controller.updateTask);
router.delete("/deletetask/:id", controller.deleteSemuaTask);
router.delete("/deleteTasks/:id", controller.btnDeleteTasks);

module.exports = router;

const express = require("express");
const router = express.Router();

const controller = require("../controller/controllerRender");
router.get("/", controller.renderHome);
router.get("/add-collection", controller.renderAddCollections);
router.get("/add-task/:id", controller.renderAddTask);
router.get("/login", controller.renderLogin);
router.get("/register", controller.renderRegister);
router.get("/editTask/:id", controller.renderEditTask);

module.exports = router;

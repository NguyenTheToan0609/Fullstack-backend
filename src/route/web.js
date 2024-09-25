import express from "express";
import homeController from "../controller/homeController";
const router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  return app.use("/", router);
};

module.exports = initWebRoutes;

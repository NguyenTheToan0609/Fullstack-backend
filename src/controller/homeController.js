import db from "../models/index";
import { createNewser } from "../services/CRUDService";

let getHomePage = async (req, res) => {
  let data = await db.User.findAll();

  return res.render("homePage.ejs", { data: JSON.stringify(data) });
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let result = await createNewser(req.body);
  console.log(result);
  return res.send("post crud from server");
};

module.exports = {
  getHomePage,
  getCRUD,
  postCRUD,
};

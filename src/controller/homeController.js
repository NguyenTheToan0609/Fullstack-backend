import db from "../models/index";

let getHomePage = async (req, res) => {
  let data = await db.User.findAll();

  return res.render("homePage.ejs", { data: JSON.stringify(data) });
};

module.exports = {
  getHomePage,
};

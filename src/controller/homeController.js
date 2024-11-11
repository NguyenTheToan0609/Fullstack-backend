import {
  createNewser,
  getAllUsers,
  getUserInfoId,
  updateUserData,
  deleteUserData,
} from "../services/CRUDService";

let getHomePage = async (req, res) => {
  let data = await getAllUsers();
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

let displayGetCRUD = async (req, res) => {
  let data = await getAllUsers();
  return res.render("displayusers.ejs", { dataUsers: data });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await getUserInfoId(userId);
    return res.render("editCRUD.ejs", {
      userData: userData,
    });
  }
};

let putEditCRUD = async (req, res) => {
  let data = req.body;
  await updateUserData(data);
  return res.redirect("/get-crud");
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await deleteUserData(id);
    return res.redirect("/get-crud");
  } else {
    return res.send("Not found id");
  }
};

module.exports = {
  getHomePage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
  putEditCRUD,
  deleteCRUD,
};

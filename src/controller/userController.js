import { json } from "body-parser";
import {
  handleUserLogin,
  getAllUsers,
  createNewUSer,
  deleteUser,
  editUser,
  getAllCodeService,
} from "../services/userServices";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input paramter!",
    });
  }

  let userData = await handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUser = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required paramter",
      users: [],
    });
  }
  let users = await getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let data = req.body;
  let message = await createNewUSer(data);
  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await editUser(data);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Not found id",
    });
  }
  let message = await deleteUser(id);
  return res.status(200).json(message);
};

let getAllcode = async (req, res) => {
  let data = await getAllCodeService(req.query.type);
  return res.status(200).json(data);
};

module.exports = {
  handleLogin,
  handleGetAllUser,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
  getAllcode,
};

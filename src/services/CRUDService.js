import bcrypt from "bcryptjs";
import db from "../models/index";
import { raw } from "body-parser";

const salt = bcrypt.genSaltSync(10);

let createNewser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordBcryptjs = await hashPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordBcryptjs,
        firstName: data.firstname,
        lastName: data.lastname,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleid,
        phonenumber: data.phonenumber,
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

let hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findAll({ raw: true });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewser,
  getAllUsers,
};

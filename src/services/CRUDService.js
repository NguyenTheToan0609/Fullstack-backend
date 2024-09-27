import bcrypt from "bcryptjs";
import db from "../models/index";
import { raw } from "body-parser";
import { where } from "sequelize";

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

let getUserInfoId = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstname;
        user.lastName = data.lastname;
        user.address = data.address;

        await user.save();
        resolve();
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUserData = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewser,
  getAllUsers,
  getUserInfoId,
  updateUserData,
  deleteUserData,
};

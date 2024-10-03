import { where } from "sequelize";
var bcrypt = require("bcryptjs");
import db from "../models/index";
import { raw } from "body-parser";

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    let userData = {};
    try {
      let isExist = await checkUSerEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = `Ok`;
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = `wrong password`;
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `your's Email isn't exist in your system . Pls try other enail`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUSerEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin,
};

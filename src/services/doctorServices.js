import { where } from "sequelize";
import db from "../models/index";
import { raw } from "body-parser";

let getAllTopDoctor = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        where: { roleId: "R2" },
        limit: limitInput,
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllDoctorsService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

let saveDetailDoctor = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputData || !inputData.contentHTMl || !inputData.contentMarkdown) {
        resolve({
          errCode: 2,
          errMessage: "Missing required paramters",
        });
      } else {
        await db.Markdown.create({
          contentHTMl: inputData.contentHTMl,
          contentMarkdown: inputData.contentMarkdown,
          description: inputData.description,
          doctorId: inputData.doctorId,
        });
        resolve({
          errCode: 0,
          errMessage: "Add new doctor success!!",
        });
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

module.exports = {
  getAllTopDoctor,
  getAllDoctorsService,
  saveDetailDoctor,
};
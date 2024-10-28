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
      if (
        !inputData ||
        !inputData.contentHTMl ||
        !inputData.contentMarkdown ||
        !inputData.action
      ) {
        resolve({
          errCode: 2,
          errMessage: "Missing required paramters",
        });
      } else {
        if (inputData.action === "CREATE") {
          await db.Markdown.create({
            contentHTMl: inputData.contentHTMl,
            contentMarkdown: inputData.contentMarkdown,
            description: inputData.description,
            doctorId: inputData.doctorId,
          });
        } else if (inputData.action === "EDIT") {
          let doctorMarkDown = await db.Markdown.findOne({
            where: { doctorId: inputData.doctorId },
            raw: false,
          });
          if (doctorMarkDown) {
            doctorMarkDown.contentHTMl = inputData.contentHTMl;
            doctorMarkDown.contentMarkdown = inputData.contentMarkdown;
            doctorMarkDown.description = inputData.description;
            await doctorMarkDown.save();
          }
        }
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

let getDetailDoctorByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required paramters",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: inputId },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["contentHTMl", "description", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
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
  getDetailDoctorByIdService,
};

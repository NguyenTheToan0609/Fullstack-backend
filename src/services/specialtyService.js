const { reject } = require("lodash");
const db = require("../models");
const { where } = require("sequelize");

let createSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.image ||
        !data.descriptionHTML ||
        !data.descriptionMarkDown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let existingSpecialty = await db.Specialty.findOne({
          where: { name: data.name },
        });
        if (existingSpecialty) {
          resolve({
            errCode: 2,
            errMessage:
              "Specialty name already exists. Please choose a different name.",
          });
        } else {
          await db.Specialty.create({
            name: data.name,
            image: data.image,
            descriptionHTML: data.descriptionHTML,
            descriptionMarkDown: data.descriptionMarkDown,
          });
        }
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllSpecialtyService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      if (!data) data = {};

      resolve({
        errCode: 0,
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailSpecialtyByIdService = (inputData, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputData || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let data = await db.Specialty.findOne({
          where: {
            id: inputData,
          },
          attributes: ["descriptionHTML", "descriptionMarkDown"],
        });
        if (data) {
          let doctorSpecialty = [];
          if (location === "ALL") {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: {
                specialtyId: inputData,
              },
              attributes: ["doctorId", "provinceId"],
            });
          } else {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: {
                specialtyId: inputData,
                provinceId: location,
              },
              attributes: ["doctorId", "provinceId"],
            });
          }
          data.doctorSpecialty = doctorSpecialty;
        } else data = {};

        resolve({
          errCode: 0,
          errMessage: "OK",
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createSpecialtyService,
  getAllSpecialtyService,
  getDetailSpecialtyByIdService,
};

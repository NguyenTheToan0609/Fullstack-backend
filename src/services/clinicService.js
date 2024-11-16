const { reject } = require("lodash");
const db = require("../models");

let createClinicService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.image ||
        !data.descriptionHTML ||
        !data.descriptionMarkDown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let existingClinic = await db.Clinic.findOne({
          where: { name: data.name },
        });
        if (existingClinic) {
          resolve({
            errCode: 2,
            errMessage:
              "Clinic name already exists. Please choose a different name.",
          });
        } else {
          await db.Clinic.create({
            name: data.name,
            address: data.address,
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

let getAllClinicService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
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

let getDetailClinicByIdService = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputData) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: {
            id: inputData,
          },
          attributes: [
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkDown",
          ],
        });
        if (data) {
          let doctorClinic = [];
          doctorClinic = await db.Doctor_Infor.findAll({
            where: {
              clinicId: inputData,
            },
            attributes: ["doctorId", "provinceId"],
          });
          data.doctorClinic = doctorClinic;
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
  createClinicService,
  getAllClinicService,
  getDetailClinicByIdService,
};

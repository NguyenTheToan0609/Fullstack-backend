import { where } from "sequelize";
import db from "../models/index";
import { raw } from "body-parser";
require("dotenv").config();
import _, { reject } from "lodash";
const MaX_NUMBER_SCHEDULE = process.env.MaX_NUMBER_SCHEDULE;

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

let bulkCreateScheduleService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
        resolve({
          errCode: 1,
          errMessage: "Missing required paramters",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MaX_NUMBER_SCHEDULE;
            return item;
          });
        }

        //get all existing data
        let existing = await db.Schedule.findAll({
          where: {
            doctorId: data.doctorId,
            date: data.formatedDate,
          },
          attributes: ["timeType", "date", "doctorId", "maxNumber"],
          raw: true,
        });

        //compare different
        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });

        //create data
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

let getScheduleDateService = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required paramters ",
        });
      } else {
        let dataSchedule = await db.Schedule.findAll({
          where: {
            doctorId: doctorId,
            date: date,
          },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });

        if (!dataSchedule) dataSchedule = [];

        resolve({
          errCode: 0,
          data: dataSchedule,
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
  bulkCreateScheduleService,
  getScheduleDateService,
};

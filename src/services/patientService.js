import { reject } from "lodash";
import db from "../models/index";
require("dotenv").config();
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";
import { where } from "sequelize";
import { raw } from "body-parser";

let builUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&&doctorId=${doctorId}`;
  return result;
};

let postInforPatientService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.date ||
        !data.timeType ||
        !data.fullName ||
        !data.selectedGender ||
        !data.address ||
        !data.phoneNumber
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let token = uuidv4();
        await emailService.sendSimpleEmail({
          reciverEmail: data.email,
          patientName: data.fullName,
          timeString: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: builUrlEmail(data.doctorId, token),
        });

        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            firstName: data.fullName,
            address: data.address,
            gender: data.selectedGender,
            phonenumber: data.phoneNumber,
          },
        });

        if (user && user[0]) {
          await db.Booking.create({
            where: { paitenId: user[0].id },
            statusId: "S1",
            doctorId: data.doctorId,
            paitenId: user[0].id,
            date: data.date,
            timeType: data.timeType,
            token: token,
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Booking success!!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let postVerifyInforPatientService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.token) {
        resolve({
          errCode: 1,
          errMessage: "Missing required paramters",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Update the appointment success",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Appointment has been booked or does not exist",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postInforPatientService,
  postVerifyInforPatientService,
};

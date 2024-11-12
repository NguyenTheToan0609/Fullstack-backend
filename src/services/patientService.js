import db from "../models/index";
require("dotenv").config();
import emmailService from "./emailService";

let postInforPatientService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.date ||
        !data.timeType ||
        !data.fullName
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required paramters",
        });
      } else {
        await emmailService.sendSimpleEmail({
          reciverEmail: data.email,
          patientName: data.fullName,
          timeString: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink:
            "https://www.youtube.com/channel/UCyEewAFvdb7ReTLqydD31cw",
        });

        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            rodeId: "R3",
          },
        });
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { paitenId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              paitenId: user[0].id,
              date: data.date,
              timeType: data.timeType,
            },
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Booking  success!!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postInforPatientService,
};

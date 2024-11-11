import db from "../models/index";
require("dotenv").config();

let postInforPatientService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorId || !data.date || !data.timeType) {
        resolve({
          errCode: 1,
          errMessage: "Missing required paramters",
        });
      } else {
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

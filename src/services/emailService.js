require("dotenv").config();

const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Thế Toàn 👻" <vantoan060903@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
  <h3>Xin chào ${dataSend.patientName}</h3>
  <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên trang web Booking Care</p>
  <p>Thông tin đặt lịch khám bệnh :</p>
  <div><b>Thời gian : ${dataSend.timeString}</b></div>
  <div><b>Bác Sĩ : ${dataSend.doctorName}</b></div>

  <p>Nếu các thông tin trên là đúng sự thật , vui lòng click vào đường link bên dưới 
  để xác nhận và hoàn tất thử tục đặt lịch khám bệnh.
  </p>
  <div>
    <a href = ${dataSend.redirectLink} target="_blank">Click here</a>
  </div>

  <div>Xin chân thành cảm ơn !!</div>
  `;
  }

  if (dataSend.language === "en") {
    result = `
  <h3>Hello ${dataSend.patientName}</h3>
  <p>You received this email because you booked an online medical appointment on the Booking Care website</p>
  <p>Information for scheduling medical examination :</p>
  <div><b>Time : ${dataSend.timeString}</b></div>
  <div><b>Doctor : ${dataSend.doctorName}</b></div>

  <p>If the above information is true, please click on the link below 
  to confirm and complete the medical examination scheduling process.
  </p>
  <div>
    <a href = ${dataSend.redirectLink} target="_blank">Click here</a>
  </div>

  <div>Thank you very much!!</div>
  `;
  }
  return result;
};

let sendRemedyEmail = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Thế Toàn 👻" <vantoan060903@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
    html: getBodyHTMLEmailRemedy(dataSend),
    attachments: [
      {
        filename: `${dataSend.paitenId} - ${dataSend.patientName}.png`,
        content: dataSend.imageBase64.split("base64")[1],
        encoding: "base64",
      },
    ],
  });
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
  <h3>Xin chào ${dataSend.patientName}</h3>
  <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên trang web Booking Care thành công</p>
  <p>Thông tin đơn thuốc / hoá đơn được ghi trong file đính kèm :</p>

  <div>Xin chân thành cảm ơn !!</div>
  `;
  }

  if (dataSend.language === "en") {
    result = `
  <h3>Hello  ${dataSend.patientName}</h3>
  <p>You received this email because you booked an online medical appointment on the Booking Care website</p>
  <p>Information for scheduling medical examination :</p>
  <p>Prescription / invoice information is recorded in the attached file:</p>

  <div>Thank you very much!!</div>
  `;
  }
  return result;
};

module.exports = {
  sendSimpleEmail,
  sendRemedyEmail,
};

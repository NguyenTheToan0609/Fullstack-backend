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
    html: `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên trang web Booking Care</p>
    <p>Thông tin đặt lịch khám bệnh :</p>
    <div><b>Thời gian : ${dataSend.time}</b></div>
    <div><b>Bác Sĩ : ${dataSend.doctorName}</b></div>

  <p>Nếu các thông tin trên là đúng sự thật , vui lòng click vào đường link bên dưới 
  để xác nhận và hoàn tất thử tục đặt lịch khám bệnh.
  </p>
  <div>
    <a href = ${dataSend.redirectLink} target="_blank">Click here</a>
  </div>

  <div>Xin chân thành cảm ơn !!</div>
    `,
  });
};

module.exports = {
  sendSimpleEmail,
};

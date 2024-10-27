import doctorServices from "../services/doctorServices";
import {
  getAllTopDoctor,
  getAllDoctorsService,
  saveDetailDoctor,
} from "../services/doctorServices";

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await getAllTopDoctor(+limit);
    return res.status(200).json(response);
  } catch (error) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server ...",
    });
  }
};

let getAllDoctors = async (req, res) => {
  try {
    let doctors = await getAllDoctorsService();
    return res.status(200).json(doctors);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server ...",
    });
  }
};

let postInforDoctor = async (req, res) => {
  try {
    let response = await saveDetailDoctor(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server ...",
    });
  }
};

module.exports = {
  getTopDoctorHome,
  getAllDoctors,
  postInforDoctor,
};
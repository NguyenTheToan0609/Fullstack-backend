import doctorServices from "../services/doctorServices";
import {
  getAllTopDoctor,
  getAllDoctorsService,
  saveDetailDoctor,
  getDetailDoctorByIdService,
  bulkCreateScheduleService,
  getScheduleDateService,
  getDoctorExtraInforService,
  getProfileDoctorByIdService,
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

let getDetailDoctorById = async (req, res) => {
  try {
    let data = await getDetailDoctorByIdService(req.query.id);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server ...",
    });
  }
};

let bulkCreateSchedule = async (req, res) => {
  try {
    let data = await bulkCreateScheduleService(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server ...",
    });
  }
};

let getScheduleDate = async (req, res) => {
  try {
    let data = await getScheduleDateService(req.query.doctorId, req.query.date);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server ...",
    });
  }
};

let getDoctorExtraInfor = async (req, res) => {
  try {
    let data = await getDoctorExtraInforService(req.query.doctorId);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server ...",
    });
  }
};

let getProfileDoctorById = async (req, res) => {
  try {
    let data = await getProfileDoctorByIdService(req.query.doctorId);
    return res.status(200).json(data);
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
  getDetailDoctorById,
  bulkCreateSchedule,
  getScheduleDate,
  getDoctorExtraInfor,
  getProfileDoctorById,
};

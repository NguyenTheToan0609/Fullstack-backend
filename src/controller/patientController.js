import {
  postInforPatientService,
  postVerifyInforPatientService,
} from "../services/patientService";

let postInforPatient = async (req, res) => {
  try {
    let data = await postInforPatientService(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server ...",
    });
  }
};

let postVerifyInforPatient = async (req, res) => {
  try {
    let data = await postVerifyInforPatientService(req.body);
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
  postInforPatient,
  postVerifyInforPatient,
};

import {
  createClinicService,
  getAllClinicService,
  getDetailClinicByIdService,
} from "../services/clinicService";

let createClinic = async (req, res) => {
  try {
    let data = await createClinicService(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server ...",
    });
  }
};

let getAllClinic = async (req, res) => {
  try {
    let data = await getAllClinicService(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server ...",
    });
  }
};

let getDetailClinicById = async (req, res) => {
  try {
    let data = await getDetailClinicByIdService(req.query.id);
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
  createClinic,
  getAllClinic,
  getDetailClinicById,
};

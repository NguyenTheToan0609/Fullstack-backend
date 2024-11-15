import {
  createSpecialtyService,
  getAllSpecialtyService,
  getDetailSpecialtyByIdService,
} from "../services/specialtyService";

let createSpecialty = async (req, res) => {
  try {
    let data = await createSpecialtyService(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server ...",
    });
  }
};

let getAllSpecialty = async (req, res) => {
  try {
    let data = await getAllSpecialtyService();
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server ...",
    });
  }
};

let getDetailSpecialtyById = async (req, res) => {
  try {
    let data = await getDetailSpecialtyByIdService(
      req.query.id,
      req.query.location
    );
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
  createSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
};

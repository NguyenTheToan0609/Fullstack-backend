import doctorServices from "../services/doctorServices";
import { getAllTopDoctor } from "../services/doctorServices";

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

module.exports = {
  getTopDoctorHome,
};

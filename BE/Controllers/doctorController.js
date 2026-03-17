import { doctorService } from "../Services/doctorService.js";

const getDoctors = async (req, res) => {
  try {
    const doctors = await doctorService.getAllDoctors();
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDoctorDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await doctorService.getDoctorById(id);

    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const doctorController = { getDoctors, getDoctorDetail };

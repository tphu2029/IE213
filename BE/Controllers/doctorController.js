import { doctorService } from "../Services/doctorService.js";
import { userModel } from "../Models/userModel.js";
const getDoctors = async (req, res) => {
  try {
    const doctors = await doctorService.getAllDoctors();
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createDoctor = async (req, res) => {
  try {
    const doctor = await doctorService.createDoctor(req.body);
    res.status(201).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
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

export const doctorController = { getDoctors, getDoctorDetail, createDoctor };

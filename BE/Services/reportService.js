import { invoiceModel } from "../Models/invoiceModel.js";
import { appointmentModel } from "../Models/appointmentModel.js";
import { patientModel } from "../Models/patientModel.js";
import { doctorModel } from "../Models/doctorModel.js";

const getDashboardStats = async () => {
  try {
    const [
      totalRevenue,
      revenueByMonth,
      totalAppointments,
      appointmentsStatus,
      totalPatients,
      totalDoctors,
    ] = await Promise.all([
      invoiceModel.getTotalRevenue(),
      invoiceModel.getRevenueByMonth(),
      appointmentModel.countAppointments(),
      appointmentModel.getAppointmentsCountByStatus(),
      patientModel.countPatients(),
      doctorModel.countDoctors(),
    ]);

    const formattedRevenue = Array.from({ length: 12 }, (_, i) => {
      const monthData = revenueByMonth.find((item) => item._id === i + 1);
      return {
        month: i + 1,
        total: monthData ? monthData.total : 0,
      };
    });

    const appointmentsByStatusData = appointmentsStatus.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    return {
      status: "success",
      data: {
        overview: {
          totalRevenue,
          totalAppointments,
          totalPatients,
          totalDoctors,
        },
        revenueByMonth: formattedRevenue,
        appointmentsByStatus: appointmentsByStatusData,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const reportService = {
  getDashboardStats,
};

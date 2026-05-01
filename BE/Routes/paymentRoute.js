import express from "express";
import { invoiceModel } from "../Models/invoiceModel.js";
import { appointmentModel } from "../Models/appointmentModel.js";

const router = express.Router();

// WEBHOOK XỬ LÝ THANH TOÁN TỰ ĐỘNG TỪ SEPAY GỬI VỀ NGROK
router.post("/webhook-sepay", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(200).send("OK");

    console.log("Nội dung CK nhận được:", content);

    // Tìm mã MHXXXX trong nội dung
    const match = content.toUpperCase().match(/MH[A-Z0-9]+/);
    if (!match) return res.status(200).send("Nội dung không hợp lệ");

    const paymentCode = match[0];
    const invoice = await invoiceModel.getInvoiceByCode(paymentCode);

    if (invoice && invoice.status === "unpaid") {
      // 1. Đổi trạng thái Hóa đơn
      await invoiceModel.updateInvoice(invoice._id, { status: "paid" });
      // 2. Đổi trạng thái Lịch hẹn -> Confirmed
      await appointmentModel.updateAppointment(invoice.appointment_id, {
        status: "confirmed",
      });

      console.log(`✅ Đã xác nhận thanh toán tự động cho: ${paymentCode}`);
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Lỗi Webhook:", error);
    res.status(500).send("Internal Error");
  }
});

export const paymentRoute = router;

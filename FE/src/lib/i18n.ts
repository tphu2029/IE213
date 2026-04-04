import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  vi: {
    translation: {
      // --- ĐIỀU HƯỚNG (NAVBAR) ---
      nav_home: "Trang chủ",
      nav_about: "Giới thiệu",
      nav_services: "Dịch vụ",
      nav_doctors: "Đội ngũ bác sĩ",
      nav_lookup: "Tra cứu triệu chứng",
      nav_booking: "Đặt lịch hẹn",
      nav_invoice: "Hóa đơn",
      nav_profile: "Hồ sơ cá nhân",
      nav_dashboard: "Lịch hẹn của tôi",
      nav_contact: "Liên hệ ngay",
      logout: "Đăng xuất",
      login: "Đăng nhập",

      // --- TRANG CHỦ (HOME) ---
      hero_h1: "Chăm sóc sức khỏe xuất sắc",
      hero_p:
        "Cung cấp dịch vụ chăm sóc tận tâm, lấy bệnh nhân làm trung tâm với chuyên môn y tế tiên tiến bậc nhất. Chúng tôi luôn đồng hành cùng sức khỏe gia đình bạn.",
      btn_book: "Đặt lịch khám ngay",
      btn_emergency: "Cấp cứu: (555) 123-4567",
      stats_patients: "Bệnh nhân điều trị",
      stats_doctors: "Bác sĩ chuyên gia",
      stats_years: "Năm kinh nghiệm",
      stats_rate: "Tỷ lệ thành công",
      services_h2: "Dịch vụ của chúng tôi",
      services_p:
        "Hệ thống dịch vụ y tế toàn diện được vận hành bởi đội ngũ chuyên gia đầu ngành.",
      cta_h2: "Bạn cần hỗ trợ y tế?",
      cta_p:
        "Đội ngũ phản ứng nhanh của chúng tôi sẵn sàng 24/7 để cấp cứu và tư vấn sức khỏe từ xa.",
      read_more: "Xem chi tiết",

      // --- GIỚI THIỆU (ABOUT) ---
      about_hero_title: "Về Modern Hospital",
      about_hero_subtitle:
        "30 năm kinh nghiệm trong việc cung cấp dịch vụ chăm sóc sức khỏe tận tâm và đổi mới không ngừng.",
      about_mission_title: "Sứ mệnh của chúng tôi",
      about_mission_text:
        "Cung cấp các dịch vụ y tế nhân ái, chất lượng cao nhằm cải thiện sức khỏe và hạnh phúc cho cộng đồng.",
      about_vision_title: "Tầm nhìn của chúng tôi",
      about_vision_text:
        "Trở thành hệ thống y tế thông minh dẫn đầu khu vực, được công nhận về sự xuất sắc và lòng tin của bệnh nhân.",
      about_story_title: "Câu chuyện của chúng tôi",
      about_story_p1:
        "Thành lập từ năm 1996, chúng tôi bắt đầu từ khát vọng thay đổi cách tiếp cận y tế truyền thống. Trải qua nhiều thập kỷ, bệnh viện đã mở rộng quy mô và trở thành điểm tựa sức khỏe cho hàng triệu người dân.",
      about_values_title: "Giá trị cốt lõi",
      value_compassion: "Lòng nhân ái",
      value_excellence: "Sự xuất sắc",
      value_collaboration: "Sự hợp tác",
      value_innovation: "Sự đổi mới",
      about_journey_title: "Hành trình phát triển",

      // --- LIÊN HỆ (CONTACT)  ---
      contact_title: "Liên hệ với chúng tôi",
      contact_subtitle:
        "Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ mọi thắc mắc về sức khỏe của bạn 24/7.",
      contact_form_name: "HỌ VÀ TÊN",
      contact_form_msg: "NỘI DUNG TIN NHẮN",
      contact_send: "Gửi tin nhắn ngay",
      email: "ĐỊA CHỈ EMAIL",

      // --- ĐẶT LỊCH (BOOKING) ---
      book_title: "Đặt Lịch Hẹn Khám",
      select_dept: "CHỌN CHUYÊN KHOA",
      select_doc: "CHỌN BÁC SĨ",
      visit_reason: "LÝ DO KHÁM / TRIỆU CHỨNG",
      confirm_book: "Xác nhận đặt lịch",
      book_now: "Đăng ký ngay",
      support_info: "THÔNG TIN HỖ TRỢ",
      support_desc:
        "Vui lòng điền đầy đủ thông tin để bác sĩ có thể tư vấn chính xác nhất.",

      // --- LỊCH HẸN (DASHBOARD) ---
      dash_title: "Lịch hẹn của tôi",
      dash_subtitle: "Quản lý các lượt khám bệnh và lịch hẹn sắp tới.",
      dash_register_now: "Đăng ký khám ngay",
      dash_empty: "Bạn chưa có lịch hẹn nào.",
      dash_start_now: "Bắt đầu đặt lịch ngay",
      apt_doctor: "Bác sĩ phụ trách",

      // --- HỒ SƠ & Y TẾ (PROFILE) ---
      profile_health_section: "Hồ sơ sức khỏe",
      profile_role_patient: "BỆNH NHÂN",
      label_fullname: "HỌ VÀ TÊN",
      label_phone: "SỐ ĐIỆN THOẠI",
      label_gender: "GIỚI TÍNH",
      label_dob: "NGÀY SINH",
      label_address: "ĐỊA CHỈ THƯỜNG TRÚ",
      label_blood_group: "NHÓM MÁU",
      label_height: "CHIỀU CAO (CM)",
      label_weight: "CÂN NẶNG (KG)",
      label_allergies: "DỊ ỨNG THUỐC/THỨC ĂN",
      label_chronic: "BỆNH LÝ MÃN TÍNH",
      bmi_title: "CHỈ SỐ CƠ THỂ (BMI)",
      bmi_low: "Cân nặng thấp (Gầy)",
      bmi_normal: "Bình thường",
      bmi_over: "Thừa cân",
      bmi_obese: "Béo phì",
      bmi_no_data: "N/A",

      // --- TRA CỨU (LOOKUP) ---
      lookup_q: "Bạn đang cảm thấy thế nào?",
      manual_search: "Tra cứu thủ công",
      ai_assistant: "Trợ lý AI",
      search_placeholder: "Tìm chuyên khoa, triệu chứng...",
      ai_desc:
        "Mô tả tình trạng sức khỏe, AI của chúng tôi sẽ gợi ý chuyên khoa phù hợp ngay lập tức.",
      quick_tips: "MẸO CHỌN KHOA",
      tip_unknown: "Không rõ triệu chứng",
      tip_kids: "Dành cho trẻ em",
      tip_accident: "Tai nạn/Chấn thương",

      // --- HÓA ĐƠN ---
      invoice_header: "Hóa đơn y tế",
      invoice_desc: "Theo dõi lịch sử giao dịch và chi phí điều trị.",
      invoice_date: "Ngày tạo hóa đơn",
      pay_now: "Thanh toán ngay",

      // --- ĐỘI NGŨ BÁC SĨ ---
      filter_dept: "LỌC THEO KHOA:",
      all_doctors: "Tất cả bác sĩ",
      why_h2: "Tại sao chọn chúng tôi?",
      elite_team: "Đội ngũ tinh hoa",
      elite_desc:
        "100% bác sĩ có trình độ sau đại học và tu nghiệp tại các bệnh viện lớn trên thế giới.",
      int_standard: "Tiêu chuẩn quốc tế",
      int_desc:
        "Quy trình khám chữa bệnh hiện đại đạt chứng nhận chất lượng JCI.",
      dedicated_care: "Tận tâm phục vụ",
      dedicated_desc:
        "Sức khỏe của bệnh nhân là ưu tiên hàng đầu trong mọi hoạt động của chúng tôi.",

      // --- CHUYÊN KHOA ---
      dept_general: "Nội tổng quát",
      dept_cardiology: "Tim mạch",
      dept_pedia: "Nhi khoa",
      dept_surgery: "Ngoại khoa",

      // --- CHUNG ---
      loading: "Đang xử lý...",
      save: "Lưu thông tin",
      update_success: "Cập nhật thành công!",
      no_data: "Không có dữ liệu",
      male: "Nam",
      female: "Nữ",
      other: "Khác",
      pending: "Chờ xác nhận",
      confirmed: "Đã xác nhận",
      completed: "Hoàn thành",
      paid: "Đã thanh toán",
      unpaid: "Chưa thanh toán",

      // --- FOOTER ---
      footer_desc:
        "Bệnh viện đa khoa quốc tế Modern Hospital cung cấp các giải pháp y tế toàn diện với trang thiết bị tối tân.",
      footer_links: "Liên kết nhanh",
      footer_contact: "Thông tin liên hệ",
      copyright: "© 2026 Modern Hospital. Bảo lưu mọi quyền.",
    },
  },
  en: {
    translation: {
      nav_home: "Home",
      nav_about: "About",
      nav_services: "Services",
      nav_doctors: "Medical Team",
      nav_lookup: "Symptom Lookup",
      nav_booking: "Booking",
      nav_invoice: "Invoices",
      nav_profile: "Medical Profile",
      nav_dashboard: "Dashboard",
      nav_contact: "Contact Now",
      logout: "Logout",
      login: "Login",

      hero_h1: "Excellence in Healthcare",
      hero_p:
        "Providing compassionate, patient-centered care with top-tier medical expertise. We are always here for your family.",
      btn_book: "Book Appointment",
      btn_emergency: "Emergency: (555) 123-4567",
      stats_patients: "Patients Treated",
      stats_doctors: "Expert Doctors",
      stats_years: "Years Experience",
      stats_rate: "Success Rate",
      services_h2: "Our Services",
      services_p:
        "Comprehensive medical solutions delivered by our leader medical team.",
      cta_h2: "Need Help?",
      cta_p:
        "Our rapid response team is available 24/7 for emergency and remote consultations.",
      read_more: "Read More",

      about_hero_title: "About Modern Hospital",
      about_hero_subtitle:
        "30 years of excellence in providing compassionate healthcare and innovation.",
      about_mission_title: "Our Mission",
      about_mission_text:
        "To provide exceptional, compassionate healthcare services that improve community well-being.",
      about_vision_title: "Our Vision",
      about_vision_text:
        "To be the leading smart healthcare provider in the region, recognized for excellence.",
      about_story_title: "Our Story",
      about_story_p1:
        "Founded in 1996, we started with a vision to change traditional medical approaches. Today, we stand as a leader in international healthcare.",
      about_values_title: "Core Values",
      value_compassion: "Compassion",
      value_excellence: "Excellence",
      value_collaboration: "Collaboration",
      value_innovation: "Innovation",
      about_journey_title: "Our Journey",

      contact_title: "Contact Us",
      contact_subtitle:
        "We are available 24/7 to listen and support all your healthcare needs.",
      contact_form_name: "FULL NAME",
      contact_form_msg: "MESSAGE CONTENT",
      contact_send: "Send Message Now",
      email: "EMAIL ADDRESS",

      book_title: "Book an Appointment",
      select_dept: "SELECT DEPARTMENT",
      select_doc: "SELECT DOCTOR",
      visit_reason: "SYMPTOMS / REASON",
      confirm_book: "Confirm Booking",
      book_now: "Book Now",
      support_info: "SUPPORT INFO",
      support_desc:
        "Please provide complete information for the most accurate consultation.",

      dash_title: "My Dashboard",
      dash_subtitle: "Manage your medical appointments and schedules.",
      dash_register_now: "Register Now",
      dash_empty: "You have no appointments yet.",
      dash_start_now: "Start booking now",
      apt_doctor: "Attending Doctor",

      profile_health_section: "Medical Profile",
      profile_role_patient: "PATIENT",
      label_fullname: "FULL NAME",
      label_phone: "PHONE NUMBER",
      label_gender: "GENDER",
      label_dob: "DATE OF BIRTH",
      label_address: "ADDRESS",
      label_blood_group: "BLOOD GROUP",
      label_height: "HEIGHT (CM)",
      label_weight: "WEIGHT (KG)",
      label_allergies: "ALLERGIES",
      label_chronic: "CHRONIC DISEASES",
      bmi_title: "BODY MASS INDEX (BMI)",
      bmi_low: "Underweight",
      bmi_normal: "Normal",
      bmi_over: "Overweight",
      bmi_obese: "Obese",
      bmi_no_data: "N/A",

      lookup_q: "How are you feeling?",
      manual_search: "Manual Search",
      ai_assistant: "AI Assistant",
      search_placeholder: "Search clinics, symptoms...",
      ai_desc:
        "Describe your symptoms, our AI will suggest the right specialist immediately.",
      quick_tips: "QUICK TIPS",
      tip_unknown: "Unknown symptoms",
      tip_kids: "For children",
      tip_accident: "Accident / Injury",

      invoice_header: "Medical Invoices",
      invoice_desc: "Track your transaction history and treatment costs.",
      invoice_date: "Created Date",
      pay_now: "Pay Now",

      filter_dept: "FILTER BY CLINIC:",
      all_doctors: "All Doctors",
      why_h2: "Why Choose Us?",
      elite_team: "Elite Team",
      elite_desc:
        "100% of doctors have postgraduate degrees and international training.",
      int_standard: "International Standard",
      int_desc: "Modern medical processes JCI quality certification.",
      dedicated_care: "Dedicated Care",
      dedicated_desc:
        "Patient health is our top priority in every clinical decision.",

      dept_general: "General Internal",
      dept_cardiology: "Cardiology",
      dept_pedia: "Pediatrics",
      dept_surgery: "Surgery",

      loading: "Processing...",
      save: "Save Info",
      update_success: "Update Successful!",
      no_data: "No data found",
      male: "Male",
      female: "Female",
      other: "Other",
      pending: "Pending",
      confirmed: "Confirmed",
      completed: "Completed",
      paid: "Paid",
      unpaid: "Unpaid",

      footer_desc:
        "Modern Hospital International General Hospital provides comprehensive medical solutions with state-of-the-art equipment.",
      footer_links: "Quick Links",
      footer_contact: "Contact Info",
      copyright: "© 2026 Modern Hospital. All rights reserved.",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("lng") || "vi",
    fallbackLng: "vi",
    interpolation: { escapeValue: false },
  });

export default i18n;

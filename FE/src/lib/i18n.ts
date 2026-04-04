import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  vi: {
    translation: {
      // Điều hướng & Chung
      nav_home: "Trang chủ",
      nav_about: "Giới thiệu",
      nav_services: "Dịch vụ",
      nav_doctors: "Đội ngũ bác sĩ",
      nav_lookup: "Tra cứu triệu chứng",
      nav_booking: "Đặt lịch hẹn",
      nav_invoice: "Hóa đơn y tế",
      nav_contact: "Liên hệ ngay",
      login: "Đăng nhập",
      register: "Đăng ký",
      logout: "Đăng xuất",
      loading: "Đang tải dữ liệu...",
      save: "Lưu thông tin",
      update_success: "Cập nhật thành công!",
      no_data: "Không có dữ liệu hiển thị",
      read_more: "Xem chi tiết",

      // Trang Chủ (Home)
      hero_h1: "Chăm sóc sức khỏe xuất sắc",
      hero_p:
        "Cung cấp dịch vụ chăm sóc tận tâm, lấy bệnh nhân làm trung tâm với chuyên môn y tế tiên tiến bậc nhất.",
      btn_book: "Đặt lịch khám",
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

      // Trang Giới Thiệu (About)
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
        "Thành lập từ năm 1996, chúng tôi bắt đầu từ khát vọng thay đổi cách tiếp cận y tế truyền thống.",
      about_values_title: "Giá trị cốt lõi",
      value_compassion: "Lòng nhân ái",
      value_excellence: "Sự xuất sắc",
      value_collaboration: "Sự hợp tác",
      value_innovation: "Sự đổi mới",
      about_journey_title: "Hành trình phát triển",

      // Trang Liên Hệ (Contact)
      contact_title: "Liên hệ với chúng tôi",
      contact_subtitle:
        "Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ mọi thắc mắc của bạn.",
      contact_form_name: "Họ và tên",
      contact_form_email: "Địa chỉ Email",
      contact_form_subject: "Chủ đề cần tư vấn",
      contact_form_msg: "Nội dung tin nhắn",
      contact_send: "Gửi tin nhắn ngay",
      contact_emergency_h2: "Tình huống khẩn cấp?",
      contact_emergency_p:
        "Vui lòng gọi đường dây nóng cấp cứu hoặc đến cơ sở gần nhất của chúng tôi.",

      // Trang Đặt Lịch & Bác Sĩ
      book_title: "Đặt Lịch Hẹn Khám",
      book_now: "Đăng ký khám ngay",
      select_dept: "Chọn chuyên khoa",
      select_doc: "Chọn bác sĩ tư vấn",
      visit_reason: "Mô tả triệu chứng/Lý do khám",
      confirm_book: "Xác nhận đặt lịch",
      symptoms: "Triệu chứng",
      why_h2: "Tại sao chọn chúng tôi",

      // Hồ sơ & Y tế
      profile_title: "Hồ sơ sức khỏe cá nhân",
      profile_health: "Thông tin y tế",
      profile_dashboard: "Lịch hẹn của tôi",
      medical_records: "Bệnh án của tôi",
      medical_history: "Tiền sử bệnh lý",
      medicine_list: "Danh mục thuốc",
      blood_group: "Nhóm máu",
      height: "Chiều cao (cm)",
      weight: "Cân nặng (kg)",
      allergies: "Dị ứng",

      // Trạng thái (Statuses)
      pending: "Chờ xác nhận",
      confirmed: "Đã xác nhận",
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
      paid: "Đã thanh toán",
      unpaid: "Chưa thanh toán",
      //footer
      footer_desc:
        "Hệ thống bệnh viện đạt chuẩn quốc tế, cung cấp dịch vụ y tế chất lượng cao và tận tâm cho mọi gia đình.",
      footer_links: "Liên kết nhanh",
      footer_contact: "Thông tin liên hệ",
      copyright: "© 2026 Modern Hospital. Bảo lưu mọi quyền.",

      dept_general: "Nội tổng quát",
      dept_cardiology: "Tim mạch",
      dept_pedia: "Nhi khoa",
      dept_surgery: "Ngoại khoa",
      dept_pulmonology: "Hô hấp",
      dept_gastro: "Tiêu hóa",
      dept_neurology: "Thần kinh",
      dept_ortho: "Cơ xương khớp",
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
      nav_contact: "Contact Now",
      login: "Login",
      register: "Register",
      logout: "Logout",
      loading: "Loading...",
      save: "Save Info",
      update_success: "Update Success!",
      no_data: "No data available",
      read_more: "Read More",

      hero_h1: "Excellence in Healthcare",
      hero_p:
        "Providing compassionate, patient-centered care with advanced medical expertise.",
      btn_book: "Book Appointment",
      btn_emergency: "Emergency: (555) 123-4567",
      stats_patients: "Patients Treated",
      stats_doctors: "Expert Doctors",
      stats_years: "Years Experience",
      stats_rate: "Success Rate",
      services_h2: "Our Services",
      services_p:
        "Comprehensive medical solutions delivered by our top medical team.",
      cta_h2: "Need Medical Help?",
      cta_p:
        "Our team is available 24/7 for emergency and remote health consultations.",

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
        "Founded in 1996, we started with a vision to change the traditional medical approach.",
      about_values_title: "Core Values",
      value_compassion: "Compassion",
      value_excellence: "Excellence",
      value_collaboration: "Collaboration",
      value_innovation: "Innovation",
      about_journey_title: "Our Journey",

      contact_title: "Contact Us",
      contact_subtitle:
        "We are here to help and listen to your concerns anytime.",
      contact_form_name: "Full Name",
      contact_form_email: "Email Address",
      contact_form_subject: "Subject",
      contact_form_msg: "Message",
      contact_send: "Send Message",
      contact_emergency_h2: "Medical Emergency?",
      contact_emergency_p:
        "Call our emergency hotline or visit our 24/7 emergency department.",

      book_title: "Book an Appointment",
      book_now: "Book Now",
      select_dept: "Select Department",
      select_doc: "Select Doctor",
      visit_reason: "Symptoms / Reason for visit",
      confirm_book: "Confirm Booking",
      symptoms: "Symptoms",
      why_h2: "Why Choose Us",

      profile_title: "Personal Health Profile",
      profile_health: "Medical Info",
      profile_dashboard: "My Appointments",
      medical_records: "My Records",
      medical_history: "Medical History",
      medicine_list: "Medicine Catalog",
      blood_group: "Blood Group",
      height: "Height (cm)",
      weight: "Weight (kg)",
      allergies: "Allergies",

      pending: "Pending",
      confirmed: "Confirmed",
      completed: "Completed",
      cancelled: "Cancelled",
      paid: "Paid",
      unpaid: "Unpaid",

      footer_desc:
        "International standard hospital system, providing high-quality and dedicated medical services for every family.",
      footer_links: "Quick Links",
      footer_contact: "Contact Information",
      copyright: "© 2026 Modern Hospital. All rights reserved.",

      dept_general: "General Internal",
      dept_cardiology: "Cardiology",
      dept_pedia: "Pediatrics",
      dept_surgery: "Surgery",
      dept_pulmonology: "Pulmonology",
      dept_gastro: "Gastroenterology",
      dept_neurology: "Neurology",
      dept_ortho: "Orthopedics",
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

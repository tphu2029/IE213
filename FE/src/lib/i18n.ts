import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      vi: {
        translation: {
          // --- Điều hướng & Tài khoản ---
          nav_home: "Trang chủ",
          nav_services: "Dịch vụ",
          nav_doctors: "Bác sĩ",
          nav_lookup: "Tra cứu",
          nav_booking: "Đặt lịch",
          nav_about: "Giới thiệu",
          nav_contact: "Liên hệ",
          login: "Đăng nhập",
          register: "Đăng ký",
          logout: "Đăng xuất",

          // --- Trang chủ (Home) ---
          hero_h1: "Chăm sóc sức khỏe xuất sắc",
          hero_p:
            "Cung cấp dịch vụ chăm sóc tận tâm, lấy bệnh nhân làm trung tâm với chuyên môn y tế tiên tiến.",
          btn_book: "Đặt lịch khám",
          btn_emergency: "Cấp cứu: (555) 123-4567",
          stats_patients: "Bệnh nhân điều trị",
          stats_doctors: "Bác sĩ chuyên gia",
          stats_years: "Năm kinh nghiệm",
          stats_rate: "Tỷ lệ thành công",
          services_h2: "Dịch vụ của chúng tôi",
          services_p:
            "Dịch vụ y tế toàn diện được thực hiện bởi đội ngũ chuyên gia hàng đầu.",
          view_all: "Xem tất cả dịch vụ",
          why_h2: "Tại sao chọn Modern Hospital",
          cta_h2: "Bạn cần hỗ trợ y tế?",
          cta_p:
            "Đội ngũ của chúng tôi sẵn sàng 24/7 để cấp cứu và tư vấn sức khỏe.",

          // --- Trang Giới thiệu (About) ---
          about_hero_title: "Về Modern Hospital",
          about_hero_subtitle:
            "30 năm kinh nghiệm trong việc cung cấp dịch vụ chăm sóc sức khỏe tận tâm, lấy bệnh nhân làm trung tâm.",
          about_mission_title: "Sứ mệnh của chúng tôi",
          about_mission_text:
            "Cung cấp các dịch vụ chăm sóc sức khỏe đặc biệt, nhân ái nhằm cải thiện sức khỏe và hạnh phúc của cộng đồng. Chúng tôi cam kết mang lại dịch vụ y tế chất lượng cao nhất với sự tôn trọng, nhân phẩm và lòng nhân ái.",
          about_vision_title: "Tầm nhìn của chúng tôi",
          about_vision_text:
            "Trở thành nhà cung cấp dịch vụ y tế hàng đầu trong khu vực, được công nhận về sự xuất sắc trong y khoa, đổi mới và sự hài lòng của bệnh nhân. Chúng tôi hình dung về một cộng đồng khỏe mạnh hơn, nơi mọi người đều có quyền tiếp cận với dịch vụ chăm sóc sức khỏe đẳng cấp thế giới.",
          about_story_title: "Câu chuyện của chúng tôi",
          about_story_p1:
            "Modern Hospital được thành lập vào năm 1996 với tầm nhìn cung cấp dịch vụ chăm sóc sức khỏe chất lượng cao, dễ tiếp cận cho cộng đồng. Từ một cơ sở nhỏ với 100 giường bệnh ban đầu đã phát triển thành một trung tâm y tế toàn diện phục vụ hơn 50.000 bệnh nhân hàng năm.",
          about_story_p2:
            "Trong ba thập kỷ qua, chúng tôi đã liên tục đầu tư vào công nghệ y tế tiên tiến, chiêu mộ những tài năng y tế hàng đầu và mở rộng cơ sở vật chất để đáp ứng nhu cầu chăm sóc sức khỏe ngày càng tăng của khu vực.",
          about_story_p3:
            "Ngày nay, chúng tôi tự hào cung cấp đầy đủ các dịch vụ y tế, từ chăm sóc khẩn cấp đến các phương pháp điều trị chuyên sâu, tất cả đều được thực hiện với cùng một cam kết về sự xuất sắc và lòng nhân ái đã định hình chúng tôi ngay từ khi bắt đầu.",
          about_values_title: "Giá trị cốt lõi",
          about_values_subtitle:
            "Những nguyên tắc dẫn dắt mọi hoạt động của chúng tôi",
          value_compassion_title: "Lòng nhân ái",
          value_compassion_desc:
            "Chúng tôi đối xử với mọi bệnh nhân bằng sự đồng cảm, tôn trọng và phẩm giá.",
          value_excellence_title: "Sự xuất sắc",
          value_excellence_desc:
            "Chúng tôi phấn đấu đạt được các tiêu chuẩn cao nhất trong chăm sóc y tế.",
          value_collaboration_title: "Sự hợp tác",
          value_collaboration_desc:
            "Chúng tôi làm việc cùng nhau như một đội ngũ để có kết quả điều trị tốt hơn.",
          value_innovation_title: "Sự đổi mới",
          value_innovation_desc:
            "Chúng tôi đón nhận các công nghệ mới và những tiến bộ y học.",
          about_journey_title: "Hành trình của chúng tôi",
          about_journey_subtitle:
            "Các cột mốc quan trọng trong lịch sử 30 năm của chúng tôi",
          about_accreditation_title: "Chứng nhận & Công nhận",
          about_accreditation_desc:
            "Modern Hospital được công nhận bởi Ủy ban hỗn hợp (Joint Commission) và được chứng nhận bởi Hiệp hội phẫu thuật Hoa Kỳ. Chúng tôi đã nhận được nhiều giải thưởng về an toàn bệnh nhân, chất lượng chăm sóc và sự xuất sắc trong y khoa.",
          label_joint_commission: "Chứng nhận Joint Commission",
          label_top_hospital: "Bệnh viện hàng đầu",
          label_patient_safety: "An toàn bệnh nhân",

          // --- Trang Dịch vụ & Đặt lịch ---
          book_title: "Đặt Lịch Khám",
          book_now: "Đặt lịch ngay",
          select_dept: "Chọn chuyên khoa",
          select_doc: "Chọn bác sĩ",
          visit_reason: "Lý do khám...",
          confirm_book: "Xác nhận đặt lịch",
          symptoms: "Triệu chứng",
          diagnosis: "Chẩn đoán",

          // --- Danh sách 14 Khoa ---
          dept_general: "Nội tổng quát",
          dept_cardiology: "Tim mạch",
          dept_pulmonology: "Hô hấp",
          dept_gastro: "Tiêu hóa",
          dept_neurology: "Thần kinh",
          dept_ortho: "Cơ xương khớp",
          dept_eye: "Mắt",
          dept_ent: "Tai Mũi Họng",
          dept_derm: "Da liễu",
          dept_endo: "Nội tiết",
          dept_pedia: "Nhi khoa",
          dept_obgyn: "Sản phụ khoa",
          dept_surgery: "Ngoại khoa",
          dept_diag: "Xét nghiệm & CĐHA",

          // --- Tra cứu (Lookup) ---
          manual_search: "Tra cứu thủ công",
          ai_assistant: "Trợ lý AI (Beta)",
          search_placeholder: "Nhập triệu chứng (vd: đau đầu, ho...)",

          // --- Hồ sơ & Dashboard ---
          profile_title: "Hồ sơ sức khỏe",
          profile_health: "Hồ sơ sức khỏe",
          profile_dashboard: "Lịch hẹn của tôi",
          profile_logout: "Đăng xuất",
          blood_group: "Nhóm máu",
          height: "Chiều cao (cm)",
          weight: "Cân nặng (kg)",
          allergies: "Dị ứng",
          medical_history: "Tiền sử bệnh lý",
          save: "Lưu hồ sơ",
          update_success: "Cập nhật thành công!",
          nav_invoice: "Hóa đơn",

          // --- Trạng thái ---
          pending: "Chờ xác nhận",
          confirmed: "Đã xác nhận",
          in_progress: "Đang khám",
          completed: "Hoàn thành",
          cancelled: "Đã hủy",
          paid: "Đã thanh toán",
          unpaid: "Chưa thanh toán",
          loading: "Đang tải...",

          // --- Footer ---
          footer_desc:
            "Modern Hospital cung cấp dịch vụ y tế tiêu chuẩn quốc tế, lấy sự an toàn và sức khỏe của bệnh nhân làm ưu tiên hàng đầu.",
          footer_links: "Liên kết nhanh",
          footer_contact: "Thông tin liên hệ",
          copyright: "© 2026 Modern Hospital. Bảo lưu mọi quyền.",
        },
      },
      en: {
        translation: {
          nav_home: "Home",
          nav_services: "Services",
          nav_doctors: "Doctors",
          nav_lookup: "Lookup",
          nav_booking: "Booking",
          nav_about: "About",
          nav_contact: "Contact",
          login: "Login",
          register: "Register",
          logout: "Logout",

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
            "Comprehensive healthcare services delivered by our expert medical team.",
          view_all: "View All Services",
          why_h2: "Why Choose Modern Hospital",
          cta_h2: "Need Medical Attention?",
          cta_p:
            "Our team is available 24/7 for emergency care and consultations.",

          about_hero_title: "About Modern Hospital",
          about_hero_subtitle:
            "30 years of excellence in providing healthcare.",
          about_mission_title: "Our Mission",
          about_mission_text:
            "To provide exceptional healthcare services that improve the well-being of our community.",
          about_vision_title: "Our Vision",
          about_vision_text:
            "To be the leading healthcare provider in the region.",
          about_story_title: "Our Story",
          about_story_p1:
            "Modern Hospital was founded in 1996 with a vision to provide quality healthcare.",
          about_story_p2:
            "Over three decades, we have continuously invested in technology.",
          about_story_p3:
            "Today, we offer a full spectrum of medical services.",
          about_values_title: "Core Values",
          about_values_subtitle: "The principles that guide everything we do",
          value_compassion_title: "Compassion",
          value_compassion_desc:
            "We treat every patient with empathy, respect, and dignity.",
          value_excellence_title: "Excellence",
          value_excellence_desc:
            "We strive for the highest standards in medical care.",
          value_collaboration_title: "Collaboration",
          value_collaboration_desc:
            "We work together as a team for better patient outcomes.",
          value_innovation_title: "Innovation",
          value_innovation_desc:
            "We embrace new technologies and medical advances.",
          about_journey_title: "Our Journey",
          about_journey_subtitle: "Key milestones in our 30-year history",
          about_accreditation_title: "Accreditation & Recognition",
          about_accreditation_desc:
            "Modern Hospital is accredited by the Joint Commission.",
          label_joint_commission: "Joint Commission Accredited",
          label_top_hospital: "Top Hospital Award",
          label_patient_safety: "Patient Safety Excellence",

          book_title: "Book Appointment",
          book_now: "Book Now",
          select_dept: "Select Department",
          select_doc: "Select Doctor",
          visit_reason: "Reason for visit...",
          confirm_book: "Confirm Booking",
          symptoms: "Symptoms",
          diagnosis: "Diagnosis",

          dept_general: "General Medicine",
          dept_cardiology: "Cardiology",
          dept_pulmonology: "Pulmonology",
          dept_gastro: "Gastroenterology",
          dept_neurology: "Neurology",
          dept_ortho: "Orthopedics",
          dept_eye: "Ophthalmology",
          dept_ent: "ENT",
          dept_derm: "Dermatology",
          dept_endo: "Endocrinology",
          dept_pedia: "Pediatrics",
          dept_obgyn: "OB/GYN",
          dept_surgery: "Surgery",
          dept_diag: "Diagnostic",

          manual_search: "Manual Search",
          ai_assistant: "AI Assistant (Beta)",
          search_placeholder: "Enter symptoms...",

          profile_title: "Health Profile",
          profile_health: "Health Profile",
          profile_dashboard: "My Appointments",
          profile_logout: "Logout",
          blood_group: "Blood Group",
          height: "Height (cm)",
          weight: "Weight (kg)",
          allergies: "Allergies",
          medical_history: "Medical History",
          save: "Save Profile",
          update_success: "Update success!",
          nav_invoice: "Invoices",

          pending: "Pending",
          confirmed: "Confirmed",
          in_progress: "In Progress",
          completed: "Completed",
          cancelled: "Cancelled",
          paid: "Paid",
          unpaid: "Unpaid",
          loading: "Loading...",

          footer_desc:
            "Modern Hospital provides international standard medical services.",
          footer_links: "Quick Links",
          footer_contact: "Contact Information",
          copyright: "© 2026 Modern Hospital. All rights reserved.",
        },
      },
    },
    lng: localStorage.getItem("lng") || "vi",
    fallbackLng: "vi",
    interpolation: { escapeValue: false },
  });

export default i18n;

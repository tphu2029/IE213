// seed_doctor_avatars_pro.js
// Cập nhật avatar bác sĩ chuyên nghiệp (áo blouse, uy tín) từ Unsplash
import { connectDB } from "./Configs/mongodb.js";
import mongoose from "mongoose";
import { userModel } from "./Models/userModel.js";
import { doctorModel } from "./Models/doctorModel.js";
import { departmentModel } from "./Models/departmentModel.js";

// Ảnh bác sĩ nam chuyên nghiệp từ Unsplash (ưu tiên người châu Á + áo trắng)
const MALE_DOCTOR_PHOTOS = [
  "photo-1612349317150-e413f6a5b16d", // male asian doctor stethoscope
  "photo-1622253692010-333f2da6031d", // male doctor coat
  "photo-1651008376811-b90baee60c1f", // confident male doctor
  "photo-1607990283143-e81e7a2c9349", // asian male doctor white coat
  "photo-1559757175-0eb30cd8c063",     // smiling doctor
  "photo-1516841273335-e39b37888115",  // doctor with stethoscope
  "photo-1631815588090-d4bfec5b1ccb",  // male doctor portrait
  "photo-1576091160550-2173dba999ef",  // doctor close up
  "photo-1585842378054-ee2e52f94ba2",  // doctor professional
  "photo-1584467735867-4297ae2ebcee",  // doctor in clinic
  "photo-1504439468489-c8920d796a29",  // doctor at desk
  "photo-1609188076864-c35269136b0b",  // male doctor
  "photo-1530026186672-2cd00ffc50fe",  // doctor consulting
  "photo-1638202993928-7267aad84c31",  // male doctor modern
  "photo-1537368910025-700350fe46c7",  // serious doctor
  "photo-1613918431703-aa50889e3be8",  // doctor stethoscope neck
  "photo-1572435555646-7ad9a149ad91",  // male physician
  "photo-1666214280557-f1b5022eb634",  // professional doctor
  "photo-1559839734-2b71ea197ec2",     // doctor checking notes
  "photo-1629909613654-28e377c37b09",  // doctor lab coat
];

// Ảnh bác sĩ nữ chuyên nghiệp từ Unsplash
const FEMALE_DOCTOR_PHOTOS = [
  "photo-1594824476967-48c8b964273f",  // asian female doctor
  "photo-1582750433449-648ed127bb54",  // female doctor smiling
  "photo-1628348068343-c6a848d2b6dd",  // female doctor confident
  "photo-1651008376811-b90baee60c1f",  // woman doctor portrait
  "photo-1559839734-2b71ea197ec2",     // female doctor
  "photo-1582750433449-648ed127bb54",  // female medical staff
  "photo-1573496359142-b8d87734a5a2",  // female doctor white coat
  "photo-1551601651-2a8555f1a136",     // female physician
  "photo-1614608682850-e0d6ed316d47",  // female doctor portrait
  "photo-1580281658626-ee379f3cce93",  // woman in medical coat
  "photo-1561155707-5d95d96ede19",     // female doctor blue background
  "photo-1590103514924-0af2e7b2c0d2",  // confident female doctor
  "photo-1576765608535-5f04d1e3f289",  // asian female medical professional
  "photo-1518611507436-f9221403cca2",  // female doctor arms crossed
  "photo-1527613426441-4da17471b66d",  // female physician portrait
  "photo-1612277795421-9bc7706a4a34",  // female doctor with clipboard
  "photo-1609188075458-73b25dd5b2de",  // friendly female doctor
  "photo-1623854767648-e7bb8009f0db",  // female doctor confident
  "photo-1643297618946-c21d87d8f7a3",  // woman medical professional
  "photo-1691143670299-c519780f1a1b",  // modern female doctor
];

const FEMALE_KEYWORDS = ["Thị", "Thu", "Hương", "Nga", "Linh", "Trang", "Phương", "Huyền", "Thanh", "Kim", "Hồng", "Xuân", "Ngọc", "Yến", "Uyên", "Chi", "Thư", "Hà", "Mai", "Lan"];

function isFemale(name) {
  return FEMALE_KEYWORDS.some(kw => name.includes(kw));
}

function getProDoctorPhoto(name, index) {
  const female = isFemale(name);
  const pool = female ? FEMALE_DOCTOR_PHOTOS : MALE_DOCTOR_PHOTOS;
  const photoId = pool[index % pool.length];
  return `https://images.unsplash.com/${photoId}?w=400&h=400&fit=crop&crop=face&q=85`;
}

const run = async () => {
    await connectDB();
    console.log("=== Cập nhật Avatar bác sĩ chuyên nghiệp ===\n");

    const allDoctors = await mongoose.model("doctors").find().populate("user_id");
    
    let maleIdx = 0, femaleIdx = 0;
    let updated = 0;

    for (let i = 0; i < allDoctors.length; i++) {
        const doc = allDoctors[i];
        if (!doc.user_id) continue;

        const name = doc.user_id.username || "";
        const female = isFemale(name);
        const idx = female ? femaleIdx++ : maleIdx++;
        const avatarUrl = getProDoctorPhoto(name, idx);

        await mongoose.model("users").findByIdAndUpdate(doc.user_id._id, { avatar: avatarUrl });
        updated++;
        console.log(`  ✓ [${female ? "Nữ" : "Nam"}] ${name} -> ${avatarUrl.substring(0,60)}...`);
    }

    console.log(`\n✅ Hoàn tất! Đã cập nhật ${updated} bác sĩ.`);
    process.exit(0);
};

run().catch(err => { console.error("Lỗi:", err); process.exit(1); });

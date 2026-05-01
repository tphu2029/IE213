import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const testUpload = async () => {
    try {
        // 1. Create a dummy image file
        fs.writeFileSync("dummy.png", "fake image content");

        // 2. Prepare form data
        const form = new FormData();
        form.append("avatar", fs.createReadStream("dummy.png"));

        const { generateAccessToken } = await import("./utils/jwt.js");
        const token = generateAccessToken({ _id: "69d461c69e432d44f6d18e8c", role: "patient" });

        // 3. Upload over API
        const uploadRes = await axios.patch("http://localhost:3000/api/v1/users/", form, {
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${token}`
            }
        });

        console.log("UPLOAD SUCCESS:", uploadRes.data);
    } catch (error) {
        console.error("UPLOAD ERROR:", error.response?.data || error.message);
    }
    process.exit(0);
};

testUpload();

import { userModel } from "../Models/userModel.js";

const register = async (body) => {
  const { username, email, phone, password, role } = body;
  if (await userModel.findUserByEmail(email)) {
    throw new Error("Email already exists");
  } else {
    console.log("Registering user:", {
      username,
      email,
      phone,
      password,
      role,
    });
    const userCreated = await userModel.createUser({
      username,
      email,
      phone,
      password,
      role,
    });
    console.log("User created:", userCreated);
    return userCreated;
  }
};

const login = async (body) => {
  const { username, password } = body;
  console.log("Logging in user:", { username, password });
  return { username, password };
};

export const authService = {
  register,
  login,
};

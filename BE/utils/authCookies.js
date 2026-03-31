
export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
};

export const setAuthCookies = (res, { accessToken, refreshToken }) => {
  res.cookie("refreshToken", refreshToken, AUTH_COOKIE_OPTIONS);
  res.cookie("accessToken", accessToken, AUTH_COOKIE_OPTIONS);
};

export const clearAuthCookies = (res) => {
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
};

const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  
    return token;
  };
  
  module.exports = {generateTokenAndSetCookie};
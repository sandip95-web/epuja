const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const { log } = require("console");
const { authMiddleware, authorizeRole } = require("../middleware/auth");

//to add the new user
userRouter.post("/user/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      avatar: {
        public_id: "avatars/1",
        url: "https://imgs.search.brave.com/g9omP8tjGucULi-5aOeXsUK_-aCHcXLC4KrXs0pXUf0/rs:fit:860:0:0/g:ce/aHR0cDovL20uZ2V0/dHl3YWxscGFwZXJz/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMy8wNi9Ba2Fn/YW1pLVNoYW5rcy1Q/cm9maWxlLUltYWdl/LmpwZw",
      },
    });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error: ", error.message);
  }
});

//to login user
userRouter.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFind = await User.findOne({ email }).select("+password");

    if (userFind) {
      const passwordCheck = bcrypt.compareSync(
        password.trim(),
        userFind.password.trim()
      );
      if (passwordCheck) {
        jwt.sign(
          { id: userFind._id, email: userFind.email },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRE },
          (err, token) => {
            if (err) {
              console.error("JWT sign error:", err);
              return res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
            } else {
              return res
                .cookie("token", token)
                .json({ success: true, token, userFind });
            }
          }
        );
      } else {
        return res
          .status(401)
          .json({ status: false, message: "Incorrect Password" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

//to logout user
userRouter.post("/user/logout", async (req, res) => {
  res.cookie("token", null).json({ success: true, message: "Logged out" });
});

//forgot password
userRouter.post("/password/forget", async (req, res) => {
  console.log(req.body.email);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  // get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  //create reset password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\n If you have not requested it then ignore it please.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Epuja Password Reset",
      message,
    });
    res
      .status(200)
      .json({ success: true, message: `Email send to ${user.email}` });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({ Error: error.message });
  }
});

//to reset the password
userRouter.put("/password/reset/:token", async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Password reset token is invalid or has been expired",
    });
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Password doesn't match" });
  }
  user.password = bcrypt.hashSync(req.body.password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  return res
    .status(200)
    .json({ success: true, message: "Password has been reset successfully" });
});

//get current login user info
userRouter.get("/user/info", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.query.id);
    console.log("Received user ID:", req.query.id);
    if (user) {
      return res
        .status(200)
        .json({ success: true, message: "Successfully got user info", user });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.json(error.message);
  }
});

//to change password of the currently login user
userRouter.put("/password/update", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("+password");

  const isMatch = bcrypt.compareSync(
    req.body.oldPassword.trim(),
    user.password.trim()
  );
  if (!isMatch) {
    return res
      .status(404)
      .json({ success: false, message: "Old password is incorrect" });
  }
  user.password = bcrypt.hashSync(req.body.password, 10);
  await user.save();
  return res
    .status(200)
    .json({ success: true, message: "Password succesfully changed" });
});

//to update user profile info
userRouter.put("/profile/update", authMiddleware, async (req, res) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return res
      .status(200)
      .json({ success: true, message: "Profile Successfully updated" });
  } catch (error) {
    res.json(error.message);
  }
});

//Admin routes

///get all user

userRouter.get(
  "/admin/alluser",
  authMiddleware,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const user = await User.find();
      return res.status(200).json({ success: true, user });
    } catch (error) {
      res.json(error.message);
    }
  }
);

//get user info
userRouter.get(
  "/admin/userinfo/:id",
  authMiddleware,
  authorizeRole("admin"),
  async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ sucess: true, user });
  }
);

//to update the profile by admin
userRouter.put(
  "/admin/update/:id",
  authMiddleware,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      };

      const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      return res
        .status(200)
        .json({ success: true, message: "Profile Successfully updated", user });
    } catch (error) {
      res.json(error.message);
    }
  }
);

//to delete a user
userRouter.delete(
  "/admin/delete/:id",
  authMiddleware,
  authorizeRole("admin"),
  async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    await user.deleteOne({ _id: req.params.id });
    return res
      .status(200)
      .json({ success: true, message: "User removed successfully" });
  }
);

module.exports = userRouter;

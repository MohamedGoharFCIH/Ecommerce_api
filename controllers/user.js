const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Token = require("../models/token");
const ResidentialAddress = require("../models/residential_address");
const WorkAddress = require("../models/work_address");
const { validationResult } = require("express-validator");
const helper = require("../helpers/helper");
const crypto = require("crypto");
const sendEmail = require("../utils/email/sendEmail");

const bcryptSalt = process.env.BCRYPT_SALT;

exports.createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const exist_emiratesId = await User.findOne({ where: { emiratesID: req.body.emiratesID } });
    if (exist_emiratesId) {
      return res.status(409).json({
        error: "Emirates ID aleardy exists",
      });
    }

    const exist_user_email = await User.findOne({ where: { email: req.body.email } });
    if (exist_user_email) {
      return res.status(409).json({
        error: "Email aleardy exist",
      });
    }
    const exist_username = await User.findOne({ where: { username: req.body.username } });
    if (exist_username) {
      return res.status(409).json({
        error: "Username aleardy exist",
      });
    }
    const exist_callNumber = await User.findOne({ where: { callNumber: req.body.callNumber } });

    if (exist_callNumber) {
      return res.status(409).json({
        error: "Call Number aleardy exist",
      });
    }

    const exist_whatsapp = await User.findOne({ where: { whatsappNumber: req.body.whatsappNumber } });
    if (exist_whatsapp) {
      return res.status(409).json({
        error: "Whatsapp Number aleardy exist",
      });
    }

    const hash = await new Promise((resolve, reject) => {
      bcrypt.hash(req.body.password, Number(bcryptSalt), function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });
    if (hash) {
      const user = await User.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hash,
        username: req.body.username,
        birthdate: req.body.birthdate,
        emiratesID: req.body.emiratesID,
        nationality: req.body.nationality,
        callNumber: req.body.callNumber,
        whatsappNumber: req.body.whatsappNumber,
        emiratesCity: req.body.emiratesCity,
        area: req.body.area,
        workAddress: req.body.workAddress,
        residentialAddress: req.body.residentialAddress,

      },
        {

          include: [WorkAddress, ResidentialAddress]

        });

      if (user) {
        // const token = jwt.sign(
        //   { email: user.email, id: user._id },
        //   process.env.JWT_KEY,
        //   { expiresIn: "20d" }
        // );
        // console.log(token);

        // return res.status(200).json({
        //   token: token,
        //   expiresIn: 20 * 24 * 60 * 60 * 1000,
        //   userId: user._id,
        // });
         return res.status(200).json({
          message :"User created..."
        });
      }
    }
  } catch (err) {
    console.log("error from create User", err);
    return res.status(500).json({
      error: "Invalid authentication credentials!",
    });
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ where: { email: req.body.email } });
    console.log("req", req.body);
    if (!user) {
      return res.status(401).json({
        error: "Wrong Email",
      });
    }

    const compared_pass = await new Promise((resolve, reject) => {
      bcrypt.compare(
        req.body.password,
        user.password,
        function (err, compared) {
          if (err) reject(err);
          resolve(compared);
        }
      );
    });

    if (!compared_pass) {
      return res.status(401).json({
        error: " Wrong Password",
      });
    }

    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_KEY,
      { expiresIn: "20d" }
    );
    console.log(token);
    return res.status(200).json({
      token: token,
      expiresIn: 20 * 24 * 60 * 60 * 1000,
      userId: user.id,
    });
  } catch (err) {
    console.log("err", err);
    return res.status(401).json({
      error: "Invalid authentication credentials!",
    });
  }
};

exports.getUsers = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  console.log(req.query);
  let userQuery = User.findAll({ include: [WorkAddress, ResidentialAddress] });
  let fetchedUsers;
  if (pageSize && currentPage) {
    userQuery = User.findAll({ offset: pageSize * (currentPage - 1), limit: pageSize, include: [WorkAddress, ResidentialAddress] });
  }
  userQuery
    .then(async (users) => {
      fetchedUsers = users;
      return User.count();
    })
    .then((count) => {
      return res.status(200).json({
        message: "Users fetched successfully!",
        maxUsers: count,
        users: fetchedUsers,
      });
    })
    .catch((error) => {
      console.log("error from fetch users", error);
      return res.status(500).json({
        message: "Fetching users failed!",
      });
    });
};

exports.getUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id }, include: [WorkAddress, ResidentialAddress] })
    .then(async (user) => {
      if (user) {
        return res.status(200).json({
          message: "user fetched",
          user: user
        });
      } else {
        res.status(404).json({ error: "user not found!" });
      }
    })
    .catch((error) => {
      console.log()
      return res.status(500).json({
        message: "Fetching user failed!",
      });
    });
};

exports.changePassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findByPk(req.userData.userId);
    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    if (req.body.newPassword1 !== req.body.newPassword2) {
      return res.status(401).json({
        error: "New Passwords does not matches",
      });
    }

    const compared_pass = await new Promise((resolve, reject) => {
      bcrypt.compare(
        req.body.currentPassword,
        user.password,
        function (err, compared) {
          if (err) reject(err);
          resolve(compared);
        }
      );
    });

    if (!compared_pass) {
      return res.status(401).json({
        error: "Current Password Wrong",
      });
    }

    const hash = await new Promise((resolve, reject) => {
      bcrypt.hash(req.body.newPassword1, 10, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });
    if (hash) {
      let updated = await User.update({ password: hash }, {
        where: {
          id: req.userData.userId
        }
      });


      if (updated) {
        return res.status(200).json({
          message: "Password updated successfully",
        });
      }
    }
  } catch (e) {
    return res.status(500).json({
      error: "Error in update password",
    });
  }
};

exports.requestPasswordReset = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(404).json({
        error: "Not found user with this Email",
      });
    }
    // let user_id = helper.objId(user._id);
    await Token.destroy({
      where: {
        userId: user.id
      }
    });
    // if (token) await token.deleteOne();

    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
    let expireDate = new Date(new Date().getTime() + (60 * 60 * 1000))
    await Token.create({
      userId: user.id,
      token: hash,
      tokenExpires: expireDate
    });
    console.log(process.env.BaseUrl);
    const link = `${process.env.BaseUrl}/passwordReset?token=${resetToken}&id=${user.id}`;
    console.log("link", link)
    sendEmail(
      user.email,
      "Password Reset Request",
      {
        name: user.fullName,
        link: link,
      },
      "./template/requestResetPassword.handlebars"
    );
    return res.status(200).json({
      message: "password reset link sent to your email account",
    });
  } catch (e) {
    return res.status(500).json({
      error: "Something went wrong ... Try again",
    });
  }
};

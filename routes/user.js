const express = require("express");
const { body } = require("express-validator");
const check_auth = require("../middleware/check-auth");
const userController = require("../controllers/user");
const router = express.Router();

const User = require("../models/user");
const mobile_regex = /^([+]\d{2})?\d{10}$/;

router.post(
  "/create",
  // body("fullName", "fullName must exists ").exists(),
  body("fullName", "fullName  cannot be Empty").not().isEmpty(),
  // body("email", "email must be exist").exists(),
  body("email", "Invalid email").isEmail(),
  // body("password", "password must exists ").exists(),
  body("password", "password cannot be Empty").not().isEmpty(),
  // body("username", "username must exists ").exists(),
  body("username", "username cannot be Empty").not().isEmpty(),
  // body("birthdate", "birthdate must exists ").exists(),
  body("birthdate", "birthdate Cannot be empty").not().isEmpty(),
  // body("emiratesID", "emirates ID must exists ").exists(),
  body("emiratesID", "emirates ID length must be 15 digits").isLength({
    min: 15,
    max: 15,
  }),
  // body("nationality", "nationality must exists ").exists(),
  body("nationality", "nationality cannot be Empty").not().isEmpty(),
  // body("emiratesCity", "emirates City must exists ").exists(),
  body("emiratesCity", "emirates City cannot be Empty").not().isEmpty(),
  // body("area", "Area must exists ").exists(),
  body("area", "Area cannot be Empty").not().isEmpty(),
  // body("callNumber", "Call Number must be exists").exists(),
  body("callNumber", "Call Number must be valid ").matches(mobile_regex),
  // body("whatsappNumber", "Whatsapp Number must be exists").exists(),
  body("whatsappNumber", "Whatsapp Number must be valid").matches(mobile_regex),
  // body("workAddress.workPlaceName", "Work place name must exists ").exists(),
  body("workAddress.workPlaceName", "Work place name cannot be Empty")
    .not()
    .isEmpty(),
  // body(
  //   "workAddress.workPlaceNameNumber",
  //   "Work place number must exists "
  // ).exists(),
  body("workAddress.workPlaceNameNumber", "Work place must be number").isInt(),
  // body(
  //   "workAddress.staffNumbers",
  //   "Work Address staff numbers must exists "
  // ).exists(),
  body(
    "workAddress.staffNumbers",
    "Work Address staff numbers be number"
  ).isInt(),
  // body(
  //   "workAddress.contactPerson",
  //   "Work Address contact person name  must exists "
  // ).exists(),
  body(
    "workAddress.contactPerson",
    "Work Address contact person name cannot be Empty"
  )
    .not()
    .isEmpty(),
  // body(
  //   "residentailAddress.street",
  //   "Residentail address street must exists "
  // ).exists(),
  body(
    "residentialAddress.street",
    "Residentail address street cannot be Empty"
  )
    .not()
    .isEmpty(),
  // body(
  //   "residentailAddress.personsNumber",
  //   "Residentail address persons number must exists "
  // ).exists(),
  body(
    "residentialAddress.personsNumber",
    "Residential address persons number must be number"
  ).isInt(),
  // body(
  //   "residentailAddress.name",
  //   "residentail  Address name  must exists "
  // ).exists(),
  body("residentialAddress.name", "residentail Address  name cannot be Empty")
    .not()
    .isEmpty(),
  // body(
  //   "residentailAddress.landMark",
  //   "residentail  Address landMark  must exists "
  // ).exists(),
  body(
    "residentialAddress.landMark",
    "residential Address  landMark cannot be Empty"
  )
    .not()
    .isEmpty(),
  // body(
  //   "residentailAddress.groupType",
  //   "residentail  Address groupType  must exists "
  // ).exists(),
  body(
    "residentialAddress.groupType",
    "residentail Address  groupType cannot be Empty"
  )
    .not()
    .isEmpty(),
  // body(
  //   "residentailAddress.contactPerson",
  //   "residentail  Address contact person  must exists "
  // ).exists(),
  body(
    "residentialAddress.contactPerson",
    "residentail Address  contact person cannot be Empty"
  )
    .not()
    .isEmpty(),
  // body(
  //   "residentailAddress.number",
  //   "residentail  Address nummber  must exists "
  // ).exists(),
  body(
    "residentialAddress.number",
    "residentail Address number must be number"
  ).isInt(),

  userController.createUser
);

router.post(
  "/login",
  body("email", "email must be exist").exists(),
  body("email", "Invalid email").isEmail(),
  body("password", "password must exists ").exists(),
  body("password", "password cannot be Empty").not().isEmpty(),
  userController.userLogin
);

router.put(
  "/changepassword",
  body("currentPassword", "Current Password cannot be Empty").not().isEmpty(),
  body("newPassword1", "New Password 1 cannot be Empty").not().isEmpty(),
  body("newPassword2", "New Password 2 cannot be Empty").not().isEmpty(),
  check_auth.checkAuth,
  userController.changePassword
);

router.get("/users/", userController.getUsers);

router.get("/:id", userController.getUser);

router.post(
  "/forget-password",
  body("email", "email must be exist").exists(),
  body("email", "Invalid email").isEmail(),
  userController.requestPasswordReset
);

module.exports = router;

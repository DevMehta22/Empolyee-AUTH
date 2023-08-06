const express = require("express");
const { loginEmp, signupEmp } = require("../Controllers/EmpControllers");

const router = express.Router();

router.post("/login", loginEmp);
router.post("/signup", signupEmp);

module.exports = router;

const jwt = require("jsonwebtoken");
const Employee = require("../Modules/EmpSchema");

const genToken = (_id) => {
  return jwt.sign({ _id }, process.env.API_SECRET, { expiresIn: "2d" });
};

const loginEmp = async (req, res) => {
  const { Emp_Email, Emp_password } = req.body;
  try {
    const emp = await Employee.login(Emp_Email, Emp_password);

    const token = genToken(emp._id);
    res.status(200).json({ Emp_Email, token });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const signupEmp = async (req, res) => {
  const { Emp_Email, Emp_password } = req.body;
  try {
    const emp = await Employee.signup(Emp_Email, Emp_password);

    const token = genToken(emp._id);
    res.status(200).json({ Emp_Email, token });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  loginEmp,
  signupEmp,
};

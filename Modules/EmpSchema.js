const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    Emp_Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    Emp_password: {
      type: String,
      required: true,
      unique: true,
      minlength: 8,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async(Emp_Email, Emp_password)=> {
  if (!Emp_Email || !Emp_password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(Emp_Email)) {
    throw Error("Not a valid Email");
  }
  if (!validator.isStrongPassword(Emp_password)) {
    throw Error("password not strong enough");
  }

  const checkEmail = await this.findOne({ Emp_Email });

  if (checkEmail) {
    throw Error("Email already exists");
  }

  const salting = await bcrypt.genSalt(10);
  const hashing = await bcrypt.hash(Emp_password, salting);

  const emp = await this.create({ Emp_Email, Emp_password: hashing });

  return emp;
};

userSchema.statics.login = async(Emp_Email, Emp_password)=> {
  if (!Emp_Email || !Emp_password) {
    throw Error("All fields must be filled");
  }

  const emp = await this.findOne({ Emp_Email });

  if (!emp) {
    throw Error("Email not found in DB!");
  }

  const compare = await bcrypt.compare(Emp_password, emp.Emp_password);

  if (!compare) {
    throw Error("Password did not matched");
  }

  return emp;
};

module.exports = mongoose.model("employee", userSchema);

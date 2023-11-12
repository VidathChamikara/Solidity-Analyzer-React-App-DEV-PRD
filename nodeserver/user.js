const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
  {
    fname:  String,
    lname: String,
    email: String,
    password: String,      
    numberOfTimesUsed: { type: Number, default: 0 },
    numberOfTimesLeft: { type: Number, default: 5 },  
    bankCardNumber: { type: String, default: null },
    expireDate: { type: String, default: null },
    securityCode: { type: String, default: null },
  },
  {
    collation: "user",
  }
);

mongoose.model("user", UserDetailsScehma);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

// MongoDB connection URI
const MONGODB_URI = "mongodb://127.0.0.1:27017/cyber";

// Connect to MongoDB using Mongoose
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: " + err);
  });

require("./user");

const User = mongoose.model("user");

app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const oldUser = await User.findOne({ email }).collation({});

    if (oldUser) {
      return res.send({ status: "User Exists" });
    }

    User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,            
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).collation({});
    if (!user) {
      return res.json({ error: "User Not Found" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "365d",
      });
      if (res.status(201)) {
        return res.json({ status: "ok", data: token });
      } else {
        return res.json({ error: "error" });
      }
    }
    res.json({ status: "error", error: "Invalid Password" });
  });

  app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
      const user = jwt.verify(token, JWT_SECRET, (err, res) => {
        if (err) {
          return "token expired";
        }
        return res;
      });
      console.log(user);
      if (user == "token expired") {
        return res.send({ status: "error", data: "token expired" });
      }
      const usermail = user.email;
      User.findOne({ email: usermail })
        .collation({})
        .then((data) => {
          res.send({ status: "ok", data: data });
        })
        .catch((error) => {
          res.send({ status: "error", data: error });
        });
    } catch (error) {}
  });
  
  app.post("/updateCounts", async (req, res) => {
  const { token } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return "token expired";
      }
      return decoded;
    });

    if (user === "token expired") {
      return res.send({ status: "error", data: "Token expired" });
    }

    const usermail = user.email;

    User.findOne({ email: usermail })
    .collation({})
      .then((data) => {
        if (data.numberOfTimesLeft > 0) {
          // Update the "Number of times used" and "Number of times left" values
          data.numberOfTimesUsed += 1;
          data.numberOfTimesLeft -= 1;

          // Save the updated user data
          data.save()
            .then(() => {
              res.send({ status: "ok", data: "Counts updated successfully" });
            })
            .catch((error) => {
              res.send({ status: "error", data: error });
            });
        } else {
          res.send({ status: "error", data: "No more counts left" });
        }
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

app.post("/updateBankDetails", async (req, res) => {
  const { token, bankCardNumber, expireDate, securityCode } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);
    const usermail = user.email;

    // Find the user based on the email
    User.findOne({ email: usermail })
    .collation({})
      .then((user) => {
        if (!user) {
          res.send({ status: "error", data: "User not found" });
          return;
        }

        // Update the bank details and increase numberOfTimesLeft
        user.bankCardNumber = bankCardNumber;
        user.expireDate = expireDate;
        user.securityCode = securityCode;
        user.numberOfTimesLeft += 1000;

        // Save the updated user
        user.save()
          .then((updatedUser) => {
            res.send({ status: "ok", data: updatedUser });
          })
          .catch((error) => {
            res.send({ status: "error", data: error });
          });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});


app.listen(5001, () => {
    console.log("Node server started");
  });
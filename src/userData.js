import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        fname: "",
        lname: "",
        email: "",
        numberOfTimesUsed: Number,
        numberOfTimesLeft: Number,
      },
    };
  }

  componentDidMount() {
    fetch("https://solidity-analyzer-node-server-dev-prd.vercel.app/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
        if (data.data === "token expired") {
          alert("Token expired. Please log in again.");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }

  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  render() {
    const { fname, lname, email, numberOfTimesUsed, numberOfTimesLeft } =
      this.state.userData;

    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h2>
            Welcome, {fname} {lname}!
          </h2>
          <p>Upload a Solidity File to Analyze and Detect Vulnerabilities.</p>
          <p>Remaing Count : {numberOfTimesLeft}</p>
          <p>Used Count : {numberOfTimesUsed}</p>
          <Link to="/App" className="custom-link">
            Analyze Your File
          </Link>
          <button onClick={this.logOut} className="custom-button">
            Log Out
          </button>
        </div>
        <style>{`
          
          .custom-link {
            /* Add your link styles here */
            text-decoration: none;
            color: #007bff;
            font-weight: bold;
          }
          .custom-button {
            /* Add your button styles here */
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 5px; /* Adds curved corners */
            transition: background-color 0.3s; /* Adds a smooth transition effect */
          }
          .custom-button:hover {
            background-color: #0056b3; /* Change background color on hover */
          }
        `}</style>
        <style>{`
          .custom-link {
            /* Different styles for the link */
            text-decoration: underline; /* Add underline for links */
            margin-right: 110px; /* Add some spacing to the right of the link */
          }
        `}</style>
      </div>
    );
  }
}

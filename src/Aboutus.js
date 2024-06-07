import React from "react";
import { Link } from "react-router-dom";

function Aboutus() {
  return (
    <div>
      <div className="Container">
        <h1>About Us</h1>
        <br />
        <p>
          Solidity Analyzer is a powerful and user-friendly tool designed to
          identify and help mitigate vulnerabilities in Solidity smart
          contracts. It provides developers, auditors, and blockchain
          enthusiasts with a comprehensive solution to enhance the security of
          Ethereum-based DApps.{" "}
        </p>
        <div className="ButtonContainer">
          <a
            href="mailto:solidityanalyzer@gmail.com"
            className="BeautifulButton"
          >
            Contact Now
          </a>
        </div>
      </div>

      <style>{`
   
        .Container {
          text-align: left; /* Center the content horizontally */
          margin-top: 200px; /* Adjust the top margin to position the container vertically */
          margin-left: 200px;
          margin-right: 700px;
          color: white;
        }
        .Container h1 {
          font-size: 40px; /* Adjust the font size for the heading */
          font-weight: 600;
        }
        .Container p {
          font-size: 22px; /* Adjust the font size for the paragraph */
          line-height: 1.8;
          font-weight: 400;
          text-align: justify;
        }
        .ButtonContainer {
          display: flex;
        }
        .BeautifulButton {
          background-color: white; /* Change the background color */
          color: #00C0F0; /* Change the text color */
          border: none;
          border-radius: 50px; /* Add curved corners */
          padding: 10px 40px; /* Adjust padding for better button size */
          margin-right: 30px; /* Add some spacing between the buttons */
          font-size: 18px; /* Adjust font size */
          cursor: pointer;
          text-decoration: none;
          transition: background-color 0.3s; /* Add a transition effect */
        }
        .BeautifulButton:hover {
          background-color: #0056b3; /* Change background color on hover */
        }
      `}</style>
    </div>
  );
}

export default Aboutus;

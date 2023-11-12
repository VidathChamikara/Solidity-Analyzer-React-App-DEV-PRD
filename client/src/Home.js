import React from "react";
import { Link } from "react-router-dom";


function Home() {
  return (
    <div>
      <div className="Container">
        <h1>Welcome to Your <br/> Solidity Analyzer</h1><br/>
        <p>Upload a Solidity file to analyze and detect vulnerabilities.</p>
        <div className="ButtonContainer">       
          <Link to="/sign-up" className="BeautifulButton">Create Account</Link>
          <Link to="/App" className="BeautifulButton">Analyse</Link>
        </div>
      </div>

      <style>{`
   
        .Container {
          text-align: left; /* Center the content horizontally */
          margin-top: 250px; /* Adjust the top margin to position the container vertically */
          margin-left: 200px;
          color: white;
        }
        .Container h1 {
          font-size: 70px; /* Adjust the font size for the heading */
          font-weight: 600;
        }
        .Container p {
          font-size: 22px; /* Adjust the font size for the paragraph */
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

export default Home;



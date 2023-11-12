import React from "react";
import { Link } from "react-router-dom";


function Package() {
    return (
      <div className="PackageContainer">
        <div className="HeaderBox">
          <h1>Premium</h1>
          <p>Package</p>
          <h1>$50</h1>
          <p>1000 Access</p>
          <p>Ad-Free Experience</p>
          <p>Priority Support</p>
        </div>
        <div className="FooterBox">
          <div className="ButtonContainer">
            <Link to="/payment" className="BeautifulButton">
              Select
            </Link>
          </div>
        </div>
  
        <style jsx>{`
        
          .PackageContainer {
            background-color: #F0F0F0;
            border: 1px solid #E0E0E0;
            border-radius: 10px;
            width: 300px;
            height: 400px;
            padding: 50px;
            margin: 200px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
          }
  
          .HeaderBox {
            text-align: center;
          }
  
          .HeaderBox h1 {
            font-size: 45px;
            font-weight: 600;
            color: #031833;
          }
  
          .HeaderBox p {
            font-size: 16px;
          }
  
          .FooterBox {
            text-align: center;
          }
  
          .ButtonContainer {
            display: flex;
            justify-content: center;
          }
  
          .BeautifulButton {
            background-color: #031833;
            color: white;
            border: none;
            border-radius: 50px;
            padding: 10px 20px;
            font-size: 18px;
            cursor: pointer;
            text-decoration: none;
            transition: background-color 0.3s;
          }
  
          .BeautifulButton:hover {
            background-color: #0056b3;
          }
        `}</style>
      </div>
    );
  }
  
  export default Package;
  
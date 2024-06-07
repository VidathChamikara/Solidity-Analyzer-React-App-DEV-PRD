import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./login";
import Signup from "./signup";
import App from "./App";
import Home from "./Home";
import UserData from "./userData";
import Package from "./package";
import Payment from "./payment";
import CodeBlockComponent from "./CodeBlock";
import CodeBlockKalanaComponent from "./CodeBlockKalana";
import CodeBlockIndujaComponent from "./CodeBlockInduja";
import Aboutus from "./Aboutus";

function Routing() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
 
  return (
    <Router>
      <div className="Route">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand">
              Solidity Analyzer
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
              {isLoggedIn !== "true" && (
              <li className="nav-item">
                  <Link className="nav-link" to={"/Home"}>
                    Home
                  </Link>
                </li>
              )}
                {isLoggedIn !== "true" && (
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Login
                  </Link>
                </li>
                )}
                {isLoggedIn !== "true" && ( // Check if isLoggedIn is true
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
                )}
                {isLoggedIn !== "true" && ( // Check if isLoggedIn is true
                <li className="nav-item">
                  <Link className="nav-link" to={"/Aboutus"}>
                    About Us
                  </Link>
                </li>
                )}
                {isLoggedIn === "true" && ( // Check if isLoggedIn is true
                  <li className="nav-item">
                    <Link className="nav-link" to={"/UserData"}>
                      User
                    </Link>
                  </li>
                )}
                 {isLoggedIn === "true" && ( // Check if isLoggedIn is true
                  <li className="nav-item">
                    <Link className="nav-link" to={"/App"}>
                      Analyzer
                    </Link>
                  </li>
                )}
                {isLoggedIn === "true" && ( // Check if isLoggedIn is true
                  <li className="nav-item">
                    <Link className="nav-link" to={"/Package"}>
                      Packages
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>    
       
            <Routes>
            <Route exact path="/" element={isLoggedIn=="true"?<App/>:<Home/>} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/App" element={<App />} />
              <Route path="/UserData" element={<UserData />} />
              <Route path="/Package" element={<Package />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/CodeBlockComponent" element={<CodeBlockComponent />} />
              <Route path="/CodeBlockNewComponent" element={<CodeBlockKalanaComponent />} />
              <Route path="/CodeBlockIndujaComponent" element={<CodeBlockIndujaComponent />} />
              <Route path="/Aboutus" element={<Aboutus />} />
            </Routes>
               
      </div>
    </Router>
  );
}

export default Routing;

import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      alertMessage: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    fetch("https://solidity-analyzer-node-server-dev-prd.vercel.app/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "Data pass to api");

        if (data.error === "User Not Found") {
          this.setState({ alertMessage: "User not found" });
        } else if (data.error === "Invalid Password") {
          this.setState({ alertMessage: "Invalid password" });
        } else if (data.status === "ok") {
          alert("Login Successful");
          console.log("Token:", data.data); // Add this line to log the token
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "./UserData";
        }
      });
  }
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          {this.state.alertMessage && (
            <div className="custom-alert">
              {this.state.alertMessage}
              <button
                type="button"
                className="close"
                onClick={() => {
                  this.setState({ alertMessage: "" });
                  window.location.reload();
                }}
              >
                &times;
              </button>
            </div>
          )}
          <form onSubmit={this.handleSubmit}>
            <h3>Sign In</h3>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => this.setState({ email: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => this.setState({ password: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <style>{`
        
        .custom-alert {
          position: relative;
          padding: 15px;
          margin: 15px 0;
          border: 1px solid transparent;
          border-radius: 4px;
          color: #31708f;
          background-color: #d9edf7;
        }
        .custom-alert .close {
          position: absolute;
          top: 0;
          right: 5px;
          color: inherit;
        }
      `}</style>
      </div>
    );
  }
}

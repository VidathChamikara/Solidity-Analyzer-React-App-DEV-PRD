import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      alertMessage: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { fname, lname, email, password } = this.state;

    e.preventDefault();
    console.log(fname, lname, email, password);
    fetch("http://localhost:5001/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "User Exists") {
          this.setState({ alertMessage: "User Exists. Cannot sign up again" });
        } else if (data.status === "ok") {
          this.setState({ alertMessage: "Successfully Sign Up" });
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
            <h3>Sign Up</h3>

            <div className="mb-3">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                onChange={(e) => this.setState({ fname: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                onChange={(e) => this.setState({ lname: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
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

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <a href="/sign-in">sign in?</a>
            </p>
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

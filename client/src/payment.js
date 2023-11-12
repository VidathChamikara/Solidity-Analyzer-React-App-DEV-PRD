import React, { Component } from 'react';

export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankCardNumber: "",
      expireDate: "",
      securityCode: "",
      alertMessage: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { bankCardNumber, expireDate, securityCode } = this.state;

    // Card Number Validation
    if (bankCardNumber.length !== 10) {
      this.setState({ alertMessage: "Please enter a valid card number (10 characters)." });
      return;
    }

    // Security Code Validation
    const securityCodePattern = /^\d{3}$/;
    if (!securityCode.match(securityCodePattern)) {
      this.setState({ alertMessage: "Please enter a valid security code (3 digits)." });
      return;
    }

    // If both fields are valid, make the API call and handle the response
    fetch("http://localhost:5001/updateBankDetails", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        bankCardNumber,
        expireDate,
        securityCode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "Data passed to API");

        if (data.status === "error") {
          this.setState({ alertMessage: "Something went wrong. Please try again." });
        } else if (data.status === "ok") {
          alert("Payment Successful");
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
            <h3>Payment</h3>

            <div className="mb-3">
              <label>Card Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Card Number (10 characters)"
                value={this.state.bankCardNumber}
                onChange={(e) => this.setState({ bankCardNumber: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label>Expiration Date</label>
              <input
                type="text"
                className="form-control"
                placeholder="mm/yyyy"
                onChange={(e) => this.setState({ expireDate: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label>Security Code</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Security Code (3 digits)"
                value={this.state.securityCode}
                onChange={(e) => this.setState({ securityCode: e.target.value })}
                required
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <style>{`
          body {
            overflow: hidden;
          }
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

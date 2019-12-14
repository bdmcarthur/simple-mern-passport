import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as AuthenticationServices from "../services/auth-services";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirectTo: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;

    AuthenticationServices.logInService({
      username,
      password
    })
      .then(user => {
        this.props.updateUser({
          loggedIn: true,
          username: user
        });
        this.setState({
          redirectTo: "/"
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="container">
          <h4>Login</h4>
          <form>
            <div className="form-group text-left">
              <label htmlFor="username">Email address</label>
              <input
                type="email"
                className="form-control"
                id="username"
                autoComplete="username"
                name="username"
                aria-describedby="emailHelp"
                value={this.state.username}
                onChange={this.handleChange}
              ></input>
            </div>

            <div className="form-group text-left">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                autoComplete="current-password"
                className="form-control"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              ></input>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Login
            </button>
          </form>
        </div>
      );
    }
  }
}

export default LoginForm;

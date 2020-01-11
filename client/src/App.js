import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import Signup from "./Components/Signup";
import LoginForm from "./Components/Login";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: null
    };
  }

  componentDidMount = () => {
    this.getUser();
  };

  updateUser = userObject => {
    this.setState(userObject);
  };

  getUser = () => {
    axios.get("/user/").then(response => {
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session");
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          user: null
        });
      }
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Navbar
          updateUser={this.updateUser}
          user={this.state.user}
          loggedIn={this.state.loggedIn}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/login"
            render={() => <LoginForm updateUser={this.updateUser} />}
          />
          <Route
            path="/signup"
            render={() => <Signup updateUser={this.updateUser} />}
          />
          <Route path="/about" render={() => <About />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  registerationRequest,
  registerationSuccess,
  registerationFail,
} from "./../redux/booking/actions";
import uuid from "uuid-random";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      location: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleRegister = () => {
    const {
      registerationRequest,
      registerationSuccess,
      registerationFail,
    } = this.props;
    const { username, password, location } = this.state;
    registerationRequest();
    if (username.length != 0 && password.length != 0 && location.length != 0) {
      let userTemplate = {
        username: username,
        password: password,
        location: location,
        id: uuid(),
        bookings: [],
      };
      registerationSuccess(userTemplate);
      alert("Registeration Successful, redirecting to login");
      this.props.history.push("/");
    } else {
      registerationFail();
      alert("Registeration Failed");
    }
  };
  render() {
    return (
      <>
        <div className="d-flex flex-column col-3 mx-auto ">
          <img className="img-fluid col" src="logo.png" alt="" />

          <p className="h3 text-center">Register</p>
          <input
            onChange={this.handleChange}
            className="my-1"
            type="text"
            name="username"
            id=""
            placeholder="username"
          />
          <input
            onChange={this.handleChange}
            className="my-1"
            type="password"
            name="password"
            id=""
            placeholder="password"
          />
          <input
            onChange={this.handleChange}
            className="my-1"
            type="text"
            name="location"
            id=""
            placeholder="location"
          />
          <button
            onClick={this.handleRegister}
            type="button"
            className="btn btn-primary mt-2"
          >
            Register
          </button>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  isLogged: state.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  registerationRequest: () => dispatch(registerationRequest()),
  registerationSuccess: (value) => dispatch(registerationSuccess(value)),
  registerationFail: () => dispatch(registerationFail()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

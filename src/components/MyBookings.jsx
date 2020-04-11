import React from "react";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom'

class MyBookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
    };
  }
  componentDidMount() {
    const { userDB, currentUser } = this.props;
    let filteredUser = userDB.filter((e) => e.id == currentUser)[0];
    this.setState({
      bookings: filteredUser.bookings,
    });
  }
  render() {
    const { isLogged,userDB } = this.props;
    return (
      <>
        <p className="text-center display-3 text-white bg-danger py-2">My Bookings</p>
        {this.state.bookings.length > 0 ? (
          <table className="table">
            <thead>
              <th>Movie Name</th>
              <th>Theater Name</th>
              <th>Booking Id</th>
              <th>Seat</th>
              <th>Status</th>
              
            </thead>
            <tbody>
            {this.state.bookings.map(e=>{
              return (
                <tr>
                  <td>{e.movieName}</td>
                  <td>{e.theatreName}</td>
                  <td>{e.bookingId}</td>
                  <td>{e.seat}</td>
                  <td>{e.status}</td>
                </tr>
              );
            })}
            </tbody>
          </table>
        ) : (
          <p className="text-warning text-center h3 my-5">No bookings found</p>
        )}
        {!isLogged && <Redirect to="/"/>}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  userDB: state.userDB,
  currentUser: state.currentUser,
  isLogged:state.loggedIn
});

export default connect(mapStateToProps, null)(MyBookings);

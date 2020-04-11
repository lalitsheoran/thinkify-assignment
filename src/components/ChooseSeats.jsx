import React from "react";
import "./Seat.css";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import {
  setSelectedSeatId,
  bookingSuccess,
  setLatestBookingId,
} from "./../redux/booking/actions";
import uuid from "uuid-random";

class ChooseSeats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allSeats: [
        "A1",
        "A2",
        "A3",
        "A4",
        "A5",
        "A6",
        "A7",
        "A8",
        "B1",
        "B2",
        "B3",
        "B4",
        "B5",
        "B6",
        "B7",
        "B8",
        "C1",
        "C2",
        "C3",
        "C4",
        "C5",
        "C6",
        "C7",
        "C8",
        "D1",
        "D2",
        "D3",
        "D4",
        "D5",
        "D6",
        "D7",
        "D8",
      ],
      selectedSeat: "",
    };
  }
  handleSeat = (e) => {
    this.setState(
      {
        selectedSeat: e.target.textContent,
      },
      () => this.props.setSelectedSeatId(this.state.selectedSeat)
    );
  };
  handleBooking = () => {
    const {
      selectedMovieId,
      selectedTheatreId,
      movies,
      bookingSuccess,
      setLatestBookingId,
    } = this.props;
    let filteredMovie = movies.filter((e) => e.id == selectedMovieId)[0];
    let filteredTheatre = filteredMovie.theatres.filter(
      (e) => e.id == selectedTheatreId
    )[0];
    let bookingTemplate = {
      bookingId: uuid(),
      movieName: filteredMovie.name,
      theatreName: filteredTheatre.name,
      seat: this.state.selectedSeat,
      status: "confirmed",
    };
    setLatestBookingId(bookingTemplate.bookingId);
    bookingSuccess(bookingTemplate);
    this.props.history.push("/confirmeddetails");
  };

  render() {
    const { isLogged, movies, selectedMovieId, setSelectedSeatId } = this.props;
    return (
      <>
        <p className="display-3 text-center">Choose Seat</p>
        <div className="d-flex flex-wrap col-4 mx-auto mt-4 ">
          {this.state.allSeats.map((e) => (
            <div
              onClick={this.handleSeat}
              style={{ cursor: "pointer" }}
              className="seats m-1 h5 border p-2"
            >
              {e}
            </div>
          ))}
        </div>
        <div>
          <p className="mx-auto text-center text-white bg-dark mt-5 border col-6">
            Screen this side
          </p>
          <p className="display-1 mt-2 text-warning text-center font-weight-bold">
            {this.state.selectedSeat.length != 0 && (
              <span className="display-4 text-dark">Choosen Seat</span>
            )}{" "}
            {this.state.selectedSeat}
          </p>
        </div>
        {this.state.selectedSeat.length != 0 && (
          <p className="text-right m-2 mr-5">
            <button
              onClick={this.handleBooking}
              type="button"
              class="btn btn-primary"
            >
              Confirm Booking
            </button>
          </p>
        )}
        {!isLogged && <Redirect to="/" />}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.loggedIn,
  location: state.location,
  movies: state.movies,
  selectedMovieId: state.selectedMovieId,
  selectedTheatreId: state.selectedTheatreId,
});
const mapDispatchToProps = (dispatch) => ({
  setSelectedSeatId: (value) => dispatch(setSelectedSeatId(value)),
  bookingSuccess: (value) => dispatch(bookingSuccess(value)),
  setLatestBookingId: (value) => dispatch(setLatestBookingId(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseSeats);

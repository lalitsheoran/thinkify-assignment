import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { setSelectedTheatreId, getData } from "./../redux/booking/actions";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import uuid from "uuid-random";

class ChooseTheatre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theatresData: "",
      toFilter: false,
    };
  }
  handleChange = (e) => {
    if (e.target.value == "false") {
      this.setState(
        {
          toFilter: false,
        },
        this.handleFilter
      );
    } else {
      this.setState(
        {
          toFilter: true,
        },
        this.handleFilter
      );
    }
  };

  handleFilter = () => {
    let filteredMovie;
    const { selectedMovieId, movies, location } = this.props;
    if (this.state.toFilter == false) {
      filteredMovie = movies.filter((e) => e.id == selectedMovieId)[0];
      this.setState({
        theatresData: filteredMovie.theatres,
      });
    } else {
      filteredMovie = movies.filter((e) => e.id == selectedMovieId)[0];
      filteredMovie = filteredMovie.theatres.filter(
        (e) => e.location.toLowerCase() == location.toLowerCase()
      );
      console.log(filteredMovie);
      this.setState({
        theatresData: filteredMovie,
      });
    }
  };

  componentDidMount() {
    const { selectedMovieId, movies } = this.props;
    let filteredMovie = movies.filter((e) => e.id == selectedMovieId)[0];
    this.setState({
      theatresData: filteredMovie.theatres,
    });
  }
  render() {
    const {
      isLogged,
      movies,
      selectedMovieId,
      setSelectedTheatreId,
    } = this.props;
    return (
      <>
        <div className="d-flex">
          <div
            style={{
              height: this.state.theatresData.length < 2 ? "100vh" : "145vh",
            }}
            className="col-3 bg-danger"
          >
            <p className="text-white h3 text-center my-3">Filter</p>
            <div>
              <p>By location</p>
              <div class="form-group">
                <select
                  onChange={this.handleChange}
                  class="custom-select"
                  name="genre"
                  id=""
                >
                  <option value="false">Show All</option>
                  <option value="true">My city</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col row mt-2 mr-3 offset-2">
            {selectedMovieId &&
              this.state.theatresData.length > 0 &&
              this.state.theatresData.map((e) => {
                return (
                  <Card key={uuid()} className="m-2" style={{ width: "300px" }}>
                    <CardActionArea className="text-center">
                      <CardMedia
                        className="img-fluid mx-auto"
                        component="img"
                        style={{ width: "300px" }}
                        image="https://content.jdmagicbox.com/comp/thrissur/j2/9999px487.x487.171229214109.n6j2/catalogue/chembakassery-cinemas-irinjalakuda-thrissur-multiplex-cinema-halls-j8dtanz7ve.jpg"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h5">
                          {e.name}
                        </Typography>
                        <Typography>Location : {e.location}</Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActionArea className="text-center">
                      <Link to={`/chooseseats:${e.id}`}>
                        <Button
                          onClick={() => setSelectedTheatreId(e.id)}
                          size="small"
                          color="primary"
                        >
                          Select this theatre
                        </Button>
                      </Link>
                    </CardActionArea>
                  </Card>
                );
              })}
          </div>
          {!isLogged && <Redirect to="/" />}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.loggedIn,
  location: state.location,
  movies: state.movies,
  selectedMovieId: state.selectedMovieId,
});
const mapDispatchToProps = (dispatch) => ({
  setSelectedTheatreId: (value) => dispatch(setSelectedTheatreId(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseTheatre);

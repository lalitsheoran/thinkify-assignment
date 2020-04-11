import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect,Link} from 'react-router-dom'
import {setSelectedMovieId,getData,logoutSuccess} from './../redux/booking/actions'
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import uuid from 'uuid-random'

class MovieList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:"",
            filterx:"",
            filterType:""
        }
    }
    // filteredData=""
    handleChange=(e)=>{
        this.setState({
            filterx:e.target.value,
            filterType:e.target.name
        },this.handleFilter)
    }
    
    handleFilter=()=>{
        let dataFiltered
        if(this.state.filterx=="all"){
            this.setState({
                data:this.props.movies
            })
        }
        else if(this.state.filterx!="all" && this.state.filterType=="genre"){
            dataFiltered=this.props.movies.filter(e=>e.genre==this.state.filterx)
            this.setState({
                data:dataFiltered
            })
        }
        else if(this.state.filterx!="all" && this.state.filterType=="language"){
            dataFiltered=this.props.movies.filter(e=>e.language==this.state.filterx)
            this.setState({
                data:dataFiltered
            })
        }
    }

    componentDidMount(){
        const {getData}=this.props
        axios.get("./data.json")
        .then((res)=>{
            return this.setState({
                data:res.data
            },()=>getData(res.data))
        })
        .catch((err)=>console.log(err))
        
    }
    render(){
        const {isLogged,movies,setSelectedMovieId,logoutSuccess}=this.props
        return(
            <>
            <div className="d-flex">
            <div style={{height:this.state.data.length < 4 ? "100vh" : "175vh" }} className="col-3 bg-danger">
                <p className="text-white h3 text-center my-3">Filter</p>
                <div>
                <p>By genre</p>
                <div class="form-group">
                    <select onChange={this.handleChange} class="custom-select" name="genre" id="">
                        <option value="all">Show All</option>
                        <option value="Drama">Drama</option>
                        <option value="Horror">Horror</option>
                        <option value="History">History</option>
                    </select>
                </div>
                </div>
                <div>
                <p>By language</p>
                <div class="form-group">
                    <select onChange={this.handleChange} class="custom-select" name="language" id="">
                        <option value="all">Show All</option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                    </select>
                </div>
                </div>
                <div>
                    <button  onClick={logoutSuccess} type="button" class=" mt-5 btn btn-outline-light">Logout</button>
                </div>
            </div>
            
            <div style={{}} className="col row mt-2 mr-3 offset-2">
                {movies && this.state.data.length > 0 && this.state.data.map(e=>{
              return (
                <Card key={uuid()} className="m-2" style={{ width: "220px" }}>
                  <CardActionArea className="text-center">
                    <CardMedia
                      className="img-fluid mx-auto"
                      component="img"
                      style={{ width: "220px" }}
                      image={e.image}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h5">
                        {e.name}
                      </Typography>
                      <Typography>Rating : {e.rating}</Typography>
                      <Typography>Genre : {e.genre}</Typography>
                      <Typography>Language : {e.language}</Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActionArea className="text-center">
                   <Link to={`/book:${e.id}`}>
                      <Button onClick={()=>setSelectedMovieId(e.id)} size="small" color="primary">
                        Book this movie
                      </Button>
                    </Link> 
                  </CardActionArea>
                </Card>
              );
            })}
            </div>
                {!isLogged && <Redirect to="/"/>}
            </div>
            </>
        )
    }
}

const mapStateToProps=(state)=>({
    isLogged:state.loggedIn,
    movies:state.movies
})
const mapDispatchToProps=(dispatch)=>({
    getData:(value)=>dispatch(getData(value)),
    setSelectedMovieId:(value)=>dispatch(setSelectedMovieId(value)),
    logoutSuccess:()=>dispatch(logoutSuccess())
})

export default connect(mapStateToProps,mapDispatchToProps)(MovieList)
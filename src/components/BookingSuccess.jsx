import React from 'react'
import {connect} from 'react-redux'
import {cancelBooking} from './../redux/booking/actions'
import {Link,Redirect} from 'react-router-dom'

class BookingSuccess extends React.Component{
    constructor(props){
        super(props)
        this.state={
            bookingId:"",
            movieName:"",
            theatre:"",
            seat:""
        }
    }
    componentDidMount(){
        const {latestBookingId,currentUser,userDB}=this.props
        let filteredUser=userDB.filter(e=>e.id==currentUser)[0]
        let filteredBooking=filteredUser.bookings.filter(e=>e.bookingId==latestBookingId)[0]
        this.setState({
            bookingId:filteredBooking.bookingId,
            movieName:filteredBooking.movieName,
            theatreName:filteredBooking.theatreName,
            seat:filteredBooking.seat
        })

    }
    handleBookingCancel=()=>{
        const {cancelBooking}=this.props
        cancelBooking(this.state.bookingId)
        alert("Booking cancelled successfully")
    }
    render(){
        const {isLogged}=this.props
        return(
            <>
            <div>
                <p className="display-2 text-center text-primary">Booking Successfull</p>
                <p className="text-center h4">Details</p>
               <p className="text-center col-8 offset-2"> 
               <div className="d-flex justify-content-between">
                    <p>Booking ID</p>
        <p>{this.state.bookingId}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>Movie</p>
        <p>{this.state.movieName}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>Theatre</p>
        <p>{this.state.theatreName}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>Seat</p>
        <p>{this.state.seat}</p>
                </div>
               </p>
                <p className="h4 text-center">If you booked it by mistake, cancel it right now.</p>
                <p className="text-center">
                <button onClick={this.handleBookingCancel} type="button" class="m-1 btn btn-danger">Cancel it</button>
                <Link to="/"><button type="button" class="m-1 btn btn-success">Home</button></Link>
                </p>

            </div>
            {!isLogged && <Redirect to="/"/>}

            </>
        )
    }
}
const mapStateToProps = (state) => ({
    isLogged:state.loggedIn,
    latestBookingId:state.latestBookingId,
    currentUser:state.currentUser,
    userDB:state.userDB
})

const mapDispatchToProps =dispatch=> ({
 cancelBooking:(value)=>dispatch(cancelBooking(value))   
})

export default connect(mapStateToProps,mapDispatchToProps)(BookingSuccess)

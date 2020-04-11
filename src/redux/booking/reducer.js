import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTERATION_REQUEST,
    REGISTERATION_SUCCESS,
    REGISTERATION_FAIL,
    GET_DATA,
    SET_SELECTED_MOVIE_ID,
    SET_SELECTED_THEATRE_ID,
    SET_SELECTED_SEAT_ID,
    BOOKING_SUCCESS,
    SET_LATEST_BOOKING_ID,
    CANCEL_BOOKING
} from "./actionTypes"

const initialState={
    userDB:[

    ],
    loggedIn:false,
    loadingUser:false,
    loadingUserFail:false,
    registeringUser:false,
    registeringUserFail:false,
    currentUser:"",
    location:"",
    selectedMovieId:"",
    selectedTheatreId:"",
    selectedSeatId:"",
    latestBookingId:"",
    movies:""
}
export const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case LOGIN_REQUEST:
        return{...state,loadingUser:true}

        case LOGIN_SUCCESS:
        return{...state,loadingUser:false,loadingUserFail:false,loggedIn:true,currentUser:action.payload[0],location:action.payload[1]}

        case LOGIN_FAIL:
        return{...state,loadingUser:false,loggedIn:false,loadingUserFail:true}

        case LOGOUT_SUCCESS:
            return {...state,loggedIn:false,currentUser:"",selectedMovieId:"",selectedTheatreId:"",selectedSeatId:"",latestBookingId:""}

        case REGISTERATION_REQUEST:
        return{...state,registeringUser:true}

        case REGISTERATION_SUCCESS:
        let userDatabase=state.userDB
        return{...state,registeringUser:false,registeringUserFail:false,userDB:[...userDatabase,action.payload]}

        case REGISTERATION_FAIL:
        return{...state,registeringUser:false,registeringUserFail:true}

        case GET_DATA:
        return{...state,movies:action.payload}

        case SET_SELECTED_MOVIE_ID:
        return{...state,selectedMovieId:action.payload}

        case SET_SELECTED_THEATRE_ID:
        return{...state,selectedTheatreId:action.payload}

        case SET_SELECTED_SEAT_ID:
        return{...state,selectedSeatId:action.payload}

        case BOOKING_SUCCESS:
        let bookingSuccessDB=state.userDB
        for(let i=0;i<bookingSuccessDB.length;i++){
            if(bookingSuccessDB[i].id==state.currentUser){
                bookingSuccessDB[i].bookings.push(action.payload)
                break
            }
        }
        return{...state,userDB:bookingSuccessDB}

        case SET_LATEST_BOOKING_ID:
            return{...state,latestBookingId:action.payload}

        case CANCEL_BOOKING:
        let cancelBookingDB=state.userDB
        let cancelUserDetails=cancelBookingDB.filter(e=>e.id=state.currentUser)[0]
        for(let i=0;i<cancelUserDetails.bookings.length;i++){
            if(cancelUserDetails.bookings[i].bookingId==action.payload){
                cancelUserDetails.bookings[i].status="cancelledByUser"
                break
            }
        }
        for(let i=0;i<cancelBookingDB.length;i++){
            if(cancelBookingDB[i].id==state.currentUser){
                cancelBookingDB[i]=cancelUserDetails
                break
            }
        }
        return{...state,userDB:cancelBookingDB}

        default:
            return state;
    }
}
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

export const loginRequest=()=>({
    type:LOGIN_REQUEST
})
export const loginSuccess=(value)=>({
    type:LOGIN_SUCCESS,
    payload:value
})
export const loginFail=()=>({
    type:LOGIN_FAIL
})
export const logoutSuccess=()=>({
    type:LOGOUT_SUCCESS
})
export const registerationRequest=()=>({
    type:REGISTERATION_REQUEST
})
export const registerationSuccess=(value)=>({
    type:REGISTERATION_SUCCESS,
    payload:value
})
export const registerationFail=()=>({
    type:REGISTERATION_FAIL
})
export const getData=(value)=>({
    type:GET_DATA,
    payload:value
})
export const setSelectedMovieId=(value)=>({
    type:SET_SELECTED_MOVIE_ID,
    payload:value
})
export const setSelectedTheatreId=(value)=>({
    type:SET_SELECTED_THEATRE_ID,
    payload:value
})
export const setSelectedSeatId=(value)=>({
    type:SET_SELECTED_SEAT_ID,
    payload:value
})
export const bookingSuccess=(value)=>({
    type:BOOKING_SUCCESS,
    payload:value
})
export const setLatestBookingId=(value)=>({
    type:SET_LATEST_BOOKING_ID,
    payload:value
})
export const cancelBooking=(value)=>({
    type:CANCEL_BOOKING,
    payload:value
})
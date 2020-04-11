import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import MovieList from './components/MovieList'
import ChooseTheatre from './components/ChooseTheatre'
import ChooseSeats from './components/ChooseSeats'
import BookingSuccess from './components/BookingSuccess'

export default class Routes extends React.Component{
    render(){
        return(
            <>
            <Switch>
                <Route exact path="/" render={()=><Login/>}/>
                <Route exact path="/register" render={(props)=><Signup {...props} />}/>
                <Route exact path="/movielist" render={()=><MovieList/>}/>
                <Route exact path="/book:id" render={(props)=><ChooseTheatre {...props}/>}/>
                <Route exact path="/chooseseats:id" render={(props)=><ChooseSeats {...props}/>}/>
                <Route exact path="/confirmeddetails" render={(props)=><BookingSuccess {...props}/>}/>


            </Switch>
            </>
        )
    }
}
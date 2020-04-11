import React from 'react'
import {Redirect,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginRequest,loginSuccess,loginFail} from './../redux/booking/actions'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:"",
            password:""
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleLogin=()=>{
        const {database,loginRequest,loginSuccess,loginFail}=this.props
        loginRequest()
        let userData=database.filter(e=>e.username==this.state.username)[0]
        if(userData && userData.password==this.state.password){
            loginSuccess([userData.id,userData.location])
        }
        else{
            loginFail()
            alert("Login Failed")
        }
    }
    render(){
        const {isLogged}=this.props
        return(
            <>
            <div className="d-flex flex-column col-3 mx-auto ">
                <img className="img-fluid col" src="https://i.dlpng.com/static/png/268615_preview.png" alt=""/>
                <p className="h3 text-center">Login to Book tickets</p>
                <input onChange={this.handleChange} className="my-1" type="text" name="username" id="" placeholder="username"/>
                <input onChange={this.handleChange} className="my-1" type="password" name="password" id="" placeholder="password"/>
                <button onClick={this.handleLogin} type="button" className="btn btn-primary mt-2">Login</button>
                <div>
                    <p className="text-right"><Link to="/register">Click here</Link> to register</p>
                </div>
            </div>
            {isLogged && <Redirect to="movielist"/>}
            </>
        )
    }
}
const mapStateToProps=(state)=>({
    isLogged:state.loggedIn,
    database:state.userDB
})

const mapDispatchToProps=(dispatch)=>({
    loginRequest:()=>dispatch(loginRequest()),
    loginSuccess:(value)=>dispatch(loginSuccess(value)),
    loginFail:()=>dispatch(loginFail())
})

export default connect(mapStateToProps,mapDispatchToProps)(Login)
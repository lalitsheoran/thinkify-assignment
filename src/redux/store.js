import {createStore} from "redux"
import {reducer} from './booking/reducer'

function persistToLocalStorage(state){
    try{
        const currentState= JSON.stringify(state)
        localStorage.setItem("state",currentState)
    }
    catch(err){
        console.log(err)
    }
}

function getFromLocalStorage(){
    try{
        const currentState = localStorage.getItem("state")
        if(currentState===null){
            return undefined
        }
        return JSON.parse(currentState)
    }
    catch(err){
        console.log(err)
        return undefined
    }
}

const getFromLocalStorageKey=getFromLocalStorage()

const store=createStore(reducer,getFromLocalStorageKey,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.subscribe(()=>persistToLocalStorage(store.getState()))

export default store
import {
    HOME, 
    REGISTRATION
 } from '../actions/actions'

export const reducer = (state, action) => {
    switch (action.type){
        case (HOME) : {
            return {...state, home: action.payload}
        }
        case (REGISTRATION) : {
            return {...state, registration: action.payload}
        }
    }
}
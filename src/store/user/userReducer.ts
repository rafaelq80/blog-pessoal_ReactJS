import {Action } from './actions';

export interface UserState {
    tokens: string,
    id: string
}

const initialState = {
    tokens: "",
    id: ""
}

export const userReducer = (state: UserState = initialState, action: Action) =>{
    switch (action.type){
        case "ADD_TOKEN": {
            return {tokens: action.payload, id: state.id}
        }

        case "ADD_ID": {

            /* Seguindo a Interface UserState, retornamos o ID com a informação adicionada e o 
                Token com a informação inicial dele*/
            return {id: action.payload, tokens: state.tokens}
        }
        
        default:
            return state
    }
}
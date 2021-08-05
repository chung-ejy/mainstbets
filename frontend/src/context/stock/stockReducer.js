import { GET_PREDICTION, SET_TICKER, SET_LOADING, STOP_LOADING, SET_ERROR, CLEAR_ERROR } from "./types";
export default(state,action) => {
    switch(action.type) {
        case SET_ERROR:
            return {
                ...state,
                error: {msg:"rekt",type:"big sadge"}
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error:null
            }
        case SET_LOADING:
            return {
                ...state,
                loading:true
            }
        case SET_TICKER:
            return {
                ...state,
                ticker:action.payload
            }
        case GET_PREDICTION:
            return {
                ...state,
                prediction:action.payload,
                loading:false
            }
    }
}
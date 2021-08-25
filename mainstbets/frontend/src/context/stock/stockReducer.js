import { GET_TIMESERIES, GET_STOCK, GET_SECTORS, SET_LOADING, STOP_LOADING, SET_ERROR, CLEAR_ERROR } from "./types";
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
        case GET_TIMESERIES:
            return {
                ...state,
                timeseries:action.payload.timeseries,
                loading:false
            }
        case GET_STOCK:
            return {
                ...state,
                stock:action.payload.stock,
                loading:false
            }
        case GET_SECTORS:
            return {
                ...state,
                sectors:action.payload.sectors,
                loading:false
            }
    }
}
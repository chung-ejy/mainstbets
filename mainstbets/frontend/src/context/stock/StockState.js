import { GET_PREDICTION, SET_TICKER, SET_LOADING, STOP_LOADING, SET_ERROR, CLEAR_ERROR } from "./types";
import React, { useReducer } from "react";
import StockContext from "./stockContext"
import stockReducer from "./stockReducer"
import axios from "axios"

const StockState = props => {
    const initialState = {
        title: "Weekly Stock Price Prediction",
        prediction: {"ticker":"MSFT","prediction":0,"adjClose":0,"delta":0,"score":0},
        error:null,
        loading:false
    }

    const [state,dispatch] = useReducer(stockReducer,initialState)

    const setError = (msg,type) => {
        dispatch({
            type:SET_ERROR,
            payload: {msg,type}
        })
        setTimeout(()=> {
            clearError()
        },5000);
    }
    const clearError = () => {
        dispatch({
            type:CLEAR_ERROR
        });
    }

    const setLoading = () => {
        dispatch({
            type:SET_LOADING
        });
    }
    
    const stopLoading = () => {
        dispatch({
            type:STOP_LOADING
        });
    }

    const setTicker = (ticker) => {
        dispatch({
            type:SET_TICKER,
            payload: ticker
        });
    }

    const getPrediction = (data) => {
        setLoading()
        axios.post(`/api/`,data).then(res=>{
            dispatch({
                type:GET_PREDICTION,
                payload:res.data
            })
        }).catch(err => {
            stopLoading()
            setError(err.message,"danger")
            getPrediction(state.prediction)
        });
    }

    return (
        <StockContext.Provider value={{
            prediction:state.prediction,
            loading:state.loading,
            error:state.error,
            title:state.title,
            setError,
            setTicker,
            getPrediction
        }}>
            {props.children}
        </StockContext.Provider>
    )
}
export default StockState;
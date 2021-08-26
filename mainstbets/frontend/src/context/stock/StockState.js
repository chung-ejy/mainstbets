import { SET_TICKER,GET_TIMESERIES,GET_STOCK,GET_SECTORS, SET_LOADING, STOP_LOADING, SET_ERROR, CLEAR_ERROR } from "./types";
import React, { useReducer } from "react";
import StockContext from "./stockContext"
import stockReducer from "./stockReducer"
import axios from "axios"

const StockState = props => {
    const initialState = {
        title: "Rolling Average Bro",
        sectors: [],
        timeseries: [],
        ticker:"",
        stock:[],
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

    const getSectors = () => {
        setLoading()
        axios.post(`/api/sectors`).then(res=>{
            dispatch({
                type:GET_SECTORS,
                payload:res.data
            })
        }).catch(err => {
            stopLoading()
            setError(err.message,"danger")
        });
    }

    const getStock = (data) => {
        setLoading()
        axios.post(`/api/stock`,data).then(res=>{
            dispatch({
                type:GET_STOCK,
                payload:res.data
            })
        }).catch(err => {
            stopLoading()
            setError(err.message,"danger")
        });
    }

    const setTicker = (data) => {
        setLoading()
            dispatch({
                type:SET_TICKER,
                payload:data
            })
        stopLoading()
    }

    const getTimeSeries = () => {
        setLoading()
        axios.get(`/api/timeseries`).then(res=>{
            dispatch({
                type:GET_TIMESERIES,
                payload:res.data
            })
        }).catch(err => {
            stopLoading()
            setError(err.message,"danger")
        });
    }

    return (
        <StockContext.Provider value={{
            sectors:state.sectors,
            timeseries:state.timeseries,
            stock:state.stock,
            loading:state.loading,
            error:state.error,
            title:state.title,
            getSectors,
            getStock,
            getTimeSeries
        }}>
            {props.children}
        </StockContext.Provider>
    )
}
export default StockState;
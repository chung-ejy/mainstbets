import React, {useContext,useEffect,Fragment,useState} from 'react';
import StockContext from '../../context/stock/stockContext';
import Alert from "../alerts/Alert"
// import Sentiment from '../sentiment/Sentiment';
import Form from '../stock/Form';
import TimeSeries from '../stock/TimeSeries';
import Stock from '../stock/Stock'
import Sector from '../stock/Sector';
import SectorForm from '../stock/SectorForm';
const Stocks = () => {
    const stockContext = useContext(StockContext)
    const {loading,getSectors,getTimeSeries,title,timeseries,sectors,stock,sector} = stockContext;
    const [state,setState] = useState({"level":1})
    useEffect(() => {
        getTimeSeries()
        getSectors()
    },//eslint-disable-next-line
    []
    );
    const changeLevel = (e) => {
        console.log(level * -1)
        e.preventDefault()
        setState({...state,["level"]:level*-1})
        // getTimeSeries()
        // getSectors()
    }
    const {level} = state
    return (
        <div className="card mt-4">
            <div className="card-body align-content-center justify-content-center">
                {loading || title.size < 1 ? (
                    <div className="container justify-content-center">
                        <h3 className="text-center">
                            <i className="fas fa-spinner text-primary fa-7x"></i>
                        </h3>
                        <h3 className="text-center mt-3">
                            {"LOADING"}
                        </h3>
                    </div>) : (
                        <Fragment>
                            <Alert />
                            {level == 1 ? 
                            <Fragment>
                            <Stock data={stock} sectors={sectors} timeseries={timeseries}/>
                            <Form />
                            </Fragment>:
                            <Fragment>
                                <Sector sector={sector}/>
                                <SectorForm/>
                            </Fragment> }
                            <button onClick={changeLevel}>{level == 1 ? "Stock Analysis" : "Industry Analysis"}</button>
                            <TimeSeries timeseries={timeseries} /> 
                        </Fragment>

                    )

                }
            </div>
        </div>
    );
};

export default Stocks

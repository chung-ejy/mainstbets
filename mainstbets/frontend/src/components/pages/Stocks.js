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
            <div className="card-body align-content-center justify-content-center text-center">
                {loading || title.size < 1 ? (
                    <div className="container justify-content-center">
                        <h3 className="text-center">
                            <i className="fas fa-spinner text-primary fa-7x"></i>
                        </h3>
                        <h3 className="text-center mt-3 text-primary">
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
                            <form>
                                <div className="form-group">
                                <button type="button" className="btn btn-outline-primary btn-block mt-1 form-control"
                                onClick={changeLevel}>{level == 1 ? "Stock Analysis" : "Industry Analysis"}</button>
                                </div>
                            </form>
                             
                            <TimeSeries timeseries={timeseries} /> 
                            <nav class="navbar fixed-bottom item-center navbar-light bg-light">
                            <div class="container-fluid">
                                <a class="navbar-brand mx-auto" href="#">DISCLAIMER: EDUCATIONAL PURPOSES ONLY</a>
                            </div>
                                
                            </nav>
                        </Fragment>

                    )

                }
            </div>
        </div>
    );
};

export default Stocks

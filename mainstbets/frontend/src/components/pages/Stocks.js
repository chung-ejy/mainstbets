import React, {useContext,useEffect,Fragment} from 'react';
import StockContext from '../../context/stock/stockContext';
import Alert from "../alerts/Alert"
// import Sentiment from '../sentiment/Sentiment';
import Form from '../stock/Form';
import TimeSeries from '../stock/TimeSeries';
import Stock from '../stock/Stock'
const Stocks = () => {
    const stockContext = useContext(StockContext)
    const {loading,getSectors,getTimeSeries,title,timeseries,sectors,stock} = stockContext;
    useEffect(() => {
        getTimeSeries()
        // getSectors()
    },//eslint-disable-next-line
    []
    );
    return (
        <div className="card mt-4">
            <div className="card-body align-content-center justify-content-center">
                {loading || title.size < 1 ? (
                    <div className="container justify-content-center">
                        <h3 className="text-center">
                            <i className="fas fa-spinner text-primary fa-7x"></i>
                        </h3>
                        <h3 className="text-center mt-3">
                            {"???"}
                        </h3>
                    </div>) : (
                        <Fragment>
                            <Alert />
                            {/* <h1 className="card-ticker text-center mx-2">
                            {ticker[0].toUpperCase() + ticker.slice(1)}
                            </h1> */}
                            <Stock data={stock}/>
                            <Form />
                            <TimeSeries timeseries={timeseries} />
                            <h3 className="text-center mx-2">
                                Input a SP500 ticker
                            </h3>
                        </Fragment>

                    )

                }
            </div>
        </div>
    );
};

export default Stocks

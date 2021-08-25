import React, { useContext,useState } from 'react'
import StockContext from '../../context/stock/stockContext'

const TimeSeries = ({timeseries}) => {
    const stockContext = useContext(StockContext)
    const {loading} = stockContext
    return (
        <div className="card card-body mt-4 mb-4">
            {/* <h5 class="card-title text-center mb-1">
                {"Today"}
            </h5> */}
            <table className="table table-responsive-sm">
                <tbody>
                    <tr>
                        <th>Date</th>
                        <th>Ticker</th>
                        <th>Adj Close</th>
                        <th>Rolling 100</th>
                        <th>Gainz</th>
                    </tr>
                {loading ? <tr></tr> : timeseries.map(stock => (
                    <tr>
                    {Object.keys(stock).map(k => (
                        <td>{stock[k]}</td>
                    ))}
                </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default TimeSeries

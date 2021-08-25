import React, { useContext,useState, Fragment } from 'react'
// import StockContext from '../../context/stock/stockContext'

const Stock = ({data}) => {

    return (
        <div className="card card-body mt-4 mb-4">
            {data.length == 0 ? <div></div> :
            <div>
            <h5 class="card-title text-center mb-1">
            {data[0].ticker}
            </h5>
            <h5 class="card-title text-center mb-1">
            {data.length}
            </h5>
            <table className="table table-responsive-sm">
                <tbody>
                    {data.map(s => {
                        {Object.keys(s).map(key => {
                            <tr>
                            <td>key</td>
                            <td>{s[key]}</td>
                        </tr>
                        })}

                    })}
                </tbody>
            </table>
            </div>    
            }
        </div>
    )
}

export default Stock

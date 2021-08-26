import React, { useContext,useState, Fragment } from 'react'
import StockContext from '../../context/stock/stockContext'
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory'
const Stock = ({data,sectors,timeseries}) => {

    return (
        <div className="card card-body mt-4 mb-4">
            {data.length < 1 ? <div></div> :
            <Fragment>
            <h5 class="card-title text-center mb-1">
            {data[0]["Security"]}
            </h5>

            <VictoryChart
                // theme={VictoryTheme.material}
                >
                <VictoryLine
                    style={{
                    data: { stroke: "#c43a31" },
                    parent: { border: "1px solid #ccc"}
                    }}
                    data={data}
                    y="adjClose"
                />
                <VictoryLine
                    style={{
                    data: { stroke: "blue" },
                    parent: { border: "1px solid #ccc"}
                    }}
                    samples={50}
                    data={data}
                   
                    y="rolling"
                />
                </VictoryChart>
                <table>
                    <tbody>
                    {["Symbol"
                    ,"Security"
                    ,"GICS Sector"
                ].map(
                        column => (
                        <tr>
                            <td>{column}</td>
                            <td>{sectors.filter(s => s["Symbol"] == data[0]["ticker"])[0][column]}</td>
                        </tr>
                        )
                    )}
                    {["rolling","adjClose","gain"].map(
                        col => (
                            <tr>
                            <td>{col}</td>
                            <td>{timeseries.filter(ts => ts["ticker"]==data[0]["ticker"])[0][col]}</td>
                        </tr>
                        )
                    )}
                    <tr>
                            <td>length</td>
                            <td>{timeseries.length}</td>
                        </tr>
                    </tbody>
                </table>
                </Fragment>
            }
        </div>
    )
}

export default Stock

import React, { useContext,useState, Fragment } from 'react'
// import StockContext from '../../context/stock/stockContext'
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory'
const Stock = ({data}) => {

    return (
        <div className="card card-body mt-4 mb-4">
            {data.length < 1 ? <div></div> :
            <Fragment>
            <h5 class="card-title text-center mb-1">
            {data[0].ticker}
            </h5>
            <h5 class="card-title text-center mb-1">
            {data[0]["GICS Sector"]}
            </h5>
            <VictoryChart
                // theme={VictoryTheme.material}
                >
                <VictoryLine
                    style={{
                    data: { stroke: "#c43a31" },
                    parent: { border: "1px solid #ccc"}
                    }}
                    samples={50}
                    data={data}
                    // x="date"
                    y="adjClose"
                    // scale={{ x: "time" }}
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
                </Fragment>
            }
        </div>
    )
}

export default Stock

import React, { useContext,useState, Fragment } from 'react'
import StockContext from '../../context/stock/stockContext'
import { VictoryScatter, VictoryChart, VictoryTheme, VictoryZoomContainer, VictoryLegend, VictoryLabel, VictoryTooltip } from 'victory'
const Sector = ({sector}) => {
    const [state,setState] = useState({"zoomDomain":{"x":[0,Math.max(...sector.map(s =>s["adjClose"]))]}})
    const handleZoom = (domain) => {
        setState({...state,["zoomDomain"]:domain})
    }
    return (
        <div className="card card-body mt-4 mb-4">
            {sector.length < 1 ? <div></div> :
            <Fragment>
            <h5 class="card-title text-center mb-1">
            {sector[0]["GICS Sector"]}
            </h5>

            <VictoryChart
            containerComponent={<VictoryZoomContainer
                zoomDimension="x"
                zoomDomain={state.zoomDomain}
                onZoomDomainChange={handleZoom.bind(this)}
                />}
                >
                <VictoryScatter
                    style={{
                    data: { fill: ({datum}) => datum.gain  > 0 ? "green" : "red" },
                    parent: { border: "1px solid #ccc"}
                    }}
                    symbol={({ datum }) => datum.gain > 0 ? "triangleUp" : "triangleDown"}
                    labels={({datum}) => [datum.ticker,datum.gain]}
                    labelComponent={
                        <VictoryTooltip/>
                      }
                    // samples={50}
                    data={sector}
                    y="gain"
                    x="adjClose"
                    scale={{"x":"linear","y":"linear"}}
                />
                </VictoryChart>
                </Fragment>
            }
        </div>
    )
}

export default Sector

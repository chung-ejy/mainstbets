import React, { useContext,useState, Fragment } from 'react'
import StockContext from '../../context/stock/stockContext'
import { VictoryScatter, VictoryChart, VictoryTheme, VictoryZoomContainer, VictoryLegend, VictoryLabel, VictoryTooltip } from 'victory'
const Sector = ({sector}) => {
    const [state,setState] = useState({"zoomDomain":{"x":[0,5000]}})
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
                theme={VictoryTheme.material}>
                <VictoryScatter
                    style={{
                    data: { stroke: "navy   " },
                    parent: { border: "1px solid #ccc"}
                    }}
                    labels={({datum}) => datum.ticker}
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

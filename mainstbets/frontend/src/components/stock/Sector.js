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
                theme={VictoryTheme.material}
                // containerComponent={
                //     <VictoryZoomContainer
                //     zoomDimension="x"
                //     zoomDomain={state.zoomDomain}
                //     onZoomDomainChange={handleZoom.bind(this)}
                //     />
                // }
                >
                {/* <VictoryLine
                    style={{
                    data: { stroke: "maroon" },
                    parent: { border: "1px solid #ccc"}
                    }}
                    data={data.map(d => ({...d,["date"]: Date.parse(d["date"])}))}
                    y="adjClose"
                    x="date"
                    scale={{"x":"time","y":"linear"}}
                /> */}
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
                {/* <div className="row"><div className="col" style={{color:"maroon"}}>Rolling</div><div style={{color:"navy"}}>Adj Close</div></div> */}
                {/* <table>
                    <tbody>
                    {["GICS Sector"
                ].map(
                        column => (
                        <tr>
                            <td>{column}</td>
                            <td>{sectors.filter(s => s["Symbol"] == data[0]["ticker"])[0][column]}</td>
                        </tr>
                        )
                    )}

                    <tr>
                        <td style={{color:"maroon"}}>{"rolling"}</td>
                        <td style={{color:"maroon"}}>{timeseries.filter(ts => ts["ticker"]==data[0]["ticker"])[0]["rolling"]}</td>
                    </tr>
                    <tr>
                        <td style={{color:"navy"}}>{"adjClose"}</td>
                        <td style={{color:"navy"}}>{timeseries.filter(ts => ts["ticker"]==data[0]["ticker"])[0]["adjClose"]}</td>
                    </tr>
                    <tr>
                        <td style={{color:`${timeseries.filter(ts => ts["ticker"]==data[0]["ticker"])[0]["gain"] > 0 ? "green" : "red"}`}}>{"gain"}</td>
                        <td style={{color:`${timeseries.filter(ts => ts["ticker"]==data[0]["ticker"])[0]["gain"] > 0 ? "green" : "red"}`}}>{timeseries.filter(ts => ts["ticker"]==data[0]["ticker"])[0]["gain"]}</td>
                    </tr>
                    </tbody>
                </table> */}
                </Fragment>
            }
        </div>
    )
}

export default Sector

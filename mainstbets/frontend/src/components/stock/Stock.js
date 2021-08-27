import React, { useState, Fragment } from 'react'
import { VictoryLine, VictoryChart,VictoryZoomContainer} from 'victory'
const Stock = ({data,sectors,timeseries}) => {
    const [state,setState] = useState({"zoomDomain":{"x":[new Date(2017,1,1),Date.now()]}})
    const handleZoom = (domain) => {
        setState({...state,["zoomDomain"]:domain})
    }
    return (
        <div className="card card-body mt-4 mb-4">
            {data.length < 1 ? <div></div> :
            <Fragment>
            <h5 class="card-title text-center mb-1">
            {data[0]["Security"]}
            </h5>

            <VictoryChart
                containerComponent={<VictoryZoomContainer
                    zoomDimension="x"
                    zoomDomain={state.zoomDomain}
                    onZoomDomainChange={handleZoom.bind(this)}
                    />
                }
                >
                <VictoryLine
                    style={{
                    data: { stroke: "maroon" },
                    parent: { border: "1px solid #ccc"}
                    }}
                    data={data.map(d => ({...d,["date"]: Date.parse(d["date"])}))}
                    y="adjClose"
                    x="date"
                    scale={{"x":"time","y":"linear"}}
                />
                <VictoryLine
                    style={{
                    data: { stroke: "navy   " },
                    parent: { border: "1px solid #ccc"}
                    }}
                    // samples={50}
                    data={data.map(d => ({...d,["date"]: Date.parse(d["date"])}))}
                    y="rolling"
                    x="date"
                    scale={{"x":"time","y":"linear"}}
                />
                </VictoryChart>
                {/* <div className="row"><div className="col" style={{color:"maroon"}}>Rolling</div><div style={{color:"navy"}}>Adj Close</div></div> */}
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
                </table>
                </Fragment>
            }
        </div>
    )
}

export default Stock

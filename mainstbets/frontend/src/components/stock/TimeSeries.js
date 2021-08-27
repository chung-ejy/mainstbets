import React, { useContext,useState } from 'react'
import StockContext from '../../context/stock/stockContext'

const TimeSeries = ({timeseries}) => {
    const stockContext = useContext(StockContext)
    const {loading,getStock} = stockContext
    const [state,setState] = useState({"page":0,"ticker":"","search":"ticker","GICS Sector":"","Security":"","sort":"","order":1})
    const onChange = (e) => {
        e.preventDefault()
        setState({...state,[e.target.name]:e.target.value,["search"]:e.target.name})
    }
    const onClick = (e) => {
        e.preventDefault()
        getStock({"ticker":e.target.id})
    }
    const defineSort = (e) => {
        e.preventDefault()
        console.log(e.target.id)
        setState({...state,["sort"]:e.target.id,["order"]:order*-1,["page"]:0})
    }
    const createRow =(stock) => {
        return (<tr>
                {Object.keys(stock).map(k => (
                    k == "GICS Sector" || k == "Security" 
                    ? <td className="d-none d-md-table-cell" id={stock[k]} onClick={onClick}>{stock[k]}</td> 
                    : <td id={stock[k]} onClick={onClick}>{stock[k]}</td>
                ))}
            </tr>)
    } 
    const {page,ticker,sort,order,sector,security,search} = state
    return (
        <div className="card card-body mt-4 mb-4">
            {/* <h5 class="card-title text-center mb-1">
                {Date.now()}
            </h5> */}
            <table className="table table-responsive-sm">
                <tbody>
                    <tr>
                        <th className="d-none d-md-table-cell">            
                            <form>
                            <div className="form-group-inline">
                                <input style={{border:0
                                            ,fontFamily:"inherit"
                                            ,padding:0
                                            ,background:"inherit"
                                        ,outline:"none"}}onChange={onChange} className="form-control" 
                                name="GICS Sector" placeholder="GICS Sector" type="text" value={sector} />
                            </div>
                            </form>
                        </th>
                        <th>            
                            <form className="d-none d-md-table-cell">
                            <div className="form-group-inline">
                                <input style={{border:0
                                            ,fontFamily:"inherit"
                                            ,padding:0
                                            ,background:"inherit"
                                        ,outline:"none"}}onChange={onChange} className="form-control" 
                                name="Security" placeholder="Security" type="text" value={security} />
                            </div>
                            </form>
                        </th>
                        <th>            
                            <form>
                            <div className="form-group-inline">
                                <input style={{border:0
                                            ,fontFamily:"inherit"
                                            ,padding:0
                                            ,background:"inherit"
                                        ,outline:"none"}}onChange={onChange} className="form-control" 
                                name="ticker" placeholder="Ticker" type="text" value={ticker} />
                            </div>
                            </form>
                        </th>
                        <th id="adjClose" onClick={defineSort}>Adj Close</th>
                        <th id="rolling" onClick={defineSort}>Rolling 100</th>
                        <th id="gain" onClick={defineSort}>Gain</th>
                    </tr>
                {loading ? <tr></tr> : timeseries.filter(ts => ts[search].includes(state[search])).length == 0 
                        ?  timeseries.sort((a,b) => (a[sort] - b[sort]) * order).slice(Number(page)*10,(Number(page)+1)*10).map(stock => createRow(stock)) 
                        : timeseries.sort((a,b) => (a[sort] - b[sort]) * order).filter(ts => ts[search].includes(state[search])).slice(Number(page)*10,(Number(page)+1)*10).map(stock => createRow(stock))
                        }
                </tbody>
            </table>
            <form>
            <div className="form-group">
                <input onChange={onChange} className="form-control" 
                name="page" placeholder={0} type="number" min={0} max={50} value={state.page} />
            </div>
            <h5 class="card-title text-center mb-1">
                    {`${page*10} to ${(page+1)*10}`}
            </h5>
            </form>
        </div>
    )
}

export default TimeSeries

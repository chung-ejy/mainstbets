import React, { useContext,useState } from 'react'
import StockContext from '../../context/stock/stockContext'

const TimeSeries = ({timeseries}) => {
    const stockContext = useContext(StockContext)
    const {loading} = stockContext
    const [state,setState] = useState({"page":0})
    const onChange = (e) => {
        e.preventDefault()
        setState({...state,[e.target.name]:Number(e.target.value)})
    }
    const {page} = state
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
                {loading ? <tr></tr> : timeseries.slice(page*10,(page+1)*10).map(stock => (
                    <tr>
                    {Object.keys(stock).map(k => (
                        <td>{stock[k]}</td>
                    ))}
                </tr>
                ))}
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

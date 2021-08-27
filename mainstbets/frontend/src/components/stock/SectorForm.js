import React, { useContext,useState } from 'react'
import StockContext from '../../context/stock/stockContext'

const SectorForm = () => {
    const stockContext = useContext(StockContext)
    const {setError,getSector,timeseries} = stockContext
    const [state,setState] = useState({sector:""})
    const onChange = (e) => {
        console.log(state)
        setState({...state,[e.target.name]:e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault()
        getSector(state)
        setState({sector:""})
    }
    const sector_list = new Set(timeseries.map(sec => sec["GICS Sector"]))
    const sl = Array.from(sector_list)
    return (
            <form onSubmit={onSubmit}>
                <select class="form-select" onChange={onChange} name="sector" multiple aria-label="multiple select example">
                    {sl.map(s => (
                        <option name="sector" value={s}>{s}</option>
                    ))}
                </select>
                <div className="form-group">
                    <button type="submit" class="btn btn-primary form-control">Predict</button>
                </div>
            </form>
    )
}

export default SectorForm

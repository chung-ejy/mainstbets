import React, { useContext,useState } from 'react'
import StockContext from '../../context/stock/stockContext'

const Form = () => {
    const stockContext = useContext(StockContext)
    const {setError,getStock,sectors} = stockContext
    const [state,setState] = useState({ticker:""})
    const onChange = (e) => {
        setState({...state,[e.target.name]:e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault()
        getStock(state)
        setState({ticker:""})
    }

    const  {ticker} = state;
    return (
            <form onSubmit={onSubmit}>
                <select class="form-select" onChange={onChange} name="ticker" multiple aria-label="multiple select example">
                    {sectors.map(sector => (
                        <option name="ticker" value={sector.Symbol}>{sector.Symbol}</option>
                    ))}
                </select>
                {/* <div className="form-group">
                    <input onChange={onChange} className="form-control" 
                    name="ticker" placeholder="ticker" type="text" value={ticker} />
                </div> */}
                <div className="form-group">
                    <button type="submit" class="btn btn-primary form-control">Predict</button>
                </div>
            </form>
    )
}

export default Form

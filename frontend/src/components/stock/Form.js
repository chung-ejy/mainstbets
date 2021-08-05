import React, { useContext,useState } from 'react'
import StockContext from '../../context/stock/stockContext'

const Form = ({prediction}) => {
    const stockContext = useContext(StockContext)
    const {setError,getPrediction} = stockContext
    const [state,setState] = useState({ticker:""})
    const onChange = (e) => {
        setState({...state,[e.target.name]:e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault()
        getPrediction(state)
        setState({ticker:""})
    }

    const  {ticker} = state;
    return (
        <div className="card card-body mt-4 mb-4">
            <h5 class="card-title text-center mb-1">
                {prediction.ticker}
            </h5>
            <table className="table table-responsive-sm">
                <tbody>
                    <tr>
                        <td>Prediction</td>
                        <td>{prediction.prediction}</td>
                    </tr>
                    <tr>
                        <td>AdjClose</td>
                        <td>{prediction.adjClose}</td>
                    </tr>
                    <tr>
                        <td>Score</td>
                        <td>{prediction.score}</td>
                    </tr>
                </tbody>
            </table>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input onChange={onChange} className="form-control" 
                    name="ticker" placeholder="ticker" type="text" value={ticker} />
                </div>
                <div className="form-group">
                    <button type="submit" class="btn btn-primary form-control">Predict</button>
                </div>
            </form>
        </div>
    )
}

export default Form

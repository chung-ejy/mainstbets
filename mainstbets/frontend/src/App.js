import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import StockState from './context/stock/StockState'
import Header from './components/layout/Header'
import Stocks from './components/pages/Stocks'
import Alert from './components/alerts/Alert'
export const App = () => {
    return (
        <StockState>
            <Header />
            <Alert />
            <div className="container-sm align-middle">
                <Stocks/>
            </div>
        </StockState>
    )
}

ReactDOM.render(<App />, document.getElementById("app"))
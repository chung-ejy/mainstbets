import React, { useContext } from "react";
import StockContext from "../../context/stock/stockContext"

const Alert = () => {
    const stockContext = useContext(StockContext)
    const { error } = stockContext
    return (
        error !== null && (
            <div className="alert alert-danger mt-2" role="alert">
                {error.msg}
            </div>
        )
    )
}

export default Alert
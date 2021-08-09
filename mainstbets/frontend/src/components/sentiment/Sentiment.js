import React from 'react'

const Sentiment = ({prediction}) => {
    let color = prediction.delta >= 0 ? "success" : "danger"
    return (
        <div className="container justify-content-center">
            <h3 className="text-center">
                <i className={`fas fa-${prediction.delta >=0 ? "angle-double-up": "angle-double-down"
                } text-${color} fa-7x`} />
            </h3>
            <h1 className={`text-center mt-3`}>
                {/* {"prediction: "} */}
                <span className={`text-${color}`}>
                    {`${prediction.delta}%`}
                </span>
            </h1>
        </div>
    )
}

export default Sentiment

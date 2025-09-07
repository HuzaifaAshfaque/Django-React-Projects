import React from 'react'
import { Link } from 'react-router-dom'


const GoingToHome = () => {

    return (
        <div style={{ position: "fixed", top: "10px", right: "20%" }}>
            <Link to="/" style={{ color: "white" }}>
                Home
            </Link>
        </div>

    )
}

export default GoingToHome
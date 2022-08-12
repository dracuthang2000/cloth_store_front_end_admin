import { Alert, AlertTitle } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import './Error.css';
const Error = () => {
    return (
        <div className="error-container">
            <img
                src={'https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png'}
                alt='' />
            <Link to="/" className="link-home">
                Go Home
            </Link>
        </div>
    )
}
export default Error;
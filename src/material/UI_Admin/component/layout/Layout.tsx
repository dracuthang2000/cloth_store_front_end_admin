import React from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../NavBar/SideBar";
import { Outlet } from "react-router-dom";
import './Layout.css'
const Layout = (props: any) => {
    return (
        <div className="layout">
            <div style={{ width: '200px' }}>
                <SideBar />
            </div>
            <div className="layoutContainer">
                <div style={{ height: '50px', width: '750px' }}>
                    <NavBar />
                </div>
                <div className="children">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default Layout;
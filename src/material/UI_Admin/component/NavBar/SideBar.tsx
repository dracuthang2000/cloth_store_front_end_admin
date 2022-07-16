import React, { useState } from 'react';
import './SideBar.css'
import {
    Dashboard
    , PersonOutlineOutlined
    , CreditCard
    , Store
    , LocalShipping
    , AccountCircleOutlined
    , ExitToAppOutlined
    , ArrowDropDown
    , ArrowDropUp
} from '@mui/icons-material'
import Dropdown from '../Dropdown/DropdownProduct';
const SideBar = () => {
    const [dropdownProduct, setDropdownProduct] = useState(false);
    const handleClickDropDownProduct = () => {
        setDropdownProduct(!dropdownProduct);
    }
    return (
        <div className='sideBar'>
            <div className='top'>
                <span className='logo'>Clothing store</span>
            </div>
            <hr />
            <div className='center'>
                <ul>
                    <p className='title'>MAIN</p>
                    <li>
                        <Dashboard className='icon' />
                        <span>Dashboard</span>
                    </li>
                    <p className='title'>LISTS</p>
                    <li>
                        <PersonOutlineOutlined className='icon' />
                        <span>Users</span>
                    </li>
                    <li onClick={handleClickDropDownProduct}>
                        <Store className='icon' />
                        <span>Products</span>
                        {dropdownProduct ? <ArrowDropUp className='icon dropdown-icon' /> : <ArrowDropDown className='icon dropdown-icon' />}
                    </li>
                    {dropdownProduct ? <Dropdown /> : <></>}
                    <li>
                        <CreditCard className='icon' />
                        <span>Orders</span>
                    </li>
                    <li>
                        <LocalShipping className='icon' />
                        <span>Delivery</span>
                    </li>
                    <p className='title'>USER</p>
                    <li>
                        <AccountCircleOutlined className='icon' />
                        <span>Profiles</span>
                    </li>
                    <li>
                        <ExitToAppOutlined className='icon' />
                        <span>Log out</span>
                    </li>
                </ul>
            </div>
            <div className='bottom'>
                <div className="colorOption"></div>
                <div className="colorOption"></div>
            </div>
        </div>
    )
}
export default SideBar;
import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
const SideBar = () => {
    const navigate = useNavigate();
    const [dropdownProduct, setDropdownProduct] = useState(false);
    const [dropDownOrder, setDropdownOrder] = useState(false);
    var item = document.getElementsByTagName('li');
    const handleClickDropDownProduct = () => {
        setDropdownProduct(!dropdownProduct);
    }
    useEffect(() => {
        for (var i = 0; i < item.length; i++) {
            item[i].addEventListener('click', function () {
                var current = document.getElementsByClassName('active');
                current[0].className = current[0].className.replace('active', ' ');
                this.className += 'active';
            })
        }
    }, [dropdownProduct, dropDownOrder])

    const handleDropdownOrder = () => {
        setDropdownOrder(!dropDownOrder);
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
                    <li className='active'>
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
                    <li onClick={() => navigate("/order")}>
                        <CreditCard className='icon' />
                        <span>Orders</span>
                    </li>
                    <li onClick={handleDropdownOrder}>
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
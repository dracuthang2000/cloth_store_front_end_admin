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
    , Summarize
} from '@mui/icons-material'
import Dropdown from '../Dropdown/DropdownProduct';
import { useNavigate } from 'react-router-dom';
import Axios from '../../../Axios';
const SideBar = (props: any) => {
    const navigate = useNavigate();
    const [dropdownProduct, setDropdownProduct] = useState(false);
    const [dropDownOrder, setDropdownOrder] = useState(false);
    const [staff, setStaff] = useState({ role: { id: 0 } } as any)
    var item = document.getElementsByTagName('li');
    const handleClickDropDownProduct = () => {
        setDropdownProduct(!dropdownProduct);
    }
    useEffect(() => {
        Axios.get(`admin/information/me`, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
            }
        })
            .then((res) => {
                setStaff(res.data);
            }).catch((e) => {
                console.log(e);
            })
    }, [])
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
                    {staff.role.id === 2 && <><p className='title'>MAIN</p>
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
                        </li></>}
                    {staff.role.id === 3 && <> <li onClick={() => navigate('/delivery')}>
                        <LocalShipping className='icon' />
                        <span>Delivery</span>
                    </li></>}
                    {staff.role.id === 2 && <><p className='title'>Report</p>
                        <li onClick={() => navigate("/report")}>
                            <Summarize className='icon' />
                            <span>Report</span>
                        </li></>}
                    <p className='title'>USER</p>
                    <li>
                        <AccountCircleOutlined className='icon' />
                        <span>Profiles</span>
                    </li>
                    <li onClick={() => {
                        sessionStorage.removeItem('accessToken');
                        navigate('/login');
                    }}>
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
import React, { useEffect, useState } from "react";
import {
    EmailOutlined,
    HomeOutlined,
    SmartphoneOutlined,
    HelpOutlineOutlined,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import './OrderDetail.css';
import Axios from "../../../Axios";
import { useParams } from 'react-router-dom';


const DeliveryDetailItem = (props: any) => {
    return (
        <div className="detail">
            <div className="product-detail">
                <div className="img-product-detail">
                    <img src={`http://localhost:8081/api/product/image/load/${props.item.product_color_size.color.img}`}></img>
                </div>
                <div className="product">
                    <div className="product-name">{props.item.product_color_size.color.product.product_name}</div>
                    <div className="product-classification">Product classification:
                        {props.item.product_color_size.color.color.color},
                        Size {props.item.product_color_size.size.size}</div>
                </div>
            </div>
            <div className="price-detail">
                <span>{Intl.NumberFormat().format(props.item.unit_price)}</span>
            </div>
            <div className="quantity-detail">
                <div>{props.item.quantity}</div>
            </div>
            <div className="total-temp-detail">
                <span style={{ display: 'flex', justifyContent: 'right' }}>{Intl.NumberFormat().format(props.item.quantity * props.item.unit_price)}</span>
            </div>
        </div>
    )
}

const OrderDetail = () => {
    const { id_bill } = useParams();
    const bill = {
        id: '',
        date: '',
        note: '',
        total: 0,
        state: '',
        receiver: {
            first_name: '',
            last_name: '',
            phone_number: '',
            address: '',
            mail: ''
        },
        bill_product_details: [
            {
                id: '',
                quantity: 0,
                version: 0,
                unit_price: 1000,
                product_color_size: {
                    id: '',
                    size: {
                        size: '',
                    },
                    color: {
                        color: {
                            color: '',
                        },
                        product: {
                            id: '',
                            description: '',
                            product_name: '',
                            stuff: '',
                            label: '',
                            gender: '',
                            brand: '',
                        },
                        img: ''
                    }
                }
            },
        ],
        id_customer: ''
    }
    const [billDetail, setBillDetail] = useState(bill);
    const location = useLocation();
    let state = location.state as any;

    useEffect(() => {
        Axios.get(`bill/get-bill-by-id/${id_bill}`)
            .then((res) => {
                let billDetailTemp = res.data;
                console.log(billDetailTemp);
                setBillDetail(billDetailTemp);
            }).catch(error => {
                console.log(error);
            })
    }, [])
    return (
        <div className="order-detail">
            <div className="header-order">
                <div className="infor-customer">
                    <div className="notify-state">
                        <div style={{ display: 'flex', fontSize: '19px', fontWeight: '300' }}>Order id: {billDetail.id} - <span style={{ paddingLeft: '5px', fontWeight: '500' }}>
                            {billDetail.state === 'PRO' ? 'PROCESSING' :
                                billDetail.state === 'FIN' ? 'FINISHING' :
                                    billDetail.state === 'DEL' ? 'DELIVERING' :
                                        'CANCELING'}
                        </span></div>
                        <div>Date order: {billDetail.date}</div>
                    </div>
                    <div className="name" style={{ fontWeight: '500' }}><HelpOutlineOutlined className="icon" /><span>{billDetail.receiver.last_name}{" "}{billDetail.receiver.first_name}</span></div>
                    <div className="phoneNumber"><SmartphoneOutlined className="icon" /><span>{billDetail.receiver.phone_number}</span></div>
                    <div className="address"><HomeOutlined className="icon" /><span>{billDetail.receiver.address}</span></div>
                    <div className="mail"><EmailOutlined className="icon" /><span>{billDetail.receiver.mail}</span></div>
                </div>
            </div>
            <div className="main-order">
                <div className="top-order">
                    <div className="navNar-detail">
                        <div className="product-title">
                            <div></div>
                            <div>Product</div>
                            <div></div>
                        </div>
                        <div className="price-title">
                            <div></div>
                            <div>Price</div>
                            <div></div>
                        </div>
                        <div className="quantity-title">
                            <div></div>
                            <div>Quantity</div>
                            <div></div>
                        </div>
                        <div className="total-temp-title">
                            <div></div>
                            <div style={{ display: 'flex', justifyContent: 'right' }}>Total-temp</div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div className="center-order">
                    {billDetail.bill_product_details.map((item: any) => (
                        <DeliveryDetailItem key={item.id} item={item} />)
                    )}
                </div>
                <div className="bottom-order">
                    <div className="end-line">
                        <div className="total-title">Total</div>
                        <div className="total-price"><span>{Intl.NumberFormat().format(billDetail.total)}</span></div>
                    </div>
                </div>
            </div>
            <div className="footer-order">
                <div className="link-back">
                    <Link to={"/order"}>Return your order</Link>
                </div>
            </div>
        </div>
    )
}
export default OrderDetail;
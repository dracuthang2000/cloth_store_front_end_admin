import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PDFExport } from "@progress/kendo-react-pdf";

import './ReportReceipt.css';
import { useParams } from 'react-router-dom';
import Axios from '../../../Axios';
import { da } from 'date-fns/locale';
const ReportReceipt = () => {
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
                            material: {
                                material_name: ''
                            },
                            label: {
                                label: ''
                            },
                            gender: {
                                gender: ''
                            },
                            brand: {
                                brand: ''
                            },
                        },
                        img: ''
                    }
                }
            },
        ],
        id_customer: ''
    }
    const [staff, setStaff] = useState('' as any);
    const [billDetail, setBillDetail] = useState(bill);
    const pdfExportComponent = React.useRef<PDFExport>(null);
    const generatePdf = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();

        }
    }
    useEffect(() => {
        Axios.get(`bill/get-bill-by-id/${id_bill}`)
            .then((res) => {
                let billDetailTemp = res.data;
                setBillDetail(billDetailTemp);
            }).catch(error => {
                console.log(error);
            })
    }, [])
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
    return (
        <div className='container'>
            <div className='container-receipt'>
                <PDFExport
                    ref={pdfExportComponent}
                    paperSize="auto"
                    margin={50}
                    fileName={`Report for ${new Date().getFullYear()}`}
                    author="KendoReact Team"
                >
                    <table className='table table-borderless' style={{ width: '800px', height: 'auto' }} id='receipt'>
                        <thead>
                            <tr>
                                <td colSpan={5}>
                                    <table className='table table-borderless'>
                                        <tbody>
                                            <tr><td colSpan={5} style={{ textAlign: 'center', fontWeight: '600', fontSize: '24px' }}><span>RECEIPT ORDER</span></td></tr>
                                            <tr style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <td>
                                                    <tr style={{ display: 'flex' }}><h6 style={{ paddingRight: '5px' }}>Bill number:</h6><span>{id_bill}</span></tr>
                                                    <tr style={{ display: 'flex' }}><h6 style={{ paddingRight: '5px' }}>Name:</h6><span>{`${billDetail.receiver.last_name} ${billDetail.receiver.first_name}`}</span></tr>
                                                    <tr style={{ display: 'flex' }}><h6 style={{ paddingRight: '5px' }}>Mail:</h6><span>{billDetail.receiver.mail}</span></tr>
                                                </td>
                                                <td>
                                                    <tr style={{ display: 'flex' }}><h6 style={{ paddingRight: '5px' }}>Date:</h6> <span>{billDetail.date}</span></tr>
                                                    <tr style={{ display: 'flex' }}><h6 style={{ paddingRight: '5px' }}>Phone number:</h6> <span>{billDetail.receiver.phone_number}</span></tr>
                                                    <tr style={{ display: 'flex' }}><h6 style={{ paddingRight: '5px' }}>Address:</h6><span> {billDetail.receiver.address}</span></tr>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <table className='table table-bordered' style={{ padding: '0 5px 0 5px' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%', textAlign: 'center' }}>#</th>
                                            <th style={{ width: '45%', textAlign: 'center' }}>Product</th>
                                            <th style={{ width: '30%', textAlign: 'center' }}>Description</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Quantity</th>
                                            <th style={{ width: '10%', textAlign: 'center' }}>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {billDetail.bill_product_details.map((data, index: number) => (
                                            <tr>
                                                <td className='table-number'>{index + 1}</td>
                                                <td>
                                                    {data.product_color_size.color.product.product_name}
                                                </td>
                                                <td style={{ verticalAlign: 'middle' }}>
                                                    Sản phẩm {data.product_color_size.color.product.label.label} được sản xuất bởi {data.product_color_size.color.product.brand.brand},
                                                    và được làm bằng chất liệu {data.product_color_size.color.product.material.material_name}
                                                </td>
                                                <td className='table-number'>
                                                    {data.quantity}
                                                </td>
                                                <td className='table-number'><span className='price'>{Intl.NumberFormat().format(data.unit_price)}</span></td>
                                            </tr>
                                        ))}


                                        <tr>
                                            <td colSpan={3}>
                                                Total
                                            </td>
                                            <td colSpan={2}>
                                                <span className='price' style={{ width: '100%' }}>{Intl.NumberFormat().format(billDetail.total)}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </tr>
                            <tr style={{ display: 'flex', justifyContent: 'right' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ textAlign: 'center' }}>Creator</span>
                                    <span>{staff.last_name} {staff.first_name}</span>
                                </div>
                            </tr>
                        </tbody>
                    </table>
                </PDFExport>
            </div>
            <div className='btn-container'>
                <Button variant='outlined' onClick={generatePdf}>Export to pdf</Button>
            </div>
        </div>
    )
}

export default ReportReceipt;
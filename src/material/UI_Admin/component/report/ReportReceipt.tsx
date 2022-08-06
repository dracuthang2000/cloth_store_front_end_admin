import { Padding } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import jsPDF from 'jspdf';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

import './ReportReceipt.css';
const ReportReceipt = () => {
    const container = React.useRef<HTMLDivElement>(null);
    const pdfExportComponent = React.useRef<PDFExport>(null);
    const generatePdf = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();

        }
    }
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
                                                    <tr style={{ display: 'flex' }}><h6 style={{ paddingRight: '5px' }}>Bill number:</h6><span>01</span></tr>
                                                    <tr style={{ display: 'flex' }}><h6 style={{ paddingRight: '5px' }}>Name:</h6><span>Nguyễn Quốc Thắng</span></tr>
                                                    <tr style={{ display: 'flex' }}><h6 style={{ paddingRight: '5px' }}>Mail:</h6><span>nguyenquocthangcl@gmail.com</span></tr>
                                                </td>
                                                <td>
                                                    <tr style={{ display: 'flex' }}><h6 style={{ paddingRight: '5px' }}>Date:</h6> <span>16/02/2022</span></tr>
                                                    <tr style={{ display: 'flex' }}><h6 style={{ paddingRight: '5px' }}>Phone number:</h6> <span>0367511826</span></tr>
                                                    <tr style={{ display: 'flex' }}><h6 style={{ paddingRight: '5px' }}>Address:</h6><span> Cam Hải Tây, Cam Lâm, Khánh Hòa</span></tr>
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
                                        <tr>
                                            <td className='table-number'>1</td>
                                            <td>
                                                Những ngày cuối tháng 7
                                            </td>
                                            <td style={{ verticalAlign: 'middle' }}>Quyển sách này dành cho các bạn yêu đọc để....</td>
                                            <td className='table-number'>
                                                5
                                            </td>
                                            <td className='table-number'><span className='price'>{Intl.NumberFormat().format(100000)}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='table-number'>2</td>
                                            <td>
                                                Những ngày cuối tháng 8
                                            </td>
                                            <td style={{ verticalAlign: 'middle' }}>Quyển sách này dành cho các bạn yêu đọc để....</td>
                                            <td className='table-number'>
                                                5
                                            </td>
                                            <td className='table-number'><span className='price'>{Intl.NumberFormat().format(1000000)}</span></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={3}>
                                                Total
                                            </td>
                                            <td colSpan={2}>
                                                <span className='price' style={{ width: '100%' }}>{Intl.NumberFormat().format(1100000)}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </tr>
                            <tr style={{ display: 'flex', justifyContent: 'right' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ textAlign: 'center' }}>Creator</span>
                                    <span>Nguyễn Quốc Thắng</span>
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
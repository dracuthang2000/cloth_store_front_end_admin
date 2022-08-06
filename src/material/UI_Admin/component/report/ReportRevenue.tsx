import React, { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material'
import { Button, Table } from "react-bootstrap";
import './ReportRevenue.css'
import { Search } from "@mui/icons-material";
import moment from "moment";
import Axios from "../../../Axios";
const ReportRevenue = () => {
    const [valueFromDate, setValueFromDate] = useState('');
    const [valueToDate, setValueToDate] = useState('');
    const [showReport, setShowReport] = useState(false);
    const [reportRevenueValue, setReportRevenueValue] = useState([]);
    const handleChangeFromDate = (value: any) => {
        setValueFromDate(value);
    };
    const handleChangeToDate = (value: any) => {
        setValueToDate(value);
    }
    const valid = () => {
        let flag = true;
        if (valueFromDate === '' || valueToDate === '') {
            flag = false;
        } else if (moment(valueFromDate).isAfter(valueToDate)) {
            flag = false;
        }
        return flag;
    }
    const handleClick = () => {
        if (valid()) {
            setShowReport(true);
            getReportFromApi()
        }
    }
    const getReportFromApi = () => {
        Axios.post(``, {
            from_date: moment(valueFromDate).format('YYYY-MM-DD'),
            to_date: moment(valueToDate).format('YYYY-MM-DD')
        })
            .then(res => {
                setReportRevenueValue(res.data)
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="fieldRevenueContainer">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={valueFromDate}
                            onChange={handleChangeFromDate}
                            label='from'
                            inputFormat="MM/dd/yyyy"
                            renderInput={(params: any) => <TextField {...params} />} />
                        <DatePicker
                            value={valueToDate}
                            onChange={handleChangeToDate}
                            label='to'
                            inputFormat="MM/dd/yyyy"
                            renderInput={(params: any) => <TextField {...params} />} />
                        <Button variant="outlined" onClick={handleClick}><Search /></Button>
                    </LocalizationProvider>
                </div>
            </div>
            {showReport ? <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="reportRevenueContainer">
                    <div className="reportRevenueTitle">
                        <div><span>Thống Kê Doanh thu từ ngày {moment(valueFromDate).format('DD/MM/YYYY')} đến ngày {moment(valueToDate).format('DD/MM/YYYY')}</span></div>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Months/Year</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportRevenueValue.map((data: any) =>
                                <tr>
                                    <td>{data.year_month}</td>
                                    <td>{data.total_revenue}</td>
                                </tr>)}
                        </tbody>
                    </Table>
                    <div className="reportRevenueFooter">
                        <div>
                            <span>Ngày: 30/07/2022</span>
                        </div>
                        <div>
                            <span>Nguyễn Quốc Thắng</span>
                        </div>
                    </div>
                </div>
            </div> : <></>}

        </div>
    )
}
export default ReportRevenue;
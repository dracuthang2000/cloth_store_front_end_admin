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
    const initial = { year_month: '8/2022', total_revenue: 85000000 };
    const [valueFromDate, setValueFromDate] = useState('');
    const [valueToDate, setValueToDate] = useState('');
    const [showReport, setShowReport] = useState(false);
    const [reportRevenueValue, setReportRevenueValue] = useState([initial]);
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
        Axios.get(`bill/report/get-report-proceeds`, {
            params: {
                fromDate: moment(valueFromDate).format('YYYY-MM-DD'),
                toDate: moment(valueToDate).format('YYYY-MM-DD')
            }
        })
            .then(res => {
                setReportRevenueValue(res.data)
                console.log(res.data);

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
                        <div><span>Th???ng K?? Doanh thu t??? ng??y {moment(valueFromDate).format('DD/MM/YYYY')} ?????n ng??y {moment(valueToDate).format('DD/MM/YYYY')}</span></div>
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
                                    <td>{data.total}</td>
                                </tr>)}
                        </tbody>
                    </Table>
                    <div className="reportRevenueFooter">
                        <div>
                            <span>Ng??y: 30/07/2022</span>
                        </div>
                        <div>
                            <span>Nguy???n Qu???c Th???ng</span>
                        </div>
                    </div>
                </div>
            </div> : <></>}

        </div>
    )
}
export default ReportRevenue;
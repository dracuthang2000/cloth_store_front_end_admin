import { Label, Search } from "@mui/icons-material";
import './DeliveryView.css'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    TablePagination,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../../Axios";
const DeliverView = (props: any) => {
    const [product, setProduct] = useState([] as any);
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const handleClickConfirm = (data: any) => {
        Axios.get(`order/update-status-finishing`, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
            }, params: {
                id_bill: data.id
            }
        }).then(res => {
            setLoading(!loading);
        }).catch(e => console.log(e))
    }
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => {
        Axios.get(`bill/get-list-order-by-shipper-id`, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
            }
        }).then(res => {
            let temp = res.data;
            console.log('check', temp);
            if (props.state === 'ALL') {
                setProduct(temp.map((data: any) => {
                    return {
                        id: data.id,
                        date: data.date,
                        last_name: data.receiver.last_name,
                        first_name: data.receiver.first_name,
                        address: data.receiver.address,
                        phone_number: data.receiver.phone_number,
                        state: data.state
                    }
                }));
            } else {
                let arr = [] as any;
                arr = temp.filter((data: any) => data.state === props.state);
                setProduct(arr.map((data: any) => {
                    return {
                        id: data.id,
                        date: data.date,
                        last_name: data.receiver.last_name,
                        first_name: data.receiver.first_name,
                        address: data.receiver.address,
                        phone_number: data.receiver.phone_number,
                        state: data.state
                    }
                }))
            }
        }).catch(e => {
            console.log(e);
        })
    }, [loading])
    return (
        <div style={{ width: '160vh', display: 'flex', justifyContent: 'center' }}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600, width: '100%' }}>
                    <Table aria-label="simple-label">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className="screen-search-product">
                                        <TextField label='search' sx={{ width: '300px' }} />
                                        <Button variant="outlined"><Search /></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ width: '5%', textAlign: 'center' }}>Bill number</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}>Date</TableCell>
                                <TableCell sx={{ width: '20%', textAlign: 'center' }}>Name customer</TableCell>
                                <TableCell sx={{ width: '30%', textAlign: 'center' }}>Address</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}>Phone number</TableCell>
                                <TableCell sx={{ width: '15%', textAlign: 'center' }}>Action</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((data: any, index: number) => (
                                    <TableRow key={data.id}>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            {data.id}
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            {data.date}
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            {data.last_name} {data.first_name}
                                        </TableCell>
                                        <TableCell sx={{
                                            verticalAlign: 'middle', textAlign: 'center',
                                        }}>
                                            {data.address}
                                        </TableCell>
                                        <TableCell sx={{
                                            verticalAlign: 'middle', textAlign: 'center'
                                        }}>
                                            {data.phone_number}
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            {data.state === "DEL" ? <Button sx={{ width: 'auto', height: '50px' }} variant="outlined" onClick={() => handleClickConfirm(data)}>Delivered</Button> : <></>}
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle' }}>
                                            <Link className="more-detail" to={`/order/order-detail/${data.id}`}>More....</Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    sx={{
                        div: {
                            '.css-pdct74-MuiTablePagination-selectLabel, .css-levciy-MuiTablePagination-displayedRows': {
                                marginTop: '15px',
                            }
                        }
                    }}
                    count={product.length}
                    rowsPerPage={rowsPerPage}
                    labelDisplayedRows={function defaultLabelDisplayedRows({ from, to, count }) { return `${from}???${to} of ${count !== -1 ? count : `more than ${to}`}`; }}
                    labelRowsPerPage={'Page: '}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div >
    )
}
export default DeliverView;
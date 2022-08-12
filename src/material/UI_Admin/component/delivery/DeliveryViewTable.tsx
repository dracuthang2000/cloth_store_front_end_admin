import { Label, Search } from "@mui/icons-material";
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
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const DeliverView = () => {
    const initial = [{
        id: 1, image: require('../../image/frame.png'), product_name: 'T-shirt blue strong', size: 'S', color: 'red', price: 10000, quantity: 10, address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    }, {
        id: 2, image: require('../../image/frame.png'), product_name: 'T-shirt blue strong', size: 'S', color: 'yellow', price: 10000, quantity: 10, address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    }, {
        id: 3, image: require('../../image/frame.png'), product_name: 'T-shirt blue strong', size: 'S', color: 'blue', price: 10000, quantity: 10, address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    }, {
        id: 4, image: require('../../image/frame.png'), product_name: 'T-shirt blue strong', size: 'S', color: 'black', price: 10000, quantity: 10, address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    },
    {
        id: 5, image: require('../../image/frame.png'), product_name: 'T-shirt blue strong', size: 'S', color: 'brown', price: 10000, quantity: 10, address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    },
    {
        id: 6, image: require('../../image/frame.png'), product_name: 'T-shirt blue strong', size: 'S', color: 'green', price: 10000, quantity: 10, address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    },
    {
        id: 7, image: require('../../image/frame.png'), product_name: 'T-shirt blue strong', size: 'S', color: 'white', price: 10000, quantity: 10, address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    },
    {
        id: 8, image: require('../../image/frame.png'), product_name: 'T-shirt blue strong', size: 'S', color: 'dark gray', price: 10000, quantity: 10, address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    },
    {
        id: 9, image: require('../../image/frame.png'), product_name: 'T-shirt blue strong', size: 'S', color: 'gray', price: 10000, quantity: 10, address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    },
    {
        id: 10, image: require('../../image/frame.png'), product_name: 'T-shirt blue strong', size: 'S', color: 'light blue', price: 10000, quantity: 10, address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    },
    {
        id: 11, image: require('../../image/frame.png'), product_name: 'T-shirt blue strong', size: 'S', color: 'dark blue', price: 10000, quantity: 10, address: 'Tan Hai, Cam Hai Tay, Cam Lam, Khanh Hoa', phone_number: '0367511826', full_name: 'Nguyễn Quốc Thắng'
    }
    ];
    const [product, setProduct] = useState(initial);
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleClickConfirm = (data: any) => {

    }
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
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
                                <TableCell sx={{ width: '25%', textAlign: 'center' }}>Name customer</TableCell>
                                <TableCell sx={{ width: '30%', textAlign: 'center' }}>Address</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}>Phone number</TableCell>
                                <TableCell sx={{ width: '20%', textAlign: 'center' }}>Action</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((data, index: number) => (
                                    <TableRow key={data.id}>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            {page * rowsPerPage + index + 1}
                                        </TableCell>
                                        {/* <TableCell sx={{ verticalAlign: 'middle', display: 'flex', gap: '5px' }}>
                                            <div>
                                                <img style={{ width: '80px', height: '100px' }} src={data.image} alt='' />
                                            </div>
                                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ height: 'auto' }}>
                                                    {data.product_name}
                                                </span>
                                                <span style={{ height: 'auto' }}>
                                                    {`Color: ${data.color}, size: ${data.size}`}
                                                </span>
                                                <span style={{ height: 'auto' }}>
                                                    {`X ${data.quantity}`}
                                                </span>
                                                <span style={{
                                                    height: 'auto'
                                                }} >
                                                    {`${Intl.NumberFormat().format(data.price)}đ`}
                                                </span>
                                            </div>
                                        </TableCell> */}
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            {data.full_name}
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
                                        <TableCell sx={{ verticalAlign: 'middle', display: 'flex', justifyContent: 'center' }}>
                                            <Button sx={{ width: 'auto' }} variant="outlined" onClick={() => handleClickConfirm(data)}>Delivered</Button>
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle' }}>
                                            <Link to={'#'}>More....</Link>
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
                    labelDisplayedRows={function defaultLabelDisplayedRows({ from, to, count }) { return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`; }}
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
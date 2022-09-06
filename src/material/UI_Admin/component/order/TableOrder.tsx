import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import { Select, FormControl, InputLabel, MenuItem, Button, Tooltip } from '@mui/material';
import { Close, Done } from '@mui/icons-material';
import Axios from "../../../Axios";
import './TableOrder.css';

interface Column {
    id: 'username' | 'bill_number' | 'shipper' | 'date' | 'action' | 'more';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'bill_number', label: 'Bill\u00a0number', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 150 },
    { id: 'username', label: 'Customer username', minWidth: 150 },
    {
        id: 'shipper',
        label: 'Shipper',
        minWidth: 230,
        align: 'center',
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'more',
        label: '',
        minWidth: 100,
        align: 'center',
    },
];

interface Data {
    username: string;
    bill_number: string;
    shipper: string;
    date: string;
}


export default function TableOrder(props: any) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [product, setProduct] = React.useState<Partial<Data>[]>([]);
    const [shipper, setShipper] = React.useState([] as any);
    const [loading, setLoading] = React.useState(false);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getApiByState = (state: any) => {
        console.log(state);
        if (state === 'ALL') {
            Axios.get(`bill/get-list-bill`)
                .then(res => {
                    let billTemp = res.data;
                    setProduct(billTemp.map((data: any) => {
                        return {
                            username: data.receiver.last_name + " " + data.receiver.first_name,
                            bill_number: data.id,
                            shipper: data.id_shipper,
                            date: data.date,
                            state: data.state
                        }
                    }))
                }).catch(error => {
                    console.log(error);
                })
        } else {
            Axios.get(`bill/get-list-bill-processing/${state}`)
                .then(res => {
                    let billTemp = res.data;
                    setProduct(billTemp.map((data: any) => {
                        return {
                            username: data.receiver.last_name + " " + data.receiver.first_name,
                            bill_number: data.id,
                            shipper: data.id_shipper,
                            date: data.date,
                            state: data.state
                        }
                    }))
                }).catch(error => {
                    console.log(error);
                })
        }
    }

    React.useEffect(() => {
        getApiByState(props.state);
    }, [props.state, loading]);
    React.useEffect(() => {
        Axios.get(`/admin/get_list_staff_by_role_id?idRole=3`, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
            }
        })
            .then(res => {
                setShipper(res.data);
                console.log(res.data);

            }).catch(error => {
                console.log(error);
            })
    }, [])
    const handleAccept = (item: any) => {
        // let selectShipper = '' as any;
        // for (var i in product) {
        //     if (product[i].bill_number === item.bill_number) {
        //         selectShipper = product[i].shipper;
        //         break;
        //     }
        // }
        if (item.shipper !== '' && item.shipper !== null) {
            Axios.put(`order/update-status-order`, {
                "id": item.bill_number,
                "id_shipper": item.shipper,
                "state": "DEL"
            }, {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
                }
            })
                .then(res => {
                    setLoading(!loading);
                    alert('Success');
                }).catch(error => {
                    console.log(error);
                })
        } else {
            alert(`Please choose shipper on bill number: ${item.bill_number}`)
        }

    }
    const handleCancel = (item: any) => {
        Axios.put(`order/update-status-order`, {
            "id": item.bill_number,
            "id_shipper": 0,
            "state": "CAN"
        }, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
            }
        })
            .then(res => {
                setLoading(!loading);
                alert('Success');
            }).catch(error => {
                console.log(error);
            })
    }
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 485 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, textAlign: 'center' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {product.length === 0 ? <TableRow>
                            <TableCell colSpan={6} sx={{ textAlign: 'center' }}>No Data</TableCell>
                        </TableRow> :
                            product
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: any) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.bill_number}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align} style={{ textAlign: 'center' }}>
                                                        {column.id === 'shipper' ?
                                                            <FormControl fullWidth>
                                                                <InputLabel id="demo-simple-select-label">Shipper</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={value}
                                                                    disabled={row.shipper === null || props.state === "PRO" ? false : true}
                                                                    label="Shipper"
                                                                    onChange={(e) => {
                                                                        setProduct(product.map((data: any) => {
                                                                            if (data.bill_number === row.bill_number) {
                                                                                data.shipper = e.target.value;
                                                                            }
                                                                            return data;
                                                                        }));
                                                                    }}
                                                                >
                                                                    <MenuItem value={""}>none</MenuItem>
                                                                    {shipper.map((data: any) => <MenuItem value={data.id}>{`${data.last_name} ${data.first_name}`}</MenuItem>)}
                                                                </Select>
                                                            </FormControl>
                                                            : column.id === 'action' && props.state === "ALL" && row.state === "PRO" || column.id === 'action' && props.state === "PRO" ?
                                                                <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                                                                    <Tooltip title={'accept'} arrow>
                                                                        <Button onClick={() => handleAccept(row)} variant="outlined"><Done /></Button>
                                                                    </Tooltip>
                                                                    <Tooltip title={'denied'} arrow>
                                                                        <Button variant="outlined" onClick={() => handleCancel(row)}><Close /></Button>
                                                                    </Tooltip>
                                                                </div> : column.id === 'more' ?
                                                                    <div className='view-detail'>
                                                                        <Tooltip title={'view details...'} arrow>
                                                                            <Link to={`order-detail/${row.bill_number}`}>View details ...</Link>
                                                                        </Tooltip>
                                                                    </div>
                                                                    : value
                                                        }
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{
                    div: {
                        '.css-pdct74-MuiTablePagination-selectLabel, .css-levciy-MuiTablePagination-displayedRows': {
                            marginTop: '15px',
                        }
                    }
                }}
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={product.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

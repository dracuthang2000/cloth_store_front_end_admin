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
    { id: 'username', label: 'Customer username', minWidth: 150 },
    { id: 'bill_number', label: 'Bill\u00a0number', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 150 },
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

function createData(
    username: string,
    bill_number: string,
    shipper: string,
    date: string,
): Data {
    return { username, bill_number, shipper, date };
}

const rows = [
    createData('', '', '', ''),
];

export default function TableOrder(props: any) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rowsTest, setRowsTest] = React.useState(rows);

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
                    setRowsTest(billTemp.map((data: any) => {
                        return {
                            username: data.receiver.first_name,
                            bill_number: data.id,
                            shipper: '',
                            date: data.date
                        }
                    }))
                }).catch(error => {
                    console.log(error);
                })
        } else {
            Axios.get(`bill/get-list-bill-processing/${state}`)
                .then(res => {
                    let billTemp = res.data;
                    setRowsTest(billTemp.map((data: any) => {
                        return {
                            username: data.receiver.first_name,
                            bill_number: data.id,
                            shipper: '',
                            date: data.date
                        }
                    }))
                }).catch(error => {
                    console.log(error);
                })
        }
    }

    React.useEffect(() => {
        getApiByState(props.state);
    }, [props.state]);
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
                        {rowsTest
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
                                                                label="Shipper"
                                                                onChange={(e) => {
                                                                    setRowsTest(rowsTest.map((data: any) => {
                                                                        if (data.bill_number === row.bill_number) {
                                                                            data.shipper = e.target.value;
                                                                        }
                                                                        return data;
                                                                    }));
                                                                }}
                                                            >
                                                                <MenuItem value={0}>none</MenuItem>
                                                                <MenuItem value={10}>10</MenuItem>
                                                                <MenuItem value={20}>20</MenuItem>
                                                                <MenuItem value={30}>30</MenuItem>
                                                                <MenuItem value={40}>40</MenuItem>
                                                                <MenuItem value={50}>50</MenuItem>
                                                                <MenuItem value={60}>60</MenuItem>
                                                                <MenuItem value={70}>70</MenuItem>
                                                                <MenuItem value={80}>80</MenuItem>
                                                                <MenuItem value={90}>90</MenuItem>
                                                                <MenuItem value={100}>100</MenuItem>
                                                                <MenuItem value={110}>110</MenuItem>
                                                                <MenuItem value={120}>120</MenuItem>
                                                                <MenuItem value={130}>130</MenuItem>
                                                                <MenuItem value={140}>140</MenuItem>
                                                                <MenuItem value={150}>150</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        : column.id === 'action' ?
                                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                                                                <Tooltip title={'accept'} arrow>
                                                                    <Button variant="outlined"><Done /></Button>
                                                                </Tooltip>
                                                                <Tooltip title={'denied'} arrow>
                                                                    <Button variant="outlined"><Close /></Button>
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
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

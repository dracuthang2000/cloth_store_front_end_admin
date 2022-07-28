import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Select, FormControl, InputLabel, MenuItem, Button, Tooltip } from '@mui/material';
import { Close, Done } from '@mui/icons-material';
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
        format: (value: number) => value.toLocaleString('en-US'),
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
        format: (value: number) => value.toFixed(2),
    },
];

interface Data {
    username: string;
    bill_number: number;
    shipper: number;
    date: string;
}

function createData(
    username: string,
    bill_number: number,
    shipper: number,
    date: string,
): Data {
    return { username, bill_number, shipper, date };
}

const rows = [
    createData('dracuthang', 1, 10, "28/07/2020"),
    createData('user2', 2, 20, "28/07/2020"),
    createData('user1', 3, 30, "28/07/2020"),
    createData('user3', 4, 40, "28/07/2020"),
    createData('user4', 5, 50, "28/07/2020"),
    createData('user5', 6, 60, "28/07/2020"),
    createData('user6', 7, 70, "28/07/2020"),
    createData('user7', 8, 80, "28/07/2020"),
    createData('user8', 9, 90, "28/07/2020"),
    createData('user9', 10, 100, "28/07/2020"),
    createData('user10', 11, 110, "28/07/2020"),
    createData('user11', 12, 120, "28/07/2020"),
    createData('user12', 13, 130, "28/07/2020"),
    createData('user13', 14, 140, "28/07/2020"),
    createData('user14', 15, 150, "28/07/2020"),
];

export default function TableOrder() {
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
    const handleChange = (event: any, column: any) => {
        console.log(rowsTest);
        //     setRowsTest(rowsTest.map((data: any) => {
        //         if (data)
        //     }));
        // }
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
                                                                        <a href='#'>View details ...</a>
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

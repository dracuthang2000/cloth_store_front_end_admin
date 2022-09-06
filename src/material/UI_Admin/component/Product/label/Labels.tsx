import { Search } from "@mui/icons-material";
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
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../../../Axios";
import '../Clothes/ClotheScreen/Product.css';

const Labels = () => {
    const [labels, setLabels] = useState([] as any);
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleClickUpdate = (data: any) => {
        navigate(`update-label/${data.id}`);
    }
    const handleClickNewColor = () => {
        navigate(`update-label`)
    }
    useEffect(() => {
        Axios.get('label/get-list-label')
            .then((res) => {
                const listLabel = res.data;
                setLabels(listLabel);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="container" >
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table aria-label="simple-label">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <div className="screen-search-product">
                                        <TextField label='search' sx={{ width: '300px' }} />
                                        <Button variant="outlined"><Search /></Button>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" onClick={handleClickNewColor}>New Label</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ width: '5%', textAlign: 'center' }}>Number</TableCell>
                                <TableCell sx={{ width: '75%', textAlign: 'center' }}>Label</TableCell>
                                <TableCell sx={{ width: '20%', textAlign: 'center' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {labels
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((data: any, index: number) => (
                                    <TableRow key={data.id}>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            {page * rowsPerPage + index + 1}
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            {data.label}
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            <div style={{ verticalAlign: 'middle' }}>
                                                <Button variant="outlined" onClick={() => handleClickUpdate(data)}>UPDATE</Button>
                                            </div>
                                            {/* <div style={{ display: 'table' }}>
                                                <div style={{ verticalAlign: 'middle', textAlign: 'center', }}>
                                                    <Button variant="outlined" onClick={() => handleClickUpdate(data)}>UPDATE</Button>
                                                </div>
                                                <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                                                    {data.status ? <Button variant="outlined">DELETE</Button> : <Button sx={{ width: '80px' }} variant="outlined">Enable</Button>}
                                                </div>
                                            </div> */}
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
                    count={labels.length}
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
export default Labels;
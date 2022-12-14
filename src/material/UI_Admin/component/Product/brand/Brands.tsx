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

const Brands = () => {
    const [brands, setBrands] = useState([] as any);
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
        navigate(`update-brand/${data.id}`);
    }
    const handleClickNewColor = () => {
        navigate(`update-brand`)
    }
    useEffect(() => {
        Axios.get('brand/get-list-brand')
            .then((res) => {
                const listBrand = res.data;
                setBrands(listBrand);
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
                                <TableCell colSpan={3}>
                                    <div className="screen-search-product">
                                        <TextField label='search' sx={{ width: '300px' }} />
                                        <Button variant="outlined"><Search /></Button>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" onClick={handleClickNewColor}>New brand</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ width: '5%', textAlign: 'center' }}>Number</TableCell>
                                <TableCell sx={{ width: '25%', textAlign: 'center' }}>Logo</TableCell>
                                <TableCell sx={{ width: '50%', textAlign: 'center' }}>Material</TableCell>
                                <TableCell sx={{ width: '20%', textAlign: 'center' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {brands
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((data: any, index: number) => (
                                    <TableRow key={data.id}>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            {page * rowsPerPage + index + 1}
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            <img style={{ height: 80, width: 50 }} src={`http://localhost:8081/api/brand/image/load/${data.image}`} alt={''} />
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            {data.brand}
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
                    count={brands.length}
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
export default Brands;
import { Restore, Search } from "@mui/icons-material";
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
    FormControl,
    selectClasses
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../../../../Axios";
import './Product.css';

const Product = () => {
    const [product, setProduct] = useState([] as any);
    const [selectNew, setSelectNew] = useState('' as any);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeSelect = (event: any) => {
        setSelectNew(event.target.value);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleClickUpdate = (data: any) => {
        navigate(`update-clothes/${data.id}`);
    }
    const handleClickNewProduct = () => {
        navigate(`update-clothes`)
    }
    useEffect(() => {
        if (loading) {
            Axios.get('product/get-list-product')
                .then((res) => {
                    const listProduct = res.data;
                    setProduct(
                        listProduct.map((p: any) => {
                            return {
                                id: p.id,
                                image: p.img,
                                name: p.product_name,
                                price: p.price,
                                is_new: p.is_new,
                                discount_percent: p.discount,
                                tag: p.tag,
                                tag_label: p.label.tag_label,
                                material: p.material.material_name,
                                brand: p.brand.brand,
                                label: p.label.label,
                                gender: p.gender.gender,
                                status: p.is_active
                            };
                        })
                    );
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [loading]);
    const handleReset = () => {
        setSelectNew("");
        setLoading(true);
        setKeyword('');
    }
    const handleSearch = () => {
        Axios.post('product/find-product-by-new-and-name', {
            key_word: keyword,
            is_new: selectNew
        })
            .then((res) => {
                const listProduct = res.data;
                setProduct(
                    listProduct.map((p: any) => {
                        return {
                            id: p.id,
                            image: p.img,
                            name: p.product_name,
                            price: p.price,
                            is_new: p.is_new,
                            discount_percent: p.discount,
                            tag: p.tag,
                            tag_label: p.label.tag_label,
                            material: p.material.material_name,
                            brand: p.brand.brand,
                            label: p.label.label,
                            gender: p.gender.gender,
                            status: p.is_active
                        };
                    })
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className="container" >
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table aria-label="simple-label">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <div className="screen-search-product">
                                        <TextField
                                            value={keyword}
                                            onChange={((e) => setKeyword(e.target.value))}
                                            label='search'
                                            sx={{ width: '300px' }} />
                                        <FormControl sx={{ width: '200px' }}>
                                            <InputLabel id='select-new'>Select new</InputLabel>
                                            <Select
                                                labelId="select-new"
                                                value={selectNew}
                                                onChange={handleChangeSelect}
                                                label={'Select new'}>
                                                <MenuItem value={""}>None</MenuItem>
                                                <MenuItem value={0}>Old</MenuItem>
                                                <MenuItem value={1}>New</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Button variant="outlined" onClick={handleSearch}><Search /></Button>
                                        <Button variant="outlined" onClick={handleReset}><Restore /></Button>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" onClick={handleClickNewProduct}>NEW PRODUCT</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ width: '5%', textAlign: 'center' }}>Number</TableCell>
                                <TableCell sx={{ width: '30%', textAlign: 'center' }}>Product</TableCell>
                                <TableCell sx={{ width: '25%', textAlign: 'center' }}>Description</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}>Price</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}>New</TableCell>
                                <TableCell sx={{ width: '10%', textAlign: 'center' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((data: any, index: number) => (
                                    <TableRow key={data.id}>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            {page * rowsPerPage + index + 1}
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle', display: 'flex', gap: '5px' }}>
                                            <div>
                                                <img style={{ width: '80px', height: '100px' }} src={`http://localhost:8081/api/product/image/load/${data.image}`} alt='' />
                                            </div>
                                            <div style={{ width: '100%', display: 'table' }}>
                                                <span style={{ height: 'auto', display: 'table-cell', verticalAlign: 'middle' }}>
                                                    {data.name}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle' }}>
                                            {`${data.label} được sản xuất bởi hãng ${data.brand}, cùng với chất liệu: ${data.material}, áo này thì thích hợp cho ${data.gender === "MALE" ? "Nam" : "Nữ"}  `}
                                        </TableCell>
                                        <TableCell sx={{
                                            verticalAlign: 'middle', textAlign: 'center', '::after': {
                                                content: `'đ'`
                                            }
                                        }}>
                                            {Intl.NumberFormat().format(data.price)}
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                            {data.is_new === true ? 'Yes' : 'No'}
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
export default Product;
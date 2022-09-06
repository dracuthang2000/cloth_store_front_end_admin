import React, { useEffect, useState } from "react";
import '../Clothes/AddClothe/UpdateClothes.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
    TextField
    , Avatar
    , Autocomplete
    , Box
    , Button,
    Switch,
    FormControlLabel,
    FormGroup,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormHelperText,
} from "@mui/material";
import Axios from "../../../../Axios";
import { useNavigate, useParams } from "react-router-dom";
import { Add } from "@mui/icons-material";

interface initialBrand {
    id: string,
    brand: string,
    image: string,
    image_byte: any,
    version: number,
}

const UpdateBrand = () => {
    const initialError = {
        image: false,
        brand: false,
    }
    const initialMessageError = {
        image: '',
        brand: '',
    }
    const navigate = useNavigate();
    const [brand, setBrand] = useState<Partial<initialBrand>>();
    const { id_brand } = useParams();
    const [error, setError] = useState(initialError);
    const [messageError, setMessageError] = useState(initialMessageError);
    const [img, setImg] = useState<any | null>('');
    const handleImage = (e: any) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImg(URL.createObjectURL(e.target.files[0]));
                setBrand({ ...brand, image: e.target.files[0].name, image_byte: reader.result });
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    useEffect(() => {
        if (id_brand) {
            Axios.get(`brand/find-by-id`, {
                params: {
                    id: id_brand
                }
            }).then(res => {
                console.log(res.data);
                setBrand(res.data);
            }).catch((e) => console.log(e))
        }
    }, [])
    const valid = () => {
        let flag = false;
        let error = initialError;
        let messageError1 = initialMessageError;
        if (brand?.brand === undefined || brand.brand === '') {
            messageError1.brand = 'Brand name is not null';
            error.brand = true;
            flag = true;
        } else {
            messageError1.brand = '';
            error.brand = false;
        }

        if (brand?.image === undefined || brand.image === '') {
            messageError1.image = 'Images is not null';
            error.image = true;
            flag = true;
        } else {
            messageError1.image = '';
            error.image = false;
        }
        setError(error);
        setMessageError(messageError1);
        return flag;
    }
    const handleSave = () => {
        if (!valid()) {
            Axios.put(`brand/update-brand`, {
                brand: brand?.brand,
                id: brand?.id,
                version: brand?.version,
                image: brand?.image,
                image_byte: brand?.image_byte
            }).then(res => {
                alert("success");
                navigate(-1);
            }).catch((e) => console.log(e))
        }
        console.log(error);

    }
    const handleCancel = () => {
        navigate(-1);
    }

    const handleCreate = () => {
        if (!valid()) {
            Axios.post(`brand/insert-brand`, {
                brand: brand?.brand,
                image: brand?.image,
                image_byte: brand?.image_byte
            }).then(res => {
                alert("success");
                navigate(-1);
            }).catch((e) => console.log(e))
        }
        console.log(error);
    }
    return (
        <div className="container">
            <div className="updateClothesContainer">
                <div className="header">
                    <h4>
                        {id_brand ? 'Update Brand' : 'New Brand'}
                    </h4>
                    <hr />
                </div>
                <div className="main">
                    <div className="left">
                        <div className="container-input">
                            <TextField sx={{ width: '100%' }}
                                value={`${brand?.brand ? brand?.brand : ""}`}
                                onChange={(e) => setBrand({ ...brand, brand: e.target.value })}
                                label={'Brand *'}
                                error={error.brand}
                                name="Brand" />
                            {error.brand && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.brand}</FormHelperText>
                            </FormControl>}
                        </div>
                    </div>
                    <div className="right">
                        <div className="imageContainer">
                            <div className="image">
                                {img ?
                                    <img src={img} alt="" /> : id_brand ? <img src={`http://localhost:8081/api/brand/image/load/${brand?.image}`} alt='' />
                                        : <img style={{ borderColor: `${error.image && 'red'}` }} src={require('../../../image/frame.png')} alt='' />}
                            </div>
                            {error.image && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.image}</FormHelperText>
                            </FormControl>}
                        </div>
                        <div className="btnContainer">
                            <Button variant="outlined" component="label">
                                Choose
                                <input
                                    style={{ display: 'none' }}
                                    onChange={handleImage}
                                    accept="image/*"
                                    multiple type="file" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="btnContainer">
                    <Button sx={{ width: '150px' }} variant="outlined" onClick={handleCancel}>Cancel</Button>
                    {id_brand ? <Button sx={{ width: '150px' }} variant="outlined" onClick={handleSave}>Save</Button>
                        : <Button sx={{ width: '150px' }} variant="outlined" onClick={handleCreate}>Create new</Button>}
                </div>
            </div>
        </div>
    )
}

export default UpdateBrand;
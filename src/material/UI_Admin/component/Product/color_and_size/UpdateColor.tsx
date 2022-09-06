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
import { Add, Flag } from "@mui/icons-material";

interface initialColor {
    id: string,
    color: string,
    version: number,
}

const UpdateColor = () => {
    const navigate = useNavigate();
    const [color, setColor] = useState<initialColor | any>('')
    const { id_color } = useParams();
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');
    useEffect(() => {
        if (id_color) {
            Axios.get(`color/get-color-by-id`, {
                params: {
                    id: id_color
                }
            }).then(res => {
                setColor(res.data);
            }).catch((e) => console.log(e))
        }
    }, [])
    const handleSave = () => {
        if (!valid()) {
            Axios.put(`color/update-color`, {
                color: color.color,
                id: color.id,
                version: color.version
            }).then(res => {
                alert("success");
                navigate(-1);
            }).catch((e) => console.log(e))
        }
    }
    const handleCancel = () => {
        navigate(-1);
    }

    const handleCreate = () => {
        if (!valid()) {
            Axios.post(`color/insert-color`, {
                color: color.color
            }).then(res => {
                alert("success");
                navigate(-1);
            }).catch((e) => {
                if (e.response.status === 406) {
                    setMessageError(e.response.data.message);
                    setError(true);
                }
            })
        }
    }
    const valid = () => {
        let flag = false;
        if (color.color === undefined || color.color === '') {
            setMessageError('Color name is not null');
            setError(true);
            flag = true;
        }
        return flag;
    }
    return (
        <div className="container">
            <div className="updateClothesContainer">
                <div className="header">
                    <h4>
                        {id_color ? 'Update Color' : 'New Color'}
                    </h4>
                    <hr />
                </div>
                <div className="main">
                    <div className="left">
                        <div className="container-input">
                            <TextField sx={{ width: '100%' }}
                                value={`${color?.color ? color.color : ""}`}
                                onChange={(e) => setColor({ ...color, color: e.target.value })}
                                label={'color *'}
                                error={error}
                                name="color" />
                            {
                                error && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError}</FormHelperText>
                                </FormControl>
                            }
                        </div>
                    </div>
                    <div className="btnContainer">
                        <Button sx={{ width: '150px', height: 50 }} variant="outlined" onClick={handleCancel}>Cancel</Button>
                        {id_color ? <Button sx={{ width: '150px', height: 50 }} variant="outlined" onClick={handleSave}>Save</Button>
                            : <Button sx={{ width: '150px', height: 50 }} variant="outlined" onClick={handleCreate}>Create new</Button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateColor;
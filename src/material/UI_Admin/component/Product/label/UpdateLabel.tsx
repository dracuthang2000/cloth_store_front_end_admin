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

interface initialLabel {
    id: string,
    label: string,
    version: number,
}

const UpdateLabel = () => {
    const navigate = useNavigate();
    const [label, setLabel] = useState<Partial<initialLabel>>();
    const { id_label } = useParams();
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');
    useEffect(() => {
        if (id_label) {
            Axios.get(`label/get-label-by-id`, {
                params: {
                    id: id_label
                }
            }).then(res => {
                setLabel(res.data);
            }).catch((e) => console.log(e))
        }
    }, [])
    const handleSave = () => {
        if (!valid()) {
            Axios.put(`label/update-label`, {
                label: label?.label,
                id: label?.id,
                version: label?.version
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
            Axios.post(`label/insert-label`, {
                label: label?.label
            }).then(res => {
                alert("success");
                navigate(-1);
            }).catch((e) => console.log(e))
        }

    }

    const valid = () => {
        let flag = false;
        if (label?.label === undefined || label.label === '') {
            setMessageError('Label name is not null');
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
                        {id_label ? 'Update Label' : 'New label'}
                    </h4>
                    <hr />
                </div>
                <div className="main">
                    <div className="left">
                        <div className="container-input">
                            <TextField sx={{ width: '100%' }}
                                value={`${label?.label ? label.label : ""}`}
                                onChange={(e) => setLabel({ ...label, label: e.target.value })}
                                label={'label *'}
                                error={error}
                                name="label" />
                            {
                                error && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError}</FormHelperText>
                                </FormControl>
                            }
                        </div>
                    </div>
                    <div className="btnContainer">
                        <Button sx={{ width: '150px', height: 50 }} variant="outlined" onClick={handleCancel}>Cancel</Button>
                        {id_label ? <Button sx={{ width: '150px', height: 50 }} variant="outlined" onClick={handleSave}>Save</Button>
                            : <Button sx={{ width: '150px', height: 50 }} variant="outlined" onClick={handleCreate}>Create new</Button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateLabel;
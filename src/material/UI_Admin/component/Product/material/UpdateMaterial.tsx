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

interface initialMaterial {
    id: string,
    material_name: string,
    version: number,
}

const UpdateMaterial = () => {
    const navigate = useNavigate();
    const [material, setMaterial] = useState<Partial<initialMaterial>>();
    const { id_material } = useParams();
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');
    useEffect(() => {
        if (id_material) {
            Axios.get(`material/get-material-by-id`, {
                params: {
                    id: id_material
                }
            }).then(res => {
                setMaterial(res.data);
            }).catch((e) => console.log(e))
        }
    }, [])
    const handleSave = () => {
        if (!valid()) {
            Axios.put(`material/update-material`, {
                material_name: material?.material_name,
                id: material?.id,
                version: material?.version
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
            Axios.post(`material/insert-material`, {
                material_name: material?.material_name
            }).then(res => {
                alert("success");
                navigate(-1);
            }).catch((e) => console.log(e))
        }
    }
    const valid = () => {
        let flag = false;
        if (material?.material_name === undefined || material.material_name === '') {
            setMessageError('Material name is not null');
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
                        {id_material ? 'Update Material' : 'New Material'}
                    </h4>
                    <hr />
                </div>
                <div className="main">
                    <div className="left">
                        <div className="container-input">
                            <TextField sx={{ width: '100%' }}
                                value={`${material?.material_name ? material?.material_name : ""}`}
                                onChange={(e) => setMaterial({ ...material, material_name: e.target.value })}
                                label={'material *'}
                                error={error}
                                name="material" />
                            {
                                error && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError}</FormHelperText>
                                </FormControl>
                            }
                        </div>
                    </div>
                    <div className="btnContainer">
                        <Button sx={{ width: '150px', height: 50 }} variant="outlined" onClick={handleCancel}>Cancel</Button>
                        {id_material ? <Button sx={{ width: '150px', height: 50 }} variant="outlined" onClick={handleSave}>Save</Button>
                            : <Button sx={{ width: '150px', height: 50 }} variant="outlined" onClick={handleCreate}>Create new</Button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateMaterial;
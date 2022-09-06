import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, Box, FormControl, FormHelperText, TextField } from '@mui/material';
import ItemSize from './ItemSize';
import { Add, ErrorOutline } from '@mui/icons-material';
import Axios from '../../../../Axios';
import { useNavigate } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

interface initialSizeAndQuantity {
    size: initialSize,
    quantity: number
}
interface initialSize {
    size: string,
    id: string,
    version: number
}
interface initialColor {
    id: string,
    color: string,
    version: number,
}
interface initialColorSize {
    color: initialColor,
    color_size: [initialSizeAndQuantity],
    image_byte: any,
    image_name: string
}

export default function ColorAndSize(props: any) {
    const initialErrorMessage = {
        size: '',
        quantity: '',
        color: '',
        image: '',
        lstInstall: '',
    }
    const initialError = {
        size: false,
        quantity: false,
        color: false,
        image: false,
        lstInstall: false,
    }
    const [img, setImg] = useState<any | null>('');
    const [messageError, setMessageError] = useState(initialErrorMessage);
    const [error, setError] = useState(initialError);
    const [onAdd, setOnAdd] = useState(false);
    const [color, setColor] = useState([] as any)
    const [size, setSize] = useState([] as any)
    const [sizeAndQuantity, setSizeAndQuantity] = useState<Partial<initialSizeAndQuantity>>()
    const [lstSizeInstall, setLstSizeInstall] = useState<Partial<initialSizeAndQuantity>[] | any>([] as any);
    const navigate = useNavigate();
    const handleClose = () => {
        setLstSizeInstall([]);
        setImg('');
        setOnAdd(false);
        setMessageError(initialErrorMessage);
        setError(initialError);
        props.setOpen(false);
        props.setAddColorAndSize('');
        props.setIsChooseColor(null);
    };
    const handleSave = () => {
        if (!validSave()) {
            props.setAddColorAndSize({ ...props.addColorAndSize, color_size: lstSizeInstall });
            props.setLoadingColor(true);
            props.setOpen(false);
            setLstSizeInstall([]);
        }
    }
    useEffect(() => {
        Axios.get(`color/get-list-color`)
            .then(res => {
                setColor(res.data);
            }).catch(e => {
                navigate('/error');
            })
        Axios.get(`size/get-list-size`)
            .then(res => {
                setSize(res.data);
            }).catch(e => {
                navigate('/error');
            })
    }, [])
    useEffect(() => {
        if (props.isChooseColor && props.open) {
            setLstSizeInstall(props.isChooseColor.color_size);
        }
    }, [props.open])
    const handleImage = (e: any) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImg(URL.createObjectURL(e.target.files[0]));
                if (props.isChooseColor) {
                    props.setIsChooseColor({
                        ...props.isChooseColor, image_name: Date.now() + e.target.files[0].name,
                        image_byte: reader.result
                    })
                } else {
                    props.setAddColorAndSize({
                        ...props.addColorAndSize, image_name: Date.now() + e.target.files[0].name,
                        image_byte: reader.result
                    });
                }
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    // const validSize = () =>{
    //     if()
    // }
    const validSave = () => {
        let flag = false;
        let error = initialError;
        let errorMessage = initialErrorMessage;
        if (lstSizeInstall.length === 0) {
            flag = true;
            error.lstInstall = true;
            errorMessage.lstInstall = 'Size and quantity is not null please add it';
        } else {
            error.lstInstall = false;
            errorMessage.lstInstall = '';
        }

        if (props.isChooseColor) {
            if (props.isChooseColor.color === undefined || props.isChooseColor.color === null) {
                error.color = true;
                errorMessage.color = 'Color is not null'
                flag = true;
                alert('check');
            } else {
                error.color = false;
                errorMessage.color = ''
            }

            if (props.isChooseColor.image_name === undefined || props.isChooseColor.image_name === '') {
                error.image = true;
                errorMessage.image = 'Image is not null';
                flag = true;
            } else {
                error.image = false;
                errorMessage.image = ''
            }
        } else {
            if (props.addColorAndSize.color === undefined || props.addColorAndSize.color === null) {
                error.color = true;
                errorMessage.color = 'Color is not null'
                flag = true;
            } else {
                error.color = false;
                errorMessage.color = ''
            }

            if (props.addColorAndSize.image_name === undefined || props.addColorAndSize.image_name === '') {
                error.image = true;
                errorMessage.image = 'Image is not null';
                flag = true;
            } else {
                error.image = false;
                errorMessage.image = ''
            }
        }
        setError(error);
        setMessageError(errorMessage);
        return flag;
    }
    const validAddSize = () => {
        let flag = false;
        let error = initialError;
        let errorMessage = initialErrorMessage;
        if (sizeAndQuantity?.size === undefined || sizeAndQuantity.size === null) {
            error.size = true;
            errorMessage.size = 'Size is not null'
            flag = true;
        } else {
            error.size = false;
            errorMessage.size = ''
        }

        if (sizeAndQuantity?.quantity === undefined || sizeAndQuantity.quantity === null) {
            error.quantity = true;
            errorMessage.quantity = 'Quantity is not null';
            flag = true;
        } else if (sizeAndQuantity.quantity < 0) {
            error.quantity = true;
            errorMessage.quantity = 'Quantity is not less than zero';
            flag = true;
        } else {
            error.quantity = false;
            errorMessage.quantity = '';
        }
        setError(error);
        setMessageError(errorMessage);
        return flag;
    }
    const handleAddSize = () => {
        if (!validAddSize()) {
            let flagCheck = true;
            for (var i in lstSizeInstall) {
                if (sizeAndQuantity?.size?.id === lstSizeInstall[i].size.id) {
                    lstSizeInstall[i].quantity = sizeAndQuantity?.quantity;
                    flagCheck = false;
                }
            }
            if (flagCheck) {
                setLstSizeInstall([sizeAndQuantity, ...lstSizeInstall]);
            }
            setOnAdd(false);
            setSizeAndQuantity({ ...sizeAndQuantity, quantity: 0, size: undefined });
        }
    }
    const filterListSize = () => {
        if (sizeAndQuantity?.size) {
            for (var i in size) {
                if (sizeAndQuantity.size.id === size[i].id) {
                    return size[i];
                }
            }
        }
        return null;
    }
    const filterListColor = () => {
        if (props.isChooseColor && props.isChooseColor.color !== undefined) {
            console.log('2', props.isChooseColor)
            for (var i in color) {
                if (props.isChooseColor.color.id === color[i].id) {
                    return color[i];
                }
            }
        } else if (props.addColorAndSize !== '' && props.addColorAndSize.color) {
            for (var i in color) {
                if (props.addColorAndSize.color.id === color[i].id) {
                    return color[i];
                }
            }
        }
        return null;
    }
    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal title
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className='main' style={{ width: 500, height: 'auto' }} >
                        <div className='left'>
                            <div className="container-input">
                                <Autocomplete
                                    disablePortal
                                    id="Color"
                                    value={filterListColor()}
                                    options={color}
                                    getOptionLabel={(option: any) => option.color}
                                    onChange={(event: any, newInputValue: any) => {
                                        if (props.isChooseColor) {
                                            props.setIsChooseColor({ ...props.isChooseColor, color: newInputValue })
                                        } else {
                                            props.setAddColorAndSize({ ...props.addColorAndSize, color: newInputValue });
                                        }
                                    }}
                                    sx={{ width: '100%' }}
                                    renderInput={(params) => <TextField {...params}
                                        error={error.color}
                                        label="Color *" />}
                                />
                                {error.color && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.color}</FormHelperText>
                                </FormControl>}
                            </div>
                            <div className='list-size'>
                                <h5 style={{ fontWeight: '600', color: 'gray' }}>List Size</h5>
                                <Box display={'flex'} flexWrap={'wrap'} width={'100%'} gap={2}>
                                    {lstSizeInstall.
                                        map((data: any, index: number) => (<ItemSize key={index} item={data} />))}
                                </Box>
                                {!onAdd && <Button onClick={() => setOnAdd(true)} variant='outlined' sx={{ width: '100px', borderColor: `${error.lstInstall && 'red'}` }}><Add /></Button>}
                            </div>
                            {onAdd && <Box style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: "10px",
                                border: "1px solid black",
                                overflow: "hidden",
                                height: 'auto',
                                padding: '10px'
                            }}>
                                <div className="container-input">
                                    <Autocomplete
                                        disablePortal
                                        id="Size"
                                        value={filterListSize()}
                                        options={size}
                                        onChange={(event: any, newInputValue: any) => {
                                            setSizeAndQuantity({ ...sizeAndQuantity, size: newInputValue });

                                        }}
                                        getOptionLabel={(option: any) => option.size}
                                        sx={{ width: '100%' }}
                                        renderInput={(params) => <TextField {...params}
                                            error={error.size}
                                            label="Size *" />}
                                    />
                                    {error.size && <FormControl error variant="standard">
                                        <FormHelperText id="component-error-text">{messageError.size}</FormHelperText>
                                    </FormControl>}
                                </div>
                                <div className="container-input">
                                    <TextField
                                        sx={{ width: '100%' }}
                                        value={sizeAndQuantity?.quantity}
                                        onChange={(e) => { setSizeAndQuantity({ ...sizeAndQuantity, quantity: Number.parseInt(e.target.value) }) }}
                                        label={'Quantity *'}
                                        type={'number'}
                                        error={error.quantity}
                                    />
                                    {error.quantity && <FormControl error variant="standard">
                                        <FormHelperText id="component-error-text">{messageError.quantity}</FormHelperText>
                                    </FormControl>}
                                </div>
                                <Button variant='outlined' onClick={handleAddSize}>Add</Button>
                            </Box>}

                        </div>
                        <div className='right'>
                            <div className="imageContainer">
                                <div className="image" style={{ width: '100%', height: '400px' }}>
                                    {props.isChooseColor && props.isChooseColor.image_byte ? <img src={props.isChooseColor.image_byte} alt="" /> : img ?
                                        <img src={img} style={{ borderColor: `${error.image && 'red'}` }} alt="" /> : props.isChooseColor && props.id_product ? <img src={`http://localhost:8081/api/product/image/load/${props.isChooseColor.image_name}`} className="card-img" /> :
                                            <img style={{ borderColor: `${error.image && 'red'}` }} src={require('../../../image/frame.png')} alt=''></img>}
                                </div>
                                {error.image && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.image}</FormHelperText>
                                </FormControl>}
                            </div>
                            <div className="btnContainer">
                                <Button variant="outlined" sx={{ marginLeft: '50px' }} component="label">
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
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSave}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div >
    );
}

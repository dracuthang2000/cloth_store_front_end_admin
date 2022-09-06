import React, { useEffect, useState } from "react";
import './UpdateClothes.css'
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
import Axios from "../../../../../Axios";
import { useNavigate, useParams } from "react-router-dom";
import ItemColor from "../../color_and_size/ItemColor";
import { Add } from "@mui/icons-material";
import ColorAndSize from "../../color_and_size/ColorAndSize";

// interface initialColor {
//     color: string,
//     img: string,
//     isCheck: false;
// }
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
interface initialProduct {
    brand: {
        brand: string,
        id: string,
        image: string,
        tag_brand: string,
        version: 0
    },
    color: [
        {
            color: {
                color: string,
                id: string,
                version: 0
            },
            color_size: [
                {
                    id: string,
                    quantity: 0,
                    size: {
                        id: string,
                        size: string,
                        version: 0
                    }
                }
            ],
            id: string,
            img: string,
            version: 0
        }
    ],
    description: string,
    gender: {
        gender: string,
        id: string,
        version: 0
    },
    id: string,
    img: string,
    is_active: true,
    is_new: boolean,
    label: {
        id: string,
        label: string,
        tag_label: string,
        version: 0
    },
    lstImage: [
        {
            image_byte: string,
            image_name: string
        }
    ],
    material: {
        id: string,
        material_name: string,
        tag_material: string,
        "version": 0
    },
    price: 0,
    price_log: [
        {
            id: string,
            price: 0,
            start_date: string,
            version: 0
        }
    ],
    "discount": {
        "id": string,
        "percent": number,
        "version": 0
    },
    product_name: string,
    tag: string,
    version: 0
}
interface initialBrand {
    id: string,
    brand: string,
    image: string,
    version: number,
    tag_brand: string
}
interface initialLabel {
    id: string,
    label: string,
    version: number,
    tag_label: string
}
interface initialDiscount {
    "id": string,
    "percent": number,
    "version": 0
}
interface initialMaterial {
    id: string,
    material_name: string,
    version: number,
    tag_material: string
}

interface initialImage {
    image_byte: string,
    image_name: string
}

const AddClothes = () => {
    const gender = [
        {
            gender: "FEMALE",
            id: '2',
            version: 0
        },
        {
            gender: "MALE",
            id: '1',
            version: 0
        }

    ]
    const initialMessageError = {
        brand: '',
        label: '',
        name: '',
        material: '',
        price: '',
        color_size: '',
        image: '',
        gender: ''
    }
    const initialError = {
        brand: false,
        label: false,
        name: false,
        material: false,
        price: false,
        color_size: false,
        image: false,
        gender: false
    }
    const [error, setError] = useState(initialError);
    const [messageError, setMessageError] = useState(initialMessageError);
    const [description, setDescription] = useState('' as any)
    const navigate = useNavigate();
    const { id_product } = useParams();
    const [img, setImg] = useState<any | null>('');
    const [loadingColor, setLoadingColor] = useState(false);
    const [color, setColor] = useState([] as any);
    const [open, setOpen] = useState(false);
    const [isChooseColor, setIsChooseColor] = useState<Partial<initialColorSize> | null>();
    const [addColorAndSize, setAddColorAndSize] = useState('' as any);
    const [product, setProduct] = useState<Partial<initialProduct>>();
    const [discounts, setDiscounts] = useState<initialDiscount[]>([])
    const [brands, setBrands] = useState<initialBrand[]>([]);
    const [labels, setLabels] = useState<initialLabel[]>([]);
    const [materials, setMaterials] = useState<initialMaterial[]>([]);
    const [lstImage, setLstImage] = useState<initialImage[]>([]);
    const handleImage = (e: any) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImg(URL.createObjectURL(e.target.files[0]));
                console.log(e.target.files[0]);
                setProduct({ ...product, img: Date.now() + e.target.files[0].name });
                // setTest({ image_byte: reader.result, image_name: e.target.files[0].name });
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    useEffect(() => {
        if (id_product) {
            Axios.get(`product/get-product-by-id?id=${id_product}`)
                .then((res) => {
                    const listProduct = res.data;
                    setProduct(listProduct);
                    setColor(listProduct.color)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [])
    useEffect(() => {
        if (loadingColor) {
            if (isChooseColor) {
                console.log('choose', isChooseColor);
                for (var i in color) {
                    if (color[i].color.id == isChooseColor.color?.id) {
                        color[i] = isChooseColor;
                    }
                }
                if (isChooseColor.image_byte !== null) {
                    let image: initialImage = {
                        image_name: isChooseColor.image_name as any,
                        image_byte: isChooseColor.image_byte as any
                    };
                    setLstImage([image, ...lstImage])
                }
            } else {
                console.log('add', addColorAndSize);
                setColor([addColorAndSize, ...color])
                if (addColorAndSize.image_byte !== null) {
                    let image: initialImage = {
                        image_name: addColorAndSize.image_name,
                        image_byte: addColorAndSize.image_byte
                    };
                    setLstImage([image, ...lstImage])
                }
            }
            setAddColorAndSize('');
            setLoadingColor(false);
        }
    }, [loadingColor])
    const putSaveProduct = () => {
        Axios.put("product/update-product", {
            id: product?.id,
            brand: product?.brand,
            color: color,
            description: description,
            gender: product?.gender,
            img: product?.img,
            is_active: true,
            is_new: product?.is_new,
            label: product?.label,
            lstImage: lstImage,
            material: product?.material,
            price: product?.price,
            product_name: product?.product_name,
            version: product?.version
        })
            .then((res) => {
                alert(res.data);
                navigate(-1);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const handleSave = () => {
        if (!valid()) {
            putSaveProduct();
        }
    }
    const handleCancel = () => {
        navigate(-1);
    }
    const valid = () => {
        let flag = false;
        let errorMessage = initialMessageError;
        let error1 = initialError;
        if (product?.product_name === null || product?.product_name === undefined || product?.product_name === '') {
            errorMessage.name = 'Name is not null';
            error1.name = true;
            flag = true;
        } else {
            errorMessage.name = '';
            error1.name = false;
        }

        if (product?.brand === undefined || product?.brand === null) {
            errorMessage.brand = 'Brand is not null';
            error1.brand = true;
            flag = true;
        } else {
            errorMessage.brand = '';
            error1.brand = false;
        }

        if (color === undefined || color === '' || color === null || color.length === 0) {
            errorMessage.color_size = 'Color and size is not null';
            error1.color_size = true;
            flag = true;
        } else {
            errorMessage.color_size = '';
            error1.color_size = false;
        }

        if (product?.label === undefined || product.label === null) {
            errorMessage.label = 'Label is not null';
            error1.label = true;
            flag = true;
        } else {
            errorMessage.label = '';
            error1.label = false;
        }

        if (product?.material === undefined || product.material === null) {
            errorMessage.material = 'Material is not null';
            error1.material = true;
            flag = true;
        } else {
            errorMessage.material = 'Material is not null';
            error1.material = false;
        }

        if (product?.price === undefined || product?.price === 0 || product.price === null) {
            errorMessage.price = 'Price is not null';
            error1.price = true;
            flag = true;
        } else if (product.price < 0) {
            errorMessage.price = 'Price is not less then zero';
            error1.price = true;
            flag = true;
        } else {
            errorMessage.price = '';
            error1.price = false;
        }

        if (product?.img === undefined || product.img === null || product?.img === '') {
            errorMessage.image = 'Image is not null';
            error1.image = true;
            flag = true;
        } else {
            errorMessage.image = '';
            error1.image = false;
        }
        if (product?.gender === undefined || product.gender === null) {
            errorMessage.gender = 'Gender is not null';
            error1.gender = true;
            flag = true;
        } else {
            errorMessage.gender = '';
            error1.gender = false;
        }
        setMessageError(errorMessage);
        setError(error1);
        return flag;
    }
    const postCreateProduct = () => {
        Axios.post("product/insert-product", {
            brand: product?.brand,
            color: color,
            description: description,
            gender: product?.gender,
            img: product?.img,
            is_active: true,
            is_new: product?.is_new,
            label: product?.label,
            lstImage: lstImage,
            material: product?.material,
            price: product?.price,
            product_name: product?.product_name,
        })
            .then((res) => {
                alert(res.data);
                navigate(-1);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const handleCreate = () => {
        if (!valid()) {
            postCreateProduct();
        }

    }

    useEffect(() => {
        Axios.get(`brand/get-list-brand`)
            .then(res => {
                setBrands(res.data);
            }).catch((error) => {
                console.log(error);

            })
    }, [])
    useEffect(() => {
        Axios.get(`label/get-list-label`)
            .then(res => {
                setLabels(res.data);
            }).catch((error) => {
                console.log(error);

            })
    }, [])
    useEffect(() => {
        Axios.get(`material/get-list-material`)
            .then(res => {
                setMaterials(res.data);
            }).catch((error) => {
                console.log(error);

            })
    }, [])
    useEffect(() => {
        Axios.get(`discount/get-list-discount`)
            .then(res => {
                setDiscounts(res.data);
            }).catch((error) => {
                console.log(error);

            })
    }, [])
    const filterBrands = () => {
        if (product?.brand !== null) {
            for (var i in brands) {
                if (product?.brand?.id === brands[i].id) {
                    return brands[i];
                }
            }
        }
        return null;
    }
    const filterLabel = () => {
        if (product?.label !== null) {
            for (var i in labels) {
                if (product?.label?.id === labels[i].id) {
                    return labels[i];
                }
            }
        }
        return null;
    }
    const filterMaterial = () => {
        if (product?.material !== null) {
            for (var i in materials) {
                if (product?.material?.id === materials[i].id) {
                    return materials[i];
                }
            }
        }
        return null;
    }
    const filterGender = () => {

        if (product?.gender !== null) {
            for (var i in gender) {
                console.log(product?.gender?.id);
                if (product?.gender?.id == gender[i].id) {
                    return gender[i];
                }
            }
        }
        return null;
    }
    const filterDiscount = () => {

        if (product?.discount !== null || product.discount !== undefined) {
            for (var i in discounts) {
                if (product?.discount?.id == discounts[i].id) {
                    return discounts[i];
                }
            }
        }
        return null;
    }
    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setProduct({ ...product, [name]: value });
    }
    return (
        <div className="container">
            <div className="updateClothesContainer">
                <div className="header">
                    <h4>
                        {id_product ? 'Update product' : 'New Product'}
                    </h4>
                    <hr />
                </div>
                <div className="main">
                    <div className="left">
                        <div className="container-input">
                            <TextField sx={{ width: '100%' }}
                                onChange={handleChange}
                                error={error.name}
                                value={`${product?.product_name ? product?.product_name : ""}`}
                                label={'Name *'}
                                name="product_name" />
                            {
                                error.name && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.name}</FormHelperText>
                                </FormControl>
                            }

                        </div>
                        <div className="container-input">
                            <div className="top">
                                <label>Descriptions</label>
                            </div>
                            <div className="bottom">
                                <CKEditor key={1}
                                    editor={ClassicEditor}
                                    data={`${product?.description}`}
                                    onReady={(editor: any) => {
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event: any, editor: any) => {
                                        let data = editor.getData() as any;
                                        setDescription(data);
                                    }}
                                    onBlur={(event: any, editor: any) => {
                                        console.log('Blur.', editor);
                                    }}
                                    onFocus={(event: any, editor: any) => {
                                        console.log('Focus.', editor);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="container-input">
                            <Autocomplete
                                id="select-brand"
                                sx={{ width: '100%' }}
                                options={brands}
                                autoHighlight
                                getOptionLabel={(option) => option.brand}
                                value={filterBrands()}
                                onChange={(event: any, newInputValue: any) => {
                                    setProduct({ ...product, brand: newInputValue });
                                    console.log(newInputValue);
                                }}
                                renderOption={(props: any, option) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        <Avatar
                                            src={`http://localhost:8081/api/brand/image/load/${option.image}`}
                                            alt=""
                                            style={{ marginRight: '5px' }}
                                        />
                                        {option.brand}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={error.brand}
                                        sx={{ width: '100%' }}
                                        label="Brand *"
                                    />
                                )}
                            />
                            {error.brand && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.brand}</FormHelperText>
                            </FormControl>}

                        </div>
                        {id_product && <div className="container-input">
                            <div className="bottom">
                                <Autocomplete
                                    disablePortal
                                    id="discount"
                                    disabled
                                    value={filterDiscount()}
                                    options={discounts}
                                    getOptionLabel={(option) => option.percent.toString()}
                                    sx={{ width: '100%' }}
                                    renderInput={(params) => <TextField {...params} label="Discount *" />}
                                />
                            </div>
                        </div>}

                        <div className="container-input">
                            <Autocomplete
                                disablePortal
                                id="material"
                                options={materials}
                                value={filterMaterial()}
                                getOptionLabel={(option) => option.material_name}
                                onChange={(event: any, newInputValue: any) => {
                                    setProduct({ ...product, material: newInputValue });
                                }}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField
                                    {...params}
                                    error={error.material}
                                    label="Material *" />}
                            />
                            {error.material && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.material}</FormHelperText>
                            </FormControl>}
                        </div>
                        <div className="container-input">
                            <Autocomplete
                                disablePortal
                                id="label"
                                options={labels}
                                value={filterLabel()}
                                getOptionLabel={(option) => option.label}
                                onChange={(event: any, newInputValue: any) => {
                                    setProduct({ ...product, label: newInputValue });
                                }}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} error={error.label} label="Label *" />}
                            />
                            {error.label && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.label}</FormHelperText>
                            </FormControl>}
                        </div>
                        <div className="container-input">
                            <div className="color-size">
                                <label style={{ fontWeight: '600', color: 'gray' }}>Color and Size</label>
                                <Button variant="outlined" sx={{ width: 50 }} onClick={() => {
                                    setOpen(true);
                                    setIsChooseColor(null);
                                }}><Add /></Button>
                                <Box mb={2}
                                    paddingTop={2}
                                    paddingLeft={2}
                                    display="flex"
                                    flexDirection="row"
                                    // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
                                    height="200px" // fixed the height
                                    width="600px"
                                    flexWrap='wrap'
                                    gap={3}
                                    style={{
                                        border: `1px solid ${error.color_size ? 'red' : 'black'}`,
                                        overflow: "hidden",
                                        overflowY: "scroll" // added scroll
                                    }}>
                                    {color.map((item: any, index: number) => <td><ItemColor
                                        key={index}
                                        item={item}
                                        setOpen={setOpen}
                                        setIsChooseColor={setIsChooseColor} /></td>)}
                                </Box>
                                <ColorAndSize setOpen={setOpen} open={open}
                                    isChooseColor={isChooseColor}
                                    setIsChooseColor={setIsChooseColor}
                                    setLstImage={setLstImage}
                                    setColor={setColor}
                                    color={color}
                                    id_product={id_product}
                                    setLoadingColor={setLoadingColor}
                                    setAddColorAndSize={setAddColorAndSize}
                                    addColorAndSize={addColorAndSize} />
                            </div>
                            {
                                error.color_size && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.color_size}</FormHelperText>
                                </FormControl>
                            }

                        </div>
                        <div className="container-input">
                            <Autocomplete
                                disablePortal
                                id="gender"
                                options={gender}
                                value={filterGender()}
                                getOptionLabel={(option) => option.gender}
                                onChange={(event: any, newInputValue: any) => {
                                    setProduct({ ...product, gender: newInputValue });
                                }}
                                sx={{ width: '30%' }}
                                renderInput={(params) => <TextField {...params} error={error.gender} label="Gender *" />}
                            />
                            {error.gender && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.gender}</FormHelperText>
                            </FormControl>}

                        </div>
                        <div className="container-input">
                            <FormGroup>
                                <FormControlLabel
                                    control={<Switch value={product?.is_new} checked={product?.is_new}
                                        onChange={(e) => setProduct({ ...product, is_new: e.target.checked })} />}
                                    label="New"
                                />
                            </FormGroup>
                        </div>
                        <div className="container-input">
                            <TextField
                                name="price"
                                value={`${product?.price}`}
                                onChange={handleChange}
                                label={'Price *'}
                                type={'number'}
                                error={error.price}
                            />
                            {error.price && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.price}</FormHelperText>
                            </FormControl>}

                        </div>
                    </div>
                    <div className="right">
                        <div className="imageContainer">
                            <div className="image">
                                {img ?
                                    <img src={img} alt="" /> : id_product ?
                                        <img style={{ borderColor: `${error.image && 'red'}` }} src={`http://localhost:8081/api/product/image/load/${product?.img}`} alt='' />
                                        : <img style={{ borderColor: `${error.image && 'red'}` }} src={require('../../../../image/frame.png')} alt='' />}
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
                    {id_product ? <Button sx={{ width: '150px' }} variant="outlined" onClick={handleSave}>Save</Button>
                        : <Button sx={{ width: '150px' }} variant="outlined" onClick={handleCreate}>Create new</Button>}
                </div>
            </div>
        </div>
    )
}

export default AddClothes;
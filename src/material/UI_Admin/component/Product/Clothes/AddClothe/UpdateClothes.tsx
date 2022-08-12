import React, { useState } from "react";
import './UpdateClothes.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
    TextField
    , Avatar
    , Autocomplete
    , Box
    , Button
} from "@mui/material";
import Axios from "../../../../../Axios";
import { useNavigate, useParams } from "react-router-dom";

const AddClothes = () => {
    const option = [
        { brand: 'Adidas', value: 1, img: 'data:image/png;base64,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' },
        { brand: 'Albania', phone: '355', value: 2, img: 'data:image/png;base64,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' },
        { brand: 'Armenia', phone: '374', value: 3, img: 'data:image/png;base64,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' },
        { brand: 'Angola', phone: '244', value: 4, img: 'data:image/png;base64,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' },
        { brand: 'Antarctica', phone: '672', value: 5, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAe1BMVEX///8AAAARERHr6+txcXGkpKSvr68NDQ3m5uZ9fX36+vrFxcXz8/OoqKjv7+/g4ODZ2dmNjY2WlpYZGRlsbGwkJCScnJzMzMxjY2O6urofHx9UVFRPT0/U1NTAwMAwMDCGhoZmZmZEREQ5OTk/Pz8sLCyJiYlJSUl/f38+Iza+AAAIVklEQVR4nO2da2OiOhCGRRQRUfFSFPG6bXf7/3/hQUkmCSSD27N2QOf5tEeoJi9J5pIJp9djGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGOYVSM7ULWgb0dnzNtSNaBeBV/BG3Yo2kZy8G0PqhrSG2cCTxNRtaQmppxhTN6YVTN48nYS6PfSEuWeyp24RNdHCq3GkbhQtWb8uibeibhUlyS+LIgVL6oaREY/tihT41G0jYupUxPPW1I2jYY9I8qr2+Ihq8k7dPBqqbolJRt08EuaoJl5E3T4S3Gbnym/q5pEQ4wMlpG4fCUNUky1182j4REV5zTTkBtXkRdOQuD1+zTRkiGrySvZ4nkPO9QvV5GXSkLNChy/5HxE+UOaUDf05UrOzWHT8ImnI46rsbA6fnFBRJoRt/RmSj3pncXs8omzuDzBba509wcdbVJTntscLR2cb7PGMss2PJRhVOwv22LKboTGgbPUj2bzXOwvOR1yTy+BA2fCHEdqXDLDHAarJL8qmP4j47OissseWUaQREDb+MSBOGeyBHlBNns0eV0oGTFQyALfHT5aG/EA7m8rbfPS2J9sWbEjO32mPnywNiSfnwfmIbPUFiudKQzYk5++0x5+UXfj3pGhnVTIAX3mezB5jludue/xk1ZD4ZvkO7luj953J2v8Q8OT8vfb4udKQCd5ZmBVL9LYc+4nuca893qH3PUM15BKC/AZ7DDVJGXpb97cFJyfNzt5rjx1lkILU9jvdocyYqFqjFdpZuO/elaeDyNpoFeTfa48H6H0dTkMqN30Bn/1BOws1wjN8oHS1GjLRk2YQ5N8bH+MrzwdNl/4n8cXohArycS9V1Qjj9riL1ZA1twuC/HvtMb7yjDpXfZHVwz213Yd7qSo5j9vjjp1OmFurxadw/c5Z0WCPu1QNGbuqa2D5xL3UPswKPBLo0OkE946FqjXCTx3ArGhYebqShtxgRSSwfDZkjWCzHLfHJ3sT2sYE7YQKZ3AvVc0KPDM3tTWhfeBeKuRSG7xUiKNxjTtSDYnPij7ch88KZY/xzNz55zv4HS5oJ2Bvs2EXBwZUQyTQDXt8794mbo89+D68bLYjaUhXPUW1E/guDsTRDfa4G9WQDbW/4FQ0eKkwoPBjLDt7I9rG0Bu50ZwKER/3rWj2+DSy31Le1xF7jPO+2u12/TE4vI404swrbtt9Yyc0XS4WzXe1izIAHMCkcFR4irX6rzUZzIeTeYdCoRtvD9UkScMsPXx1w0YDj9XkmIWXvbah1A0eq4k/Do/jaNsNpx94rCa9YBjFi67VqIAm8+xYkDke6Xc16c0Xy84VHoAmON/WpE3M5vPQuWUZ+XAVNAmPk4KjOU6u33KbTTZNotD9G7MwSeatOrlx3Jb7wG/rwnc/9VerlTroV8zxvK+ugiYiXaCZzUx8y+6ykRkWpUmcijz+6WveC73V9TdkAJAMRPJptW1LHYbxeqhPkX6E7KsRsMirao0FTYxE7vvE1CQy4uNcXC01CY1Nj1Ub0rSRPe8jNJnZd2lqmjjuE5oc7OmWmya1I3P0lRixIytdahI6TuRUNXHljkpNXFuCvv0vqePCyPX2hZsmM9chpYomzlNvN02cCc2rJnJ8nfL8j/45IRfZjlG+3upp9psmsJGzKq7q238VTWCs7bbrXC/buWqi0kqfxdWKJiINsy3Nkdh2/XK39weQo7pf+l6J2s26aiLrT05lOkw792ZqIneQP8r1caKm41UTufGR3/aHIu08oQ/WS7anTMrQnvMRM2cPXgYk5K+aiJGhQnewHoYmkfYnJVCPEah9DzheGutzZGBqksEFMsSar1fIyLMmYxhEeiJZPnNDk7QqidrDCOAL9ToCOd58UE/MnV58SAoOlDHgGfql+IQeCgEM73Jl0aRMVxsVnnJwBPL7jNe0SVvja4Ub+0U2b0U4XHHPbgSgSdmbs+2qrkkM3df4kh+Kq6Z/OgBNTJv0fkmpK91Eeye2DwtNbFf9uiaJZbDJWRnIq2aYcwRN6m9i+kO7v+HbeiOmx1iO/8rVaj42FJvCfXPgQwxYDoRK6XSiNLE4L6SVor5qmsZOaGJXzKVJ5fW5FU0qx7vm2g9bdhQv/7qjf4GYJmb2U1jWsfzHwfYnuibiSZuBfiI1sc4dMwas1zNRpl3Kh27up0ykJuJqaruqayLmmLkMpLJzM5uyC12TgsPSDEQpXyZaPiFzKdiDJpfbP8xJ8auuibBe5tuBRvDAy5DYOEQrvX1j0s4OwRmCC8LsUgY9rH501UTYXX0YySSJoYnwcvRwVnp+AVT66cNIurl+L5wGBdND9fspHVmv2m3IZoyVz646C+uhoYmMilVtNOSXArXZrmYPlC74ci1Si+qeXhOZRMvLXLn2jvqrIyedzEHZxJlaDM0YUD73cTnkfVV+fl0s5VKxLKeoVn3rg+zQIOH2k3q0EMLmy2Gql9JfNVFn2LbF1Yt21dRElbdd0uFSf43DVROVNRoUV/U6Uh9yFbkQQTwT2jeXObNBN4ffmQ2q5E+ctXw3o+osQfGVYP10kxwyGTETn1BwdbsMglwlWtXco+tAfulouGqfrlPS9s4H8hfqOAqORGDoGAG1HLUj5SqcL8exhdsyVa94O9HHx7F5IkdkIGWwXPmfpWyr+8Wh/b6LoUlvY4Z6a02T2hgb00tScFB10duJcLeUz7JRi+bgIKx3YTyzfFuQK6u5WWv3CbdMmfFAbXb8Ds1AKx5qJ8rO1MkCINoMF4vldGN/RPEEu6p/y3Tpvs/P0uJbAmuf/ck0XabTY8eKcRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYZ6L/wAU8l6/y/zydQAAAABJRU5ErkJggg==' },
        { brand: 'Argentina', phone: '54', value: 6, img: 'data:image/png;base64,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' },
        { brand: 'American Samoa', phone: '1-684', value: 7, img: 'data:image/png;base64,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' }]
    const [testSelect, setTestSelect] = useState({ brand: 'Adidas', value: 1, img: 'data:image/png;base64,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' });
    const [searchBrand, setSearchBrand] = useState('');
    const navigate = useNavigate();
    const { id_product } = useParams();
    const [img, setImg] = useState<any | null>('');
    const [formData, setFormData] = useState<FormData>(new FormData());
    const handleChangeSearchBrand = (e: any) => {
        console.log(e.target.value);
        setSearchBrand(e.target.value);
    }
    const handleImage = (e: any) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                formData.delete('file');
                setImg(URL.createObjectURL(e.target.files[0]));
                formData.append('file', e.target.files[0]);
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const handleSave = () => {
        console.log(formData.get('file'));
        Axios.post("product/image/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((res) => {
                alert(res.data);
                navigate(-1);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const handleCancel = () => {
        navigate(-1);
    }
    const handleCreate = () => {
        alert('create');
        navigate(-1);
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
                            <div className="bottom">
                                <TextField sx={{ width: '100%' }} label={'Name *'} />
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="top">
                                <label>Descriptions <span>*</span></label>
                            </div>
                            <div className="bottom">
                                <CKEditor key={1}
                                    editor={ClassicEditor}
                                    data=""
                                    onReady={(editor: any) => {
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event: any, editor: any) => {
                                        const data = editor.getData();
                                        console.log({ event, editor, data });
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
                            <div className="bottom">
                                <Autocomplete
                                    id="select-brand"
                                    sx={{ width: '100%' }}
                                    options={option}
                                    autoHighlight
                                    getOptionLabel={(option) => option.brand}
                                    value={testSelect}
                                    onChange={(event: any, newInputValue: any) => {
                                        setTestSelect(newInputValue);
                                        console.log(newInputValue);
                                    }}
                                    renderOption={(props: any, option: any) => (
                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                            <Avatar
                                                src={`${option.img}`}
                                                alt=""
                                                style={{ marginRight: '5px' }}
                                            />
                                            {option.brand}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            sx={{ width: '100%' }}
                                            label="Brand *"
                                            value={searchBrand}
                                            onChange={handleChangeSearchBrand}
                                            inputProps={{
                                                ...params.inputProps,
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="bottom">
                                <Autocomplete
                                    disablePortal
                                    id="discount"
                                    options={option}
                                    getOptionLabel={(option) => option.brand}
                                    sx={{ width: '100%' }}
                                    renderInput={(params) => <TextField {...params} label="Discount *" />}
                                />
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="bottom">
                                <Autocomplete
                                    disablePortal
                                    id="material"
                                    options={option}
                                    getOptionLabel={(option) => option.brand}
                                    sx={{ width: '100%' }}
                                    renderInput={(params) => <TextField {...params} label="Material *" />}
                                />
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="bottom">
                                <Autocomplete
                                    disablePortal
                                    id="label"
                                    options={option}
                                    getOptionLabel={(option) => option.brand}
                                    sx={{ width: '100%' }}
                                    renderInput={(params) => <TextField {...params} label="Label *" />}
                                />
                            </div>
                        </div>
                        <div className="container-input">
                            <div className="bottom">
                                <TextField
                                    label={'Price *'}
                                    type={'number'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="imageContainer">
                            <div className="image">
                                {img ?
                                    <img src={img} alt="" /> : <img src={require('../../../../image/frame.png')} alt=''></img>}
                            </div>
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
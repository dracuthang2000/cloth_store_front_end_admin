import React, { useState, useEffect } from "react";
import './ItemColor.css';
import { CircleOutlined, CheckCircle } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import Axios from "../../../../Axios";
import ColorAndSize from "./ColorAndSize";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const ItemColor = (props: any) => {
    const handleClickCheckBox = () => {
        props.setIsCheck(() => {
            return { check: true, id: props.colorId };
        });
        // loadSize();
    }
    // const loadSize = () => {
    //     Axios.get(`product/get-product-color-by-color-id?id=${props.id}`)
    //         .then(res => {
    //             const listSize = res.data.color_size;
    //             let index = 0;
    //             let tempArr = [] as any;
    //             let flag = true;
    //             listSize.map((s: any) => {
    //                 tempArr[index] = {
    //                     id: s.id,
    //                     size: s.size.size,
    //                     quantity: s.quantity,
    //                     select: false
    //                 }
    //                 index++;
    //             });
    //             tempArr.sort((a: any, b: any) => {
    //                 return a.id - b.id;
    //             })
    //             for (var i in tempArr) {
    //                 if (tempArr[i].quantity !== 0) {
    //                     tempArr[i].select = true;
    //                     props.setIsSelectSize({ id: tempArr[i].id, select: tempArr[i].select, quantity: tempArr[i].quantity })
    //                     flag = false;
    //                     break;
    //                 }
    //             }
    //             if (flag) {
    //                 props.setIsSelectSize({ id: tempArr[0].id, select: tempArr[0].select, quantity: tempArr[0].quantity })
    //             }
    //             props.setSizes(tempArr)
    //         }).catch(error => {
    //             console.log(error);
    //         })
    // }
    const handleClick = () => {
        console.log(props.item);

        props.setOpen(true);
        props.setIsChooseColor(props.item);
    }
    return (
        <div className="container-item-color">
            <div className={`card`} onClick={handleClick}>
                {props.item.image_byte ? <img src={props.item.image_byte} className="card-img" /> : <img src={`http://localhost:8081/api/product/image/load/${props.item.image_name}`} className="card-img" />}
                <div className="card-color">
                    <label>{props.item.color.color}</label>
                </div>
            </div>
        </div >
    )
}

export default ItemColor;
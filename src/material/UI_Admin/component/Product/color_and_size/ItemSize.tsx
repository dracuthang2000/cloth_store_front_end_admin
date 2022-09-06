import React from "react";
import './ItemSize.css'
const ItemSize = (props: any) => {
    return (
        <div className={`card ${props.select ? 'select' : ''}`}>
            <div>
                <label>Size:<span style={{ fontWeight: '500' }}>{props.item.size.size}</span> </label>
            </div>
            <div>
                <label>Quantity:<span style={{ fontWeight: '500' }}>{props.item.quantity}</span> </label>
            </div>
        </div>
    )
}
export default ItemSize;
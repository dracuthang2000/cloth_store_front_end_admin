import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Error from "../component/Error/Error";
import Home from "../component/Home/Home";
import Layout from "../component/layout/Layout";
import Login from "../component/Login";
import Order from "../component/order/Order";
import OrderDetail from "../component/order/OrderDetail";
import UpdateClothes from "../component/Product/Clothes/AddClothe/UpdateClothes";
import Product from "../component/Product/Product";

const Main = () => {
    const admin = true;
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route element={<Layout admin={admin} />}>
                <Route index element={<Home />} />
                <Route path="product" element={<Product />} />
                <Route path="product/add-clothes" element={<UpdateClothes />} />
                <Route path="order" element={<Order />} />
                <Route path="order/order-detail/:id_bill" element={<OrderDetail />} />
            </Route>
            <Route path="/error" element={<Error />} />
        </Routes>
    )
}
export default Main;
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Delivery from "../component/delivery/Delivery";
import Error from "../component/Error/Error";
import Home from "../component/Home/Home";
import Layout from "../component/layout/Layout";
import Login from "../component/login/Login";
import Order from "../component/order/Order";
import OrderDetail from "../component/order/OrderDetail";
import UpdateClothes from "../component/Product/Clothes/AddClothe/UpdateClothes";
import Product from "../component/Product/Clothes/ClotheScreen/Product";
import ReportReceipt from "../component/report/ReportReceipt";
import ReportRevenue from "../component/report/ReportRevenue";

const Main = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="product" element={<Product />} />
                <Route path="product/update-clothes/:id_product" element={<UpdateClothes />} />
                <Route path="product/update-clothes" element={<UpdateClothes />} />
                <Route path="order" element={<Order />} />
                <Route path="order/order-detail/:id_bill" element={<OrderDetail />} />
                <Route path="report" element={<ReportRevenue />} />
                <Route path="report/receipt" element={<ReportReceipt />} />
                <Route path="/delivery" element={<Delivery />} />
            </Route>
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}
export default Main;
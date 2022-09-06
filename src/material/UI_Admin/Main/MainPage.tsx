import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import Delivery from "../component/delivery/Delivery";
import Error from "../component/Error/Error";
import Home from "../component/Home/Home";
import Layout from "../component/layout/Layout";
import Login from "../component/login/Login";
import Order from "../component/order/Order";
import OrderDetail from "../component/order/OrderDetail";
import Brands from "../component/Product/brand/Brands";
import UpdateBrand from "../component/Product/brand/UpdateBrand";
import UpdateClothes from "../component/Product/Clothes/AddClothe/UpdateClothes";
import Product from "../component/Product/Clothes/ClotheScreen/Product";
import Colors from "../component/Product/color_and_size/ListColor";
import UpdateColor from "../component/Product/color_and_size/UpdateColor";
import Labels from "../component/Product/label/Labels";
import UpdateLabel from "../component/Product/label/UpdateLabel";
import Materials from "../component/Product/material/Materials";
import UpdateMaterial from "../component/Product/material/UpdateMaterial";
import ReportReceipt from "../component/report/ReportReceipt";
import ReportRevenue from "../component/report/ReportRevenue";

const Main = () => {
    const [accessToken, setAccessToken] = useState('');
    const [staff, setStaff] = useState('' as any)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    // useEffect(() => {
    //     if (loading) {
    //         if (sessionStorage.getItem('accessToken')) {
    //             Axios.get(`admin/information/me`, {
    //                 headers: {
    //                     'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
    //                 }
    //             })
    //                 .then((res) => {
    //                     setStaff(res.data);
    //                     if (res.data.role.id == 2) {
    //                         navigate('/');
    //                     } else {
    //                         navigate('/delivery');
    //                     }
    //                     setLoading(false);
    //                 }).catch((e) => {
    //                     console.log(e);
    //                 })
    //         }
    //     }
    // }, [])
    return (
        <Routes>
            <Route path="login" element={<Login setAccessToken={setAccessToken} setLoading={setLoading} />} />
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="product" element={<Product />} />
                <Route path="product/update-clothes/:id_product" element={<UpdateClothes />} />
                <Route path="product/update-clothes" element={<UpdateClothes />} />
                <Route path="order" element={<Order />} />
                <Route path="order/order-detail/:id_bill" element={<OrderDetail />} />
                <Route path="product/color" element={<Colors />} />
                <Route path="product/label" element={<Labels />} />
                <Route path="product/material" element={<Materials />} />
                <Route path="product/brand" element={<Brands />} />


                <Route path="product/color/update-color/:id_color" element={<UpdateColor />} />
                <Route path="product/label/update-label/:id_label" element={<UpdateLabel />} />
                <Route path="product/material/update-material/:id_material" element={<UpdateMaterial />} />
                <Route path="product/material/update-material/" element={<UpdateMaterial />} />
                <Route path="product/label/update-label" element={<UpdateLabel />} />
                <Route path="product/color/update-color" element={<UpdateColor />} />
                <Route path="product/brand/update-brand/:id_brand" element={<UpdateBrand />} />
                <Route path="product/brand/update-brand" element={<UpdateBrand />} />

                <Route path="report" element={<ReportRevenue />} />
                <Route path="report/receipt/:id_bill" element={<ReportReceipt />} />
                <Route path="/delivery" element={<Delivery />} />
            </Route>
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}
export default Main;
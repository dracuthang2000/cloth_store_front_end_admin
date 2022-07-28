import axios from "axios";
const BASE_URL = 'http://localhost:8081/api';

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Authorization': `${localStorage.getItem("accessToken") !== null ? 'Bearer ' + localStorage.getItem("accessToken") : ''}`
    }
})
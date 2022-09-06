import axios from "axios";
const BASE_URL = 'http://localhost:8081/api';

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `${sessionStorage.getItem("accessToken") !== null ? 'Bearer ' + sessionStorage.getItem("accessToken") : ''}`
    }
})
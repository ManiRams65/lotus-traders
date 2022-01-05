import cookie from "cookie"
import axios from 'axios'
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
export const baseUrl = publicRuntimeConfig.backendUrl;
import { toast } from 'react-toastify';

export function parseCookies(req) {
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}


const axiosInstance = axios.create({
    baseURL: baseUrl,
})

axiosInstance.interceptors.request.use((req) => {
    req.headers = {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
    }
    return req;
})

axiosInstance.interceptors.response.use(
    response => response,
    (error) => {
        toast.error(error.response.data.payload);
    });


export default { axiosInstance, parseCookies };
import cookie from "cookie"
import axios from 'axios'
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
export const baseUrl = publicRuntimeConfig.backendUrl;
import { toast } from 'react-toastify';
import Router from 'next/router';
import { useCookies } from "react-cookie"

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
        if (error.response.data.code == 401) {
            // if (error.responce.data.payload == 'Invalid username/password') {
            //     toast.error(error.response.data.payload);
            // } else {
            //     signOut();
            // }
            if (error.response.data.payload == "Invalid username/password") {
                toast.error(error.response.data.payload);
            } else {
                signOut();
            }
        } else {
            toast.error(error.response.data.payload);
        }
        Promise.reject(error.response);
    });


export default { axiosInstance, parseCookies };

export const signOut = () => {
    Router.push('/logout');
    // localStorage.removeItem('token');
}
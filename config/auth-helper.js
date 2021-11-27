import cookie from "cookie"
import axios from 'axios'
import { baseUrl } from './config'

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

export default { axiosInstance, parseCookies };
import axios from 'axios'
import {Token} from "../shared/Schema";

// 1. Create an axios instance that you wish to apply the interceptor to
const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    return Promise.reject(error);
})

export async function analyzeText(text: string): Promise<Token[]> {
    return axiosInstance.post(`http://localhost:5000/api/analyse`, {'text': text})
}

import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3500/'
})

axiosInstance.interceptors.request.use(request => {
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userid');
    request.headers.authorization = token || "hello"
    request.headers.UserId = userid || "userId"
    return request
})

export default axiosInstance;
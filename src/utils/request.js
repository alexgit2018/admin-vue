import axios from 'axios' // 导入node_modules里的axios
import { getToken } from '@/utils/token'
//axios.defaults.baseURL = process.env.API_ROOT; // 后端测试接口 ip:port
// axios.defaults.baseURL = window.api.BASE_URL;
const service = axios.create({
    baseURL: window.api.BASE_URL
})

service.interceptors.request.use((request) => {
    request.headers['SignToken'] = getToken()
    return request
}, (error) => {
    console.log('错误的传参');
    return Promise.reject(error);
});

service.interceptors.response.use(response => {
    const data = response.data
    if(data){
        switch(data.errno){
            case 500:
            default:
        }
    }
    return data
})

export default service // 导出axios
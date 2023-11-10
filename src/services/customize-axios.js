import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reqres.in/api/'
});


// Add a response interceptor ~ middleware (req/res)
//https://github.com/axios/axios#interceptors

instance.interceptors.response.use(function (response) {
    return response.data ? response.data : { statusCode: response.status };
}, function (error) {
    return Promise.reject(error);
});

export default instance;
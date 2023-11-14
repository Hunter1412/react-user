import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reqres.in/api/'
});


// Add a response interceptor ~ middleware (req/res)
//https://github.com/axios/axios#interceptors

instance.interceptors.response.use(function (response) {
    return response.data ? response.data : { statusCode: response.status };
}, function (error) {
    let res = {};
    if (error.response) {
        res.data = error.response.data;
        res.status = error.response.status;
        res.headers = error.response.headers;
    } else if (error.request) {
        console.log(`error request>>`, error.request);
    } else {
        console.log(`error message>>`, error.message);
    }
    return res;
    // return Promise.reject(error);
});

export default instance;
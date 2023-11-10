import axios from './customize-axios';

const fetchAllUser = async (page) => {
    return await axios.get(`users?page=${page}`);
}

const postCreateUser = async (name, job) => {
    return await axios.post("users", { name, job });
}

const putUpdateUser = async (id, name, job) => {
    return await axios.put(`users/{id}`, { name, job });
}

export { fetchAllUser, postCreateUser, putUpdateUser }
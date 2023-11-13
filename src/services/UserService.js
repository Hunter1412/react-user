import { toast } from 'react-toastify';
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

const deleteUser = async (id) => {
    return await axios.delete(`users/{id}`);
}

const loginApi = async (email, password) => {
    try {
        return await axios.post("login", { email, password });
    } catch (error) {
        console.log(`Error:`, error);
        toast.error("Error");
    }
}

export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser, loginApi }
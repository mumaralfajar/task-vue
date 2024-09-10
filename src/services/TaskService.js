import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks';

export default {
    getTasks(page = 1, size = 5) {
        return axios.get(`${API_URL}?page=${page}&size=${size}`);
    },
    getTaskById(id) {
        return axios.get(`${API_URL}/${id}`);
    },
    createTask(task) {
        return axios.post(API_URL, task);
    },
    updateTask(id, task) {
        return axios.put(`${API_URL}/${id}`, task);
    },
    deleteTask(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
};

// src/api.js
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/v1/users", // backend URL
    withCredentials: true // important for cookies/auth
});

export const createTask = async (taskData) => {
    const res = await API.post("/task", taskData);
    return res.data;
};

export const getAllTasks = async () => {
    const res = await API.get("/alltasks");
    return res.data;
};

export const updateTask = async (id, taskData) => {
    const res = await API.put(`/update/${id}`, taskData);
    return res.data;
};

export const deleteTask = async (id) => {
    const res = await API.delete(`/delete/${id}`);
    return res.data;
};

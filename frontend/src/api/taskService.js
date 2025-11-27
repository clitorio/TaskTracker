import api from "./axios";

export const getTasks = async () => {
    const res = await api.get("/api/tasks");
    return res.data.data;
}

export const createTask = async (data) => {
    const res = await api.post("/api/tasks", data);
    return res.data.data;
}
export const updateTask = async (id, data) => {
    const res = await api.put(`/api/tasks/${id}`, data);
    return res.data.data;
}

export const deleteTask = async (id) => {
    const res = await api.delete(`/api/tasks/${id}`);
    return res.data;
}
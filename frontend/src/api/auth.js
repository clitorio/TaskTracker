import api from "./axios"

export const getCsrf = () => api.get("/sanctum/csrf-cookie");

export const signin = async (email, password) => {
    //await getCsrf();
    return api.post("/login", { email, password });
};

export const signout = () => api.post("/logout");

export const getUser = async () => {
     try {
        const response = await api.get("/api/user");
        return response.data;
    } catch (error) {
        return null; // not logged in
    }
}

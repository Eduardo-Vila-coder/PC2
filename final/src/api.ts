import axios, { AxiosError } from "axios";
import type { ApiError, LoginResponse, MentorItem, MentorPage, MentorRequest, StudEmailPass, StudNameEmailPass } from "./types";

const baseURL = "https://mentoriautec-api.aaron-navarro.workers.dev";

export const api = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" }
});

api.interceptors.response.use(
    (response: any) => response,
    (error: AxiosError<ApiError>) => {
        // Si el servidor responde con 401 (No autorizado)
        if (error.response?.status === 401 && !error.config?.url?.includes("/login")) {
            // Limpiar datos de sesión
            localStorage.removeItem('token');
            // Redirigir al login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    });


export async function postRegister(body: StudNameEmailPass) {
    const {data} = await api.post("/api/auth/register", body);
    return data
}

export async function postLogin(body:StudEmailPass):Promise<LoginResponse> {
    const {data} = await api.post("/api/auth/login", body);
    return data;
}

export async function getMentorsPage(token: string, actualPage: number, pageSize: number): Promise<MentorPage> {
    const {data} = await api.get(`/api/mentors?page=${actualPage}&size=${pageSize}`, {
        headers: {Authorization: `Bearer ${token}`}
    });
    return data;
}

export async function getMentorDetail(id:number, token: string): Promise<MentorItem> {
    const {data} = await api.get(`/api/mentors/${id}`, {
        headers: {Authorization: `Bearer ${token}`}
    });
    return data;
}

export async function postMentorRequest(body:MentorRequest, token: string): Promise<Request> {
    const {data} = await api.post("/api/mentors/:id/requests", body, {
        headers: {Authorization: `Bearer ${token}`}
    });
    return data;
}

export async function getMyRequest(token: string): Promise<Request[]> {
    const {data} = await api.get("/api/me/requests", {
        headers: {Authorization: `Bearer ${token}`}
    });
    return data;
}


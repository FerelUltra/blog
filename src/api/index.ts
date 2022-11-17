import axios from "axios";
import {putProfile} from "../store/reducers/profileReducer";
export const baseURL = 'https://blog.kata.academy/api'
export const baseURL2 = 'https://api.realworld.io/api/'

export function getCookie(name: string) {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    if (match) return match[2];
}

export async function getArticles(offset: number){
    try {
        const response = await fetch(`${baseURL}/articles?limit=5&offset=${offset}`)
        const data = await response.json()
        return data
    } catch (e){
        console.log(e)
    }
}
export async function postUser(username: string, email: string, password: string){
        return axios.post(`${baseURL}/users`, {
            user: {
                username,
                email,
                password
            }
        }).then((response)=>{
            console.log(response, 'what')
            putProfile(response)
            return response.data
        }).catch((data)=>{
            throw data.response.data
        })
}
export function signIn(user: any) {
    return axios
        .post(`${baseURL}/users/login`, {
            user,
        })
        .then((response) => response.data)
        .catch((data) => {
            throw data.response.data;
        });
}

export function editProfile(user: any) {
    return axios
        .put(
            `${baseURL}/user`,
            {
                user,
            },
            {
                headers: { authorization: `Bearer ${getCookie('token')}` },
            },
        )
        .then((response) => response.data)
        .catch((data) => {
            throw data.response.data;
        });
}

export function getMe() {
    return axios
        .get(`${baseURL }/user`, {
            headers: { authorization: `Bearer ${getCookie('token')}` },
        })
        .then<{ user: any }>((response) => response.data)
        .catch((data) => {
            throw data.response.data;
        });
}

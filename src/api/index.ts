import axios from "axios";
import {putProfile} from "../store/reducers/profileReducer";
export const baseURL = 'https://blog.kata.academy/api'
export const baseURL2 = 'https://api.realworld.io/api/'

const header = () => ({ headers: { authorization: `Bearer ${getCookie('token')}` } });
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
function postApi(offset = 0, username?: string) {
    const favorited = username ? `&favorited=${username}` : '';
    return axios
        .get(`${baseURL}/articles?limit=5&offset=${offset}${favorited}`)
        .then((response) => {
            if (response.status === 401) {
                throw Error('unauthorized');
            }
            return response.data;
        });
}

export function getPostBySlug(slug: string) {
    return axios.get(`${baseURL}/articles/${slug}`).then((response) => {
        if (response.status === 401) {
            throw Error('unauthorized');
        }
        return response.data;
    });
}

export function newArticle(body: any) {
    return axios
        .post(`${baseURL}/articles`, { article: body }, header())
        .then((response) => {
            if (response.status === 401) {
                throw Error('unauthorized');
            }
            return response.data;
        });
}

export function editArticle(body: any, slug: string) {
    return axios
        .put(`${baseURL}/articles/${slug}`, { article: body }, header())
        .then((response) => {
            if (response.status === 401) {
                throw Error('unauthorized');
            }
            return response.data;
        });
}

export function deleteArticle(slug: string) {
    return axios
        .delete(`${baseURL}/articles/${slug}`, header())
        .then((response) => {
            if (response.status === 401) {
                throw Error('unauthorized');
            }
            return response.data;
        });
}

export function favoriteArticle(slug: string) {
    return axios
        .post(`${baseURL}/articles/${slug}/favorite`, {}, header())
        .then((response) => {
            if (response.status === 401) {
                throw Error('unauthorized');
            }
            return response.data;
        });
}

export function deleteFavoriteArticle(slug: string) {
    return axios
        .delete(`${baseURL}/articles/${slug}/favorite`, header())
        .then((response) => {
            if (response.status === 401) {
                throw Error('unauthorized');
            }
            return response.data;
        });
}

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {getArticles} from "../../api";

export const fetchArticles = createAsyncThunk(
    'tickets/fetchTicketsId',
    getArticles
)

export interface IArticleState {
    articles: [],
    title: string,
    description: string,
    body: string,
    date: string,
    tags: string[],
    favorited: boolean,
    favoriteCount: number,
    author: Record<string, unknown>
}

const initialState: IArticleState = {
    articles: [],
    title: '',
    description: '',
    body: '',
    date: '',
    tags: [],
    favorited: false,
    favoriteCount: 0,
    author: {}
}

export const articleSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        putCurrentArticle: (state, action) => {
            const  {title, description, body, date, tags, favorited, favoriteCount, author} = action.payload
            state.title = title
            state.description = description
            state.body = body
            state.date = date
            state.tags = tags
            state.favorited = favorited
            state.favoriteCount = favoriteCount
            state.author = author
        },
        setPostFavorite: (
            state,
            action: any,
        ) => {
            const { slug, favorited, favoritesCount } = action.payload;
            state.articles.forEach((item) => {
                if (item.slug === slug) {
                    item.favorited = favorited;
                    item.favoritesCount = favoritesCount;
                }
            });
            // if (state.fullPostItem?.slug === slug) {
            //     state.fullPostItem.favorited = favorited;
            //     state.fullPostItem.favoritesCount = favoritesCount;
            // }
        },
    },

    extraReducers: {
        [fetchArticles.fulfilled]: (state: any, action: any) => {
            state.articles = action.payload.articles
        },
    }
})

export const {putCurrentArticle, setPostFavorite} = articleSlice.actions

// Action creators are generated for each case reducer function


export default articleSlice.reducer

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {getArticles} from "../../api";


export interface IProfileState {
    username: string,
    email: string,
    image: string
}

const initialState: IProfileState = {
    username: '',
    email: '',
    image: ''
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        putProfile: (state, action) => {
            const  {username, email, image} = action.payload
            state.username = username
            state.email = email
            state.image = image
        }
    }
})

export const {putProfile} = profileSlice.actions

// Action creators are generated for each case reducer function


export default profileSlice.reducer

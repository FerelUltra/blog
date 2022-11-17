import { configureStore } from '@reduxjs/toolkit'
import articleReducer from "./reducers/articleReducer";
import profileReducer from "./reducers/profileReducer";

export const store = configureStore({
    reducer: {
        articles: articleReducer,
        profile: profileReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

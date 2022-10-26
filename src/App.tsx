import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store/store";
import {Routes, Route, Link} from "react-router-dom";
import {Articles} from "./components/Articles";
import {fetchArticles} from "./store/reducers/articleReducer";
import {WholeArticle} from "./components/WholeArticle";

function App() {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchArticles(0))
    }, [])
    return (
        <div className="wrap">
            <div className="App">
                <Routes>
                    <Route path="/" element={<Articles/>}/>
                    <Route path="/articles" element={<Articles/>}/>
                    <Route path="/articles/:slug" element={<WholeArticle/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;

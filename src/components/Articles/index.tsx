import {Header} from "../Header";
import styles from './Articles.module.css'
import {useDispatch, useSelector} from "react-redux";
import {Article} from "../Article";
import {RootState} from "../../store/store";
import {useState} from "react";
import {fetchArticles} from "../../store/reducers/articleReducer";
export const Articles = () => {
    const articles = useSelector((state: RootState) => state.articles.articles)
    const dispatch = useDispatch()
    const pages = articles ? Math.ceil(articles.length/5) : 5
    return (
        <>
            <Header/>
            <main className={styles.main}>
                {articles ? articles.map( (el: any)=> <Article key={el.slug}
                                                               slug={el.slug}
                                                               title={el.title}
                                                               description={el.description}
                                                               body={el.body}
                                                               date={el.createdAt}
                                                               tags={el.tagList}
                                                               favorited={el.favorited}
                                                               favoriteCount={el.favoriteCount}
                                                               author={el.author}
                />) : null}
                <section>{new Array(136).fill(1).map((el: any, i)=> <button onClick={()=>{dispatch(fetchArticles(i*5))}}>{i+1}</button>)}</section>
            </main>

        </>
    )
}

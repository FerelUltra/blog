import styles from './WholeArticle.module.css'

interface IAuthor {
    username: string,
    image: string
}

import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {putCurrentArticle} from "../../store/reducers/articleReducer";
import {Header} from "../Header";

interface IArticle {
    slug: string,
    title: string,
    description: string,
    body: string,
    date: string,
    tags: string[],
    favorited: boolean,
    favoriteCount: number,
    author: IAuthor
}

export const WholeArticle = () => {
    const {slug} = useParams()
    const {
        title,
        description,
        body,
        date,
        tags,
        favorited,
        favoriteCount,
        author
    } = useSelector((state: RootState) => state.articles)
    console.log(useParams())
    console.log(tags)
    return (
        <>
            <Header/>
            <main className={styles.main}>
                <article className={styles.article}>
                    <section className={styles.up}>
                        <div className={styles.link}>
                            <span>{title}</span>
                            <div className={styles.like}>
                                <img src="heart.svg" alt=""/>
                                <span>{favoriteCount}</span>
                            </div>
                        </div>
                        <div className={styles.profile}>
                            <div className={styles.data}>
                                <p>{author.username}</p>
                                <p>{date}</p>
                            </div>
                            <img src={author.image} className={styles.picture}>

                            </img>

                        </div>
                    </section>

                    <section className={styles.tags}>{tags.map(el => {
                        return <div className={styles.tag}>{el}</div>
                    })}</section>

                    <section>{description}</section>
                </article>
            </main>
        </>
    )
}

import styles from './Article.module.css'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {putCurrentArticle, setPostFavorite} from "../../store/reducers/articleReducer";
import { deleteFavoriteArticle, favoriteArticle } from '../../api';

interface IAuthor {
    username: string,
    image: string
}

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

export const Article = ({slug, title, description, body, date, tags, favorited, favoriteCount, author}: IArticle) => {
    const dispatch = useDispatch()
    const onClickLike = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (favorited) {
            deleteFavoriteArticle(slug).then((data) => {
                dispatch(setPostFavorite(data.article));
            });
        } else {
            favoriteArticle(slug).then((data) => {
                dispatch(setPostFavorite(data.article));
            });
        }
    };
    return (
        <article className={styles.article}>
            <section className={styles.up}>
                <div className={styles.link}>
                    <Link onClick={() => {
                        dispatch(putCurrentArticle({
                            slug,
                            title,
                            description,
                            body,
                            date,
                            tags,
                            favorited,
                            favoriteCount,
                            author
                        }))
                    }} to={`/articles/${slug}`}>{title}</Link>
                    <div className={styles.like} onClick={onClickLike}>
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
    )
}

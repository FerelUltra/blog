import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {putCurrentArticle} from "../../store/reducers/articleReducer";
import { Header } from '../Header';
import styles from './NewArticle.module.css'
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Tags} from "../Tags";
import {Tag, ArticleData} from '../../types'
import { editArticle, newArticle } from "../../api";
export const NewArticle = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [tags, setTags] = useState<Tag[]>([{ value: '', id: uuidv4() }]);
    const [error, setError] = useState(false);
    const dispatch = useDispatch()
    const addTag = () => {
        setTags((prev) => [...prev, { value: '', id: uuidv4() }]);
    };

    const deleteTag = (id: string) => {
        setTags((prev) => prev.filter((item) => item.id !== id));
    };

    const changeTagValue = (value: string, id: string) => {
        setTags((prev) => prev.map((item) => (item.id === id ? { value, id } : item)));
    };
    useEffect(() => {
        if (!document.cookie.includes('token')) {
            navigate('/');
        }
    }, [navigate]);
    const formData = useForm<ArticleData>({
        mode: 'onBlur',
    });
    const onSubmit = formData.handleSubmit(({ title, description, body }) => {
        const articleBody = { title, description, body, tagList: tags.map((item) => item.value) };
        if (window.location.pathname.includes('/edit')) {
            editArticle(articleBody, params.slug as string)
                .then((data) => {
                    navigate(`/articles/${data.article.slug}`);
                })
                .catch(() => {
                    setError(true);
                });
        } else {
            newArticle(articleBody).then((data) => {
                navigate(`/articles/${data.article.slug}`);
            });
        }
    });
    return (
        <>
        <Header/>
            <main className={styles.main}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" placeholder="title"{...formData.register('title',{
                        required: 'title is required',
                        minLength: 3
                    })}/>
                    <label htmlFor="description">Short description</label>
                    <input type="text" id="description" placeholder="description"{...formData.register('description',{
                        required: 'description is required',
                        minLength: 3
                    })}/>
                    <label htmlFor="body">Text</label>
                    <input type="text" id="body" placeholder="description"{...formData.register('body',{
                        required: 'text is required',
                        minLength: 3
                    })}/>
                    <Tags changeTagValue={changeTagValue} addTag={addTag} deleteTag={deleteTag} tags={tags} />
                    <input type="submit" value="Send"/>
                </form>
            </main>
        </>
    )
}

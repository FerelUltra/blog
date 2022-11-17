import styles from './Profile.module.css'
import {useForm} from "react-hook-form";
import {Header} from "../Header";
import {useRef} from "react";
import {editProfile} from '../../api';
import {useDispatch} from "react-redux";
import {putProfile} from "../../store/reducers/profileReducer";
import {useNavigate} from "react-router-dom";

export const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset,
        watch,
        setError
    } = useForm({
        mode: "onBlur"
    })
    const onSubmit = handleSubmit((data) => {
        editProfile({
            email: data.email,
            password: data.password,
            image: data.image,
            username: data.username,
        })
            .then((res) => {
                document.cookie = `token=${res.user.token}`;
                dispatch(putProfile(res.user));
                navigate('/');
            })
            .catch((res) => {
                Object.keys(res.errors).forEach((name) => {
                    setError(name, {message: res.errors[name]});
                });
            });
    });
    const password = useRef({})
    password.current = watch("password", "");
    const email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return (
        <>
            <Header/>
            <main className={styles.main}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <>Edit the profile</>
                    <label htmlFor="username">Username</label>
                    <input placeholder="Username" id='username' {...register('username', {
                        minLength: {
                            value: 3,
                            message: 'minimum is 3 symbols'
                        },
                        maxLength: {
                            value: 20,
                            message: 'maximum is 20 symbols'
                        }
                    })}/>
                    <div style={{height: '40px', color: 'red', alignSelf: 'self-start', marginLeft: '30px'}}>
                        {errors?.username?.message}
                    </div>
                    <label htmlFor="email">Email address</label>
                    <input placeholder="Email address" id='email' {...register('email', {
                        minLength: {
                            value: 6,
                            message: 'minimum is 6 symbols'
                        },
                        pattern: {
                            value: email,
                            message: 'not valid email'
                        }
                    })}/>
                    <div style={{height: '40px', color: 'red', alignSelf: 'self-start', marginLeft: '30px'}}>
                        {errors?.email?.message}
                    </div>
                    <label htmlFor="password">Password</label>
                    <input placeholder="enter password" name='password' id='password' {...register('password', {
                        minLength: {
                            value: 6,
                            message: 'minimum is 6 symbols'
                        },
                        maxLength: {
                            value: 40,
                            message: 'maximum is 40 symbols'
                        }
                    })}/>
                    <div style={{height: '40px', color: 'red', alignSelf: 'self-start', marginLeft: '30px'}}>
                        {errors?.password?.message}
                    </div>
                    <label htmlFor="image">Avatar image(url)</label>
                    <input placeholder="image" id='image' {...register('image', {
                        minLength: {
                            value: 6,
                            message: 'minimum is 6 symbols'
                        }
                    })}/>
                    <div style={{height: '40px', color: 'red', alignSelf: 'self-start', marginLeft: '30px'}}>
                        {errors?.image?.message}
                    </div>
                    <input type="submit" disabled={!isValid} value="Edit"/>
                </form>
            </main>
        </>
    )
}

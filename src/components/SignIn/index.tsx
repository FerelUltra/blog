import styles from './SignIn.module.css'
import {useForm} from "react-hook-form";
import {Header} from "../Header";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {signIn} from "../../api";
import {useDispatch} from "react-redux";
import {putProfile} from "../../store/reducers/profileReducer";

export const SingIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
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
    const onSubmit = (data: any) => {
        alert(JSON.stringify(data))
        signIn({ email: data.email, password: data.password })
            .then((res) => {
                document.cookie = `token=${res.user.token}`;
                dispatch(putProfile(res.user));
                navigate('/');
            })
            .catch(() => {
                const error = { message: 'email or password is invalid' };
                setError('email', error);
                setError('password', error);
            });
    }
    const password = useRef({})
    password.current = watch("password", "");
    const email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return (
        <>
            <Header/>
            <main className={styles.main}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <h1>Create new account</h1>
                    <label htmlFor="email">Email address</label>
                    <input placeholder="Email address" id='email' {...register('email', {
                        required: "The field is required",
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
                        { errors?.email?.message}
                    </div>
                    <label htmlFor="password">Password</label>
                    <input placeholder="enter password" id='password' {...register('password', {
                        required: "The field is required",
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
                    <input type="submit" disabled={!isValid} value="Login"/>
                </form>
            </main>
        </>
    )
}

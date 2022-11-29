import styles from './SignUp.module.css'
import {useForm} from "react-hook-form";
import {Header} from "../Header";
import {useRef} from "react";
import {postUser} from "../../api";
import {useNavigate} from "react-router-dom";
import {putProfile} from "../../store/reducers/profileReducer";
import {useDispatch} from "react-redux";

export const SingUp = () => {
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
    const navigate = useNavigate()
    const onSubmit = (data: any) => {
        alert(JSON.stringify(data))
        // reset()
        // postUser(data.username, data.email, data.password)
        postUser(data.username, data.email, data.password)
            .then((res)=>{
                document.cookie = `token=${res.user.token}`
                dispatch(putProfile(res.user))
                navigate('/')
            })
            .catch((res)=>{
                console.log(res.errors)
                Object.keys(res.errors).forEach((name) => {
                    console.log(res, 'res')
                    setError(name, { message: res.errors[name] });
                });
            })
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
                    <label htmlFor="username">Username</label>
                    <input placeholder="Username" id='username' {...register('username', {
                        required: "The field is required",
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
                    <input placeholder="enter password" name='password' id='password' {...register('password', {
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
                    <label htmlFor="repeat">Repeate password</label>
                    <input placeholder="repeat" id='repeat' {...register('repeat', {
                        required: "The field is required",
                        minLength: {
                            value: 6,
                            message: 'minimum is 6 symbols'
                        },
                        maxLength: {
                            value: 40,
                            message: 'maximum is 40 symbols'
                        },
                        validate: value =>
                            value === password.current || "The passwords do not match"
                    })}/>
                    <div style={{height: '40px', color: 'red', alignSelf: 'self-start', marginLeft: '30px'}}>
                        {errors?.repeat?.message}
                    </div>

                    <div style={{display: "flex"}}>
                        <input id="agreement" type="checkbox" {...register('agreement', {
                            required: true
                        })} />
                        <label htmlFor="agreement">I agree to the processing of my personal information</label>
                    </div>
                    <input type="submit" disabled={!isValid}/>
                </form>
            </main>
        </>
    )
}

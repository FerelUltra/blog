
import styles from './Header.module.css'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {putProfile} from "../../store/reducers/profileReducer";
export const Header = () =>{
    const username = useSelector((state: RootState) => state.profile.username)
    const dispatch = useDispatch()
    const logout = () => {
        document.cookie = 'token=; Max-Age=0';
        dispatch(putProfile({ email: '', username: '', image: '' }));
    };
    return (
        <header className={styles.header}>
            <Link to={'/'}>Realworld Blog</Link>
            {!username ? <div className={styles.buttons}>
                <Link to={'/signin'} className={styles.button}>Sign in</Link>
                <Link to={'/signup'} className={styles.button}>Sign up</Link>
            </div> :
            <div className={styles.login}>
                <button>Create article</button>
                <Link to={'/profile'}>{username}</Link>
                <button onClick={logout}>Log Out</button>
            </div>}

        </header>
    )
}

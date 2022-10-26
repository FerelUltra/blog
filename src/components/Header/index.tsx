
import styles from './Header.module.css'
export const Header = () =>{
    return (
        <header className={styles.header}>
            <span>Realworld Blog</span>
            <div className={styles.buttons}>
                <button className={styles.button}>Sign in</button>
                <button className={styles.button}>Sign up</button>
            </div>
        </header>
    )
}

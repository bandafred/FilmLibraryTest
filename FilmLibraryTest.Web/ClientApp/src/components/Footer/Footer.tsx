import * as React from "react";
import styles from "./Footer.module.css";

let Year = () => new Date().getFullYear();

const Footer = () => (
    <div className={styles.footer}>
        <div className={styles.copyright}>
            <span>&copy;{Year()} </span>
            <a
                href="https://career.habr.com/bandafred"
                target="_blank"
                className={styles.link}
            >
                Пучеглазов Антон Евгеньевич
            </a>
            <span> All rights reserved.</span>
        </div>
    </div>
);

export default Footer;

import { Logo } from 'src/components/atoms/Logo';
import { Typography } from 'src/components/atoms/Typography';
import styles from './footer.module.scss';
import { Contacts } from './partials/Contacts';
import { Top } from './partials/Top';

export const Footer: React.FC = () => {
    return (
        <footer className={styles.root}>
            <div className={styles.root__content}>
                <div className={styles.root__logo}>
                    <Logo />
                </div>
                <Top />
                <hr className={styles.root__line}></hr>
                <Contacts />
            </div>
        </footer>
    );
};

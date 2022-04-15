import Link from 'next/link';
import { Typography } from 'src/components/atoms/Typography';
import styles from './links.module.scss';

export const Links: React.FC = () => {
    return (
        <ul className={styles.root}>
            <a href="/agreement.pdf">
                <Typography
                    className={styles.root__links}
                    preset="common4"
                    color="body-0"
                    component="li"
                >
                    Соглашение
                </Typography>
            </a>
            <a href="/privacy.pdf">
                <Typography
                    className={styles.root__links}
                    preset="common4"
                    color="body-0"
                    component="li"
                >
                    Политика конфиденциальности
                </Typography>
            </a>
            <Link href="/payment-info">
                <a>
                    <Typography
                        className={styles.root__links}
                        preset="common4"
                        color="body-0"
                        component="li"
                    >
                        Порядок проведения оплаты
                    </Typography>
                </a>
            </Link>
        </ul>
    );
};

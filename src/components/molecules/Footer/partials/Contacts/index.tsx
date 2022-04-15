import { Typography } from 'src/components/atoms/Typography';
import styles from './contacts.module.scss';
import data from 'src/mocks/contacts.json';
import { useState } from 'react';
import { Breakpoint, useBreakpoints } from 'src/hooks/useBreakpoints';

export const Contacts: React.FC = () => {
    const [isDesktop, setIsDesktop] = useState<boolean>(false);

    useBreakpoints((breakpoint) => {
        setIsDesktop(breakpoint > Breakpoint.TABLET);
    });

    return (
        <div className={styles.root}>
            {isDesktop ? (
                <>
                    <ul className={styles.root__info}>
                        <Typography
                            className={styles.root__contacts}
                            preset="common5"
                            color="grey"
                            component="li"
                        >
                            ИП {data.ip}
                        </Typography>
                        <Typography
                            className={styles.root__contacts}
                            preset="common5"
                            color="grey"
                            component="li"
                        >
                            ИНН {data.inn}
                        </Typography>
                        <Typography
                            className={styles.root__contacts}
                            preset="common5"
                            color="grey"
                            component="li"
                        >
                            ОГРНИП {data.ogrn}
                        </Typography>
                    </ul>
                    <div className={styles.root__email}>
                        <Typography preset="common5" color="body-0">
                            Для связи:
                        </Typography>
                        <a
                            className={styles.root__info__link}
                            href={`mailto:${data.mail}`}
                        >
                            <Typography preset="common5" color="body-0">
                                {data.mail}
                            </Typography>
                        </a>
                    </div>
                </>
            ) : (
                <>
                    <ul className={styles.root__name}>
                        <Typography
                            className={styles.root__contacts}
                            preset="common5"
                            color="grey"
                            component="li"
                        >
                            ИП
                        </Typography>
                        <Typography
                            className={styles.root__contacts}
                            preset="common5"
                            color="grey"
                            component="li"
                        >
                            ИНН
                        </Typography>
                        <Typography
                            className={styles.root__contacts}
                            preset="common5"
                            color="grey"
                            component="li"
                        >
                            ОГРНИП
                        </Typography>
                        <Typography
                            className={styles.root__contacts}
                            preset="common5"
                            color="grey"
                            component="li"
                        >
                            Почта
                        </Typography>
                    </ul>
                    <ul className={styles.root__info}>
                        <Typography
                            className={styles.root__contacts}
                            preset="common5"
                            color="grey"
                            component="li"
                        >
                            {data.ip}
                        </Typography>
                        <Typography
                            className={styles.root__contacts}
                            preset="common5"
                            color="grey"
                            component="li"
                        >
                            {data.inn}
                        </Typography>
                        <Typography
                            className={styles.root__contacts}
                            preset="common5"
                            color="grey"
                            component="li"
                        >
                            {data.ogrn}
                        </Typography>
                        <a
                            className={styles.root__info__link}
                            href="admin@aresmine.ru"
                        >
                            <Typography
                                className={styles.root__contacts}
                                preset="common5"
                                color="body-0"
                                component="li"
                            >
                                {data.mail}
                            </Typography>
                        </a>
                    </ul>
                </>
            )}
        </div>
    );
};

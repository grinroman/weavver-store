import { Typography } from 'src/components/atoms/Typography';
import styles from './top.module.scss';
import { useState } from 'react';
import { Breakpoint, useBreakpoints } from 'src/hooks/useBreakpoints';
import { Logo } from 'src/components/atoms/Logo';
import { Links } from '../Links';
import { Payment } from '../Payment';

export const Top: React.FC = () => {
    const [isDesktop, setIsDesktop] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useBreakpoints((breakpoint) => {
        setIsDesktop(breakpoint > Breakpoint.TABLET);
        setIsMobile(breakpoint < Breakpoint.TABLET);
    });

    return (
        <div className={styles.root}>
            {isDesktop ? (
                <>
                    <Logo />
                    <Links />
                    <Payment />
                </>
            ) : (
                <>
                    <div className={styles.root__logo}>
                        {!isMobile && <Logo />}
                        <Payment />
                    </div>
                    <Links />
                </>
            )}
        </div>
    );
};

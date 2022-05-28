import React, { useEffect, useRef, useState, forwardRef } from 'react';
import styles from './landingelement.module.scss';
import Image from 'next/image';
import { Breakpoint, useBreakpoints } from 'src/hooks/useBreakpoints';
import { ScrollDownArrow } from 'src/components/atoms/ScrollDownArrow';
import { Typography } from 'src/components/atoms/Typography';
import router from 'next/router';
import client from 'src/utils/routes/client';

type ProductCardProps = { scrollTo: any; categoryRef: any };
export type TabName = 'right' | 'value' | 'key' | 'other' | 'disabled';
export const LandingElement: React.FC<ProductCardProps> = ({
    scrollTo,
    categoryRef,
}) => {
    const [isDesktop, setIsDesktop] = useState<boolean>(false);
    const [isTablet, setIsTablet] = useState<boolean>(false);

    useBreakpoints((breakpoint) => {
        setIsDesktop(breakpoint > Breakpoint.TABLET);
        setIsTablet(breakpoint <= Breakpoint.TABLET);
    });

    return (
        <div className={styles.root}>
            <div className={styles.root__wrapper}>
                <Image
                    src="/images/jpgs/main-logo.jpg"
                    width={isDesktop ? 320 : isTablet ? 400 : 90}
                    height={isDesktop ? 395 : isTablet ? 395 : 180}
                    className={styles.root__image}
                />
                <button
                    className={styles.root__scrollButton}
                    onClick={() => {
                        scrollTo(categoryRef!.current); //FIXME: переименовать рефы адекватно
                    }}
                >
                    <ScrollDownArrow />
                </button>
            </div>
        </div>
    );
};

export default LandingElement;

import React, { useEffect, useRef, useState, forwardRef } from 'react';
import styles from './landingelement.module.scss';
import Image from 'next/image';
import { Breakpoint, useBreakpoints } from 'src/hooks/useBreakpoints';
import { ScrollDownArrow } from 'src/components/atoms/ScrollDownArrow';

type ProductCardProps = { scrollTo: any; weaverStoreRef: any };
export type TabName = 'right' | 'value' | 'key' | 'other' | 'disabled';
export const LandingElement: React.FC<ProductCardProps> = ({
    scrollTo,
    weaverStoreRef,
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
                    width={isDesktop ? 320 : isTablet ? 400 : 45}
                    height={isDesktop ? 395 : isTablet ? 395 : 45}
                    className={styles.root__image}
                />
                <button
                    className={styles.root__scrollButton}
                    onClick={() => {
                        scrollTo(weaverStoreRef!.current); //FIXME: переименовать рефы адекватно
                    }}
                >
                    <ScrollDownArrow />
                </button>
            </div>
        </div>
    );
};

export default LandingElement;

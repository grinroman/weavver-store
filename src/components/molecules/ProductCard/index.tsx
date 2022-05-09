import React, { useEffect, useRef, useState, forwardRef } from 'react';
import styles from './productcard.module.scss';
import productTypes from 'src/mocks/productTypes.json';
import clsx from 'clsx';
import { Typography } from 'src/components/atoms/Typography';
import Link from 'next/link';
import { calculateTime } from 'src/utils/calculations/calculatePrice';
import Image from 'next/image';
import sanityClient from '@sanity/client';
import client from 'src/utils/routes/client';
import { Breakpoint, useBreakpoints } from 'src/hooks/useBreakpoints';
type ProductCardProps = {
    imgSrc: string;
    name: string;
    price: number;
    sale?: number;
    slug: any;
};

export const ProductCard: React.FC<ProductCardProps> = ({
    imgSrc,
    name,
    sale,
    price,
    slug,
}) => {
    const [isTablet, setIsTablet] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useBreakpoints((breakpoint) => {
        setIsTablet(breakpoint <= Breakpoint.TABLET);
        setIsMobile(breakpoint <= Breakpoint.MOBILE);
    });

    return (
        <Link href={'catalog/product/' + slug.current} key={slug.current}>
            <a className={styles.root}>
                <Image
                    src={imgSrc}
                    alt={name}
                    width={isTablet ? 160 : isMobile ? 40 : 210}
                    height={isTablet ? 240 : isMobile ? 60 : 320}
                />
                {sale ? (
                    <div className={styles.root__saletag}>
                        <Typography preset="common7" color="body-0">
                            {sale}% off
                        </Typography>
                    </div>
                ) : null}
                <div className={styles.root__header}>
                    <Typography
                        preset="title5"
                        color="body-0"
                        component="div"
                        align="center"
                        className={styles.root__titlewrapper}
                    >
                        {name}
                    </Typography>
                </div>
                <div
                    className={clsx(
                        styles.root__price,
                        sale && styles['withsale']
                    )}
                >
                    <Typography
                        preset="common4"
                        color={sale ? 'grey' : 'paragraph'}
                        component="div"
                        className={sale ? styles.root__crossed : undefined}
                    >
                        {price.toString() + '₽'}
                    </Typography>
                    {sale ? (
                        <Typography
                            preset="common4"
                            color="paragraph"
                            component="div"
                        >
                            {calculateTime(price, sale) + '₽'}
                        </Typography>
                    ) : null}
                </div>
            </a>
        </Link>
    );
};

export default ProductCard;

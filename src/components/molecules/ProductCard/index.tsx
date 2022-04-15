import React, { useEffect, useRef, useState, forwardRef } from 'react';
import styles from './productcard.module.scss';
import productTypes from 'src/mocks/productTypes.json';
import clsx from 'clsx';
import { Typography } from 'src/components/atoms/Typography';
import Link from 'next/link';
type ProductCardProps = {
    imgSrc: string;
    title: string;
    price: number;
    shortDesc: any;
    sale?: number;
    id: number;
};

export const ProductCard: React.FC<ProductCardProps> = ({
    imgSrc,
    title,
    shortDesc,
    sale,
    price,
    id,
}) => {
    return (
        <Link href={'catalog/product/' + id} key={id}>
            <a className={styles.root}>
                <img src={`/images/product-cards/${imgSrc}.jpg`} />
                {sale ? (
                    <div className={styles.root__saletag}>
                        <Typography preset="common7" color="body-0">
                            {sale}% off
                        </Typography>
                    </div>
                ) : null}
                <div className={styles.root__header}>
                    <Typography preset="title3" color="body-0">
                        {title}
                    </Typography>
                </div>
                {/* <div className={styles.root__shortdescription}>
                {shortDesc.map((descEl: string) => (
                    <Typography preset="common5" color="body-0" align="center">
                        {descEl}
                        <br />
                    </Typography>
                ))}
                </div> */}
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
                            {(price * (1 - sale / 100)).toString() + '₽'}
                        </Typography>
                    ) : null}
                </div>
            </a>
        </Link>
    );
};

export default ProductCard;

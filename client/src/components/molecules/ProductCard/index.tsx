import React, { useEffect, useRef, useState } from 'react';
import styles from './productcard.module.scss';
import productTypes from 'src/mocks/productTypes.json';
import clsx from 'clsx';
import { Typography } from 'src/components/atoms/Typography';
type ProductCardProps = {
    imgSrc: string;
    title: string;
    price: number;
    shortDesc: string;
    sale?: number;
};

export const ProductCard: React.FC<ProductCardProps> = ({
    imgSrc,
    title,
    shortDesc,
    sale,
}) => {
    return (
        <div className={styles.root}>
            <img src={`/images/product-cards/${imgSrc}.jpg`} />
            <div className={styles.root__header}>
                <Typography preset="title3" color="body-0">
                    {title}
                </Typography>
            </div>
            <Typography preset="common5" color="body-0" align="center">
                {shortDesc}
            </Typography>

            {}
        </div>
    );
};

export default ProductCard;

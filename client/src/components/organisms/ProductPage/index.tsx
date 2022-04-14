import React, { useEffect, useRef, useState, forwardRef } from 'react';
import styles from './productpage.module.scss';
import productTypes from 'src/mocks/productTypes.json';
import clsx from 'clsx';
import { Typography } from 'src/components/atoms/Typography';
type ProductPackagProps = {
    id: number;
};

export const ProductPage: React.FC<ProductPackagProps> = ({ id }) => {
    return <div className={styles.root}>{id}</div>;
};

export default ProductPage;

import React, { useEffect, useRef, useState, forwardRef } from 'react';
import styles from './productpage.module.scss';
import productTypes from 'src/mocks/productTypes.json';
import clsx from 'clsx';
import Image from 'next/image';

import { Typography } from 'src/components/atoms/Typography';
type ProductPackagProps = {
    data: productObjProperties;
};

interface productObjProperties {
    id: number;
    imgSrc: string;
    price: number;
    title: string;
    sale: number;
    shortDesc: string[];
}

export const ProductPage: React.FC<ProductPackagProps> = ({ data }) => {
    const [product, setProduct] = useState<productObjProperties>(
        data //FIXME: MOKED!!!
    );

    console.log(product);

    return (
        <div className={styles.root}>
            <div className={styles.root__picturewrapper}>
                {' '}
                {/* <Image
                    alt={product.title}
                    src={`/images/product-cards/${product.imgSrc}.jpg`}
                    width={800}
                    height={900}
                /> */}
            </div>
            <div className={styles.root__descriptionwrapper}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem aliquam rerum repellat vel maiores maxime vitae
                nostrum obcaecati natus ratione. Corporis ullam repellendus
                atque architecto ut deleniti distinctio, sequi amet!
            </div>
        </div>
    );
};

export default ProductPage;

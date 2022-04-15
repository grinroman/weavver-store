import clsx from 'clsx';
import React, { forwardRef, MutableRefObject, useRef } from 'react';
import { Typography } from 'src/components/atoms/Typography';
import styles from './cataloglist.module.scss';
import productListMock from 'src/mocks/productListMock.json';
import ProductCard from 'src/components/molecules/ProductCard';
import Link from 'next/link';

export type CategoryProps = {
    // children: React.ReactNode;
};

export const CatalogList: React.FC<CategoryProps> = () => {
    return (
        <div className={styles.root}>
            <ul className={styles.root__grid}>
                {productListMock.map((product) => {
                    //FIXME: сюда надо передавать результат завпроса!!!
                    return (
                        <li key={product.id}>
                            <ProductCard
                                imgSrc={product.imgSrc}
                                title={product.title}
                                price={product.price}
                                shortDesc={product.shortDesc}
                                sale={product.sale}
                                id={product.id}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

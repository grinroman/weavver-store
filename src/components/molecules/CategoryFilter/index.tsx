import React, { useEffect, useRef, useState } from 'react';
import styles from './categoryfilter.module.scss';
import productTypes from 'src/mocks/productTypes.json';
import clsx from 'clsx';
import { Typography } from 'src/components/atoms/Typography';
type CategoryFilterProps = {};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const onSelectionHandler = (currentTabName: string) => {
        let newIndex = productTypes.findIndex(
            (el) => el.type === currentTabName
        );
        setActiveIndex(newIndex);
    };

    return (
        <div className={styles.root}>
            <ul className={styles.root__grid}>
                {productTypes.map((product, i) => (
                    <li
                        className={clsx(
                            styles.root__buttonelement,
                            i === activeIndex
                                ? styles['active']
                                : styles['inactive']
                        )}
                        onClick={() => onSelectionHandler(product.type)}
                        key={i}
                    >
                        <button>
                            <Typography
                                preset="common5"
                                color={
                                    i === activeIndex ? 'body-0' : 'background'
                                }
                            >
                                {product.type}
                            </Typography>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryFilter;

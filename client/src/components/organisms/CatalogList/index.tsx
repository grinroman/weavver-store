import clsx from 'clsx';
import React, { forwardRef, MutableRefObject } from 'react';
import { Typography } from 'src/components/atoms/Typography';
import styles from './cataloglist.module.scss';

export type CategoryProps = {
    children: React.ReactNode;
};

export const CatalogList: React.FC<CategoryProps> = ({ children }) => {
    return (
        <div className={styles.root}>
            <ul className={styles.root__grid}>{children}</ul>
        </div>
    );
};

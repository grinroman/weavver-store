import clsx from 'clsx';
import React, { forwardRef, MutableRefObject } from 'react';
import { Typography } from 'src/components/atoms/Typography';
import styles from './cataloglist.module.scss';

export type CategoryProps = {
    children: React.ReactNode;
};

export const CatalogList = forwardRef<HTMLDivElement, CategoryProps>(
    ({ children }) => {
        return (
            <section className={styles.root}>
                <div className={styles.root__grid}>{children}</div>
            </section>
        );
    }
);

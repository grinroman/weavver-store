import clsx from 'clsx';
import React, { forwardRef, MutableRefObject } from 'react';
import { Typography } from 'src/components/atoms/Typography';
import styles from './category.module.scss';

export type CategoryProps = {
    children: React.ReactNode;
    title: string;
    isLast?: boolean;
    ref: MutableRefObject<HTMLDivElement | null>;
};

export const Category = forwardRef<HTMLDivElement, CategoryProps>(
    ({ title, isLast, children }, ref) => {
        const className = clsx(styles.root, isLast && styles['last']);
        return (
            <section className={className} ref={ref}>
                <Typography component="h2" preset="category" color="paragraph">
                    {title}
                </Typography>
                <div className={styles.root__grid}>{children}</div>
                {!isLast && <hr className={styles.root__line} />}
            </section>
        );
    }
);

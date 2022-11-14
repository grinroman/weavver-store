import clsx from 'clsx';
import React, { forwardRef, MutableRefObject } from 'react';
import { Typography } from 'src/components/atoms/Typography';
import styles from './category.module.scss';

export type CategoryProps = {
    children: React.ReactNode;
    title?: string;
    ref: MutableRefObject<HTMLDivElement | null>;
};

export const Category = forwardRef<HTMLDivElement, CategoryProps>(
    ({ title, children }, ref) => {
        return (
            <section className={styles.root} ref={ref}>
                {title ? (
                    <Typography
                        component="h2"
                        preset="category"
                        color="paragraph"
                        align="center"
                    >
                        {title}
                    </Typography>
                ) : null}
                <div className={styles.root__grid}>{children}</div>
            </section>
        );
    }
);

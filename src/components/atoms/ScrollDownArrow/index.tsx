import React from 'react';
import styles from './scrolldownarrow.module.scss';

export const ScrollDownArrow: React.FC = ({}) => {
    return (
        <div className={styles.root}>
            <div className={styles.root__chevron}></div>
            <div className={styles.root__chevron}></div>
            <div className={styles.root__chevron}></div>
            <span className={styles.root__text}>К категориям</span>
        </div>
    );
};

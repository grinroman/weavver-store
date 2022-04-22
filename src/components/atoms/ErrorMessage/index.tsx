import Image from 'next/image';
import React from 'react';
import styles from './errormessage.module.scss';
export const ErrorMessage: React.FC = () => {
    return (
        <div className={styles.root}>
            <Image
                src={'/images/gifs/error.gif'}
                alt="Error!"
                width={800}
                height={800}
            />
        </div>
    );
};

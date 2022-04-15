import React from 'react';
import styles from './payment.module.scss';

const images = ['visa', 'mastercard', 'mir'];

export const Payment = () => {
    return (
        <div className={styles.root}>
            <img
                src="/images/footer-payment/six.png"
                className={styles.root__six}
            />
            <div className={styles.root__wrapper}>
                {images.map((image) => {
                    return (
                        <img
                            key={image}
                            src={`/images/footer-payment/${image}.png`}
                            height="14"
                            className={styles.root__image}
                        />
                    );
                })}
            </div>
        </div>
    );
};

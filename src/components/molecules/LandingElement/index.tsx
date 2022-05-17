import React, { useEffect, useRef, useState, forwardRef } from 'react';
import styles from './landingelement.module.scss';
import Image from 'next/image';
type ProductCardProps = {};

export const LandingElement: React.FC<ProductCardProps> = ({}) => {
    return (
        <div className={styles.root}>
            <Image
                src="/images/jpgs/main-logo.jpg"
                width={330}
                height={400}
                className={styles.root__image}
            />
        </div>
    );
};

export default LandingElement;

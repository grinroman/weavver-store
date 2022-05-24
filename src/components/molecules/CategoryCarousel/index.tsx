import React, { useEffect, useRef, useState, forwardRef } from 'react';
import styles from './landingelement.module.scss';
import Image from 'next/image';
import { Breakpoint, useBreakpoints } from 'src/hooks/useBreakpoints';
import { ScrollDownArrow } from 'src/components/atoms/ScrollDownArrow';
import { Typography } from 'src/components/atoms/Typography';
import router from 'next/router';

type CategoryCarouselProps = {};
export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({}) => {
    return <div className={styles.root}></div>;
};

export default CategoryCarousel;

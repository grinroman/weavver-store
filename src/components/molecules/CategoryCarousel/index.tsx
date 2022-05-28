import React, { useEffect, useRef, useState, forwardRef } from 'react';
import styles from './categorycarousel.module.scss';
import Image from 'next/image';
import { Breakpoint, useBreakpoints } from 'src/hooks/useBreakpoints';
import { ScrollDownArrow } from 'src/components/atoms/ScrollDownArrow';
import { Typography } from 'src/components/atoms/Typography';
import router from 'next/router';
import { Carousel } from 'react-bootstrap';
import client from 'src/utils/routes/client';
import { LoadingSpinner } from 'src/components/atoms/LoadingSpinner';
import { Category } from 'src/Types/Category';
import {
    urlFor,
    urlForCarousel,
    urlForThumbnail,
} from 'src/utils/routes/image';

type CategoryCarouselProps = {};
export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({}) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isTablet, setIsTablet] = useState<boolean>(false);
    const [state, setState] = useState<any>({
        categories: [],
        error: '',
        loading: true,
    });

    let { loading, categories, error } = state;

    useBreakpoints((breakpoint) => {
        setIsMobile(breakpoint < Breakpoint.TABLET);
        setIsTablet(
            breakpoint < Breakpoint.DESKTOP && breakpoint > Breakpoint.MOBILE
        );
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await client.fetch(
                    `*[_type == "categories"]`
                );
                setState({ categories: categories, loading: false });
            } catch (err) {
                setState({ error: err.message, loading: false });
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className={styles.root}>
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Carousel fade={true} pause={false}>
                    {categories.map((category: Category) => (
                        <Carousel.Item
                            interval={3000}
                            className={styles.root__wrapper}
                        >
                            <button className={styles.root__wrapper__button}>
                                <Typography
                                    preset="title2"
                                    color="paragraph"
                                    align="center"
                                    textCase="upper"
                                >
                                    {' '}
                                    В каталог
                                </Typography>
                            </button>
                            <Image
                                src={
                                    isMobile
                                        ? urlForCarousel(
                                              category.telephoneImage
                                          )
                                        : urlForCarousel(category.commonImage)
                                }
                                alt={category.name}
                                height={isMobile ? 700 : isTablet ? 750 : 660}
                                width={isMobile ? 450 : isTablet ? 1000 : 1480}
                            />
                            <Carousel.Caption
                                className={styles.root__slidedescription}
                            >
                                <Typography
                                    preset="title2"
                                    color="paragraph"
                                    align="center"
                                >
                                    {category.name}
                                </Typography>
                                <p>{category.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </div>
    );
};

export default CategoryCarousel;

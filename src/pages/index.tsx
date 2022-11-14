import { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useRef, useState } from 'react';
import CategoryCarousel from 'src/components/molecules/CategoryCarousel';
import { Footer } from 'src/components/molecules/Footer';
import { Header } from 'src/components/molecules/Header';
import LandingElement from 'src/components/molecules/LandingElement';
import LandingFooter from 'src/components/molecules/LandingFooter';
import { Category } from 'src/components/organisms/Category';
import { Container } from 'src/components/templates/Container';

export type PageProps = {
    data: any;
};

const Home: NextPage<PageProps> = ({ data }) => {
    const weaverStoreRef = useRef<HTMLDivElement | null>(null);
    const categoriesRef = useRef<HTMLDivElement | null>(null);
    const whoWeAreRef = useRef<HTMLDivElement | null>(null);

    const scrollToSection = useCallback((section: HTMLDivElement) => {
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 94,
                behavior: 'smooth',
            });
        }
    }, []);

    return (
        <>
            <Head>
                <title>Weavver · Магазин</title>
            </Head>
            <Header
                weaverStoreRef={weaverStoreRef} //FIXME: переименовать рефы адекватно
                categoriesRef={categoriesRef}
                whoWeAreRef={whoWeAreRef}
                scrollTo={scrollToSection}
            />
            <Category ref={weaverStoreRef}>
                <LandingElement
                    scrollTo={scrollToSection}
                    weaverStoreRef={weaverStoreRef}
                />
            </Category>
            <Category ref={categoriesRef}>
                <CategoryCarousel />
            </Category>
            <Container>
                <Category title="О нас" ref={whoWeAreRef}>
                    <LandingFooter />
                </Category>
            </Container>
            <Footer />
        </>
    );
};

export default Home;

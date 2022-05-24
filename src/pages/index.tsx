import { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useRef, useState } from 'react';
import { Footer } from 'src/components/molecules/Footer';
import { Header } from 'src/components/molecules/Header';
import LandingElement from 'src/components/molecules/LandingElement';
import { Category } from 'src/components/organisms/Category';
import { Container } from 'src/components/templates/Container';

export type PageProps = {
    data: any;
};

const Home: NextPage<PageProps> = ({ data }) => {
    const [product, setProduct] = useState<string | null>(null);

    const popularRef = useRef<HTMLDivElement | null>(null);
    const landingRef = useRef<HTMLDivElement | null>(null);
    const categoryRef = useRef<HTMLDivElement | null>(null);
    const contactusRef = useRef<HTMLDivElement | null>(null);

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
                popularRef={popularRef} //FIXME: переименовать рефы адекватно
                landingRef={landingRef}
                categoryRef={categoryRef}
                contactusRef={contactusRef}
                scrollTo={scrollToSection}
            />
            <Category ref={popularRef}>
                <LandingElement
                    scrollTo={scrollToSection}
                    categoryRef={landingRef}
                />
            </Category>
            <Category title="Категории" ref={landingRef}>
                <CategorySlider />
            </Category>
            <Container>
                <Category title="О нас" ref={categoryRef}></Category>
                <Category
                    title="Связаться с нами"
                    ref={contactusRef}
                ></Category>
            </Container>
            <Footer />
        </>
    );
};

export default Home;

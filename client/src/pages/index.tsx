import { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useRef, useState } from 'react';
import { Footer } from 'src/components/molecules/Footer';
import { Header } from 'src/components/molecules/Header';
import { Category } from 'src/components/organisms/Category';
import { Container } from 'src/components/templates/Container';

export type PageProps = {
    data: any;
};

const Home: NextPage<PageProps> = ({ data }) => {
    const [product, setProduct] = useState<string | null>(null);
    const popularRef = useRef<HTMLDivElement | null>(null);
    const categoryRef = useRef<HTMLDivElement | null>(null);
    const aboutusRef = useRef<HTMLDivElement | null>(null);
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
                popularRef={popularRef}
                categoryRef={categoryRef}
                aboutusRef={aboutusRef}
                contactusRef={contactusRef}
                scrollTo={scrollToSection}
                setTitle={setProduct}
            />
            <Container>
                <Category title="Популярное" ref={popularRef}></Category>
                <Category title="Категории" ref={categoryRef}></Category>
                <Category title="О нас" ref={aboutusRef}></Category>
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

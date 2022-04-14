import { NextPage } from 'next';
import React from 'react';
import { Container } from 'src/components/templates/Container';
import { Header } from 'src/components/molecules/Header';
import Head from 'next/head';
import { Footer } from 'src/components/molecules/Footer';
import { useRouter } from 'next/router';
import ProductPage from 'src/components/organisms/ProductPage';

const Product: NextPage = () => {
    const router = useRouter();
    const { productId } = router.query;

    return (
        <>
            <Head>
                <title>Weavver · Покупка</title>
            </Head>
            <Header backTitle="< Вернуться к каталогу" backHref="/catalog" />
            <Container>
                <ProductPage id={+productId!} />
            </Container>
            <Footer />
        </>
    );
};

export default Product;

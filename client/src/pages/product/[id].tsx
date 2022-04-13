import { NextPage } from 'next';
import React from 'react';
import { Container } from 'src/components/templates/Container';
import { Header } from 'src/components/molecules/Header';
import Head from 'next/head';
import { Footer } from 'src/components/molecules/Footer';

const Product: NextPage = () => {
    return (
        <>
            <Head>
                <title>Weavver · Покупка</title>
            </Head>
            <Header />
            <Container>
                <h1>Страница товара</h1>
            </Container>
            <Footer />
        </>
    );
};

export default Product;

import { NextPage } from 'next';
import React, { useContext, useEffect } from 'react';
import { Container } from 'src/components/templates/Container';
import { Footer } from 'src/components/molecules/Footer';
import { Header } from 'src/components/molecules/Header';
import Head from 'next/head';
import BasketScreen from 'src/components/organisms/BasketScreen';

const CartScreen: NextPage = () => {
    return (
        <>
            <Head>
                <title>Weavver · Корзина заказа</title>
            </Head>
            <Header />
            <Container>
                <BasketScreen />
            </Container>
            <Footer />
        </>
    );
};

export default CartScreen;

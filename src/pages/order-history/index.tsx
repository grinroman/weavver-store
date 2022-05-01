import { NextPage } from 'next';
import React from 'react';
import { Container } from 'src/components/templates/Container';
import { Header } from 'src/components/molecules/Header';
import Head from 'next/head';
import { Footer } from 'src/components/molecules/Footer';
import OrderHistoryScreen from 'src/components/organisms/OrderHistoryScreen';

const OrderHistory: NextPage<Response> = () => {
    return (
        <>
            <Head>
                <title>Weavver · История заказов</title>
            </Head>
            <Header backTitle="< На главную" backHref="/" />
            <Container>
                <OrderHistoryScreen />
            </Container>
            <Footer />
        </>
    );
};

export default OrderHistory;

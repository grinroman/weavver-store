import { NextPage } from 'next';
import React, { useState } from 'react';
import { Container } from 'src/components/templates/Container';
import { Header } from 'src/components/molecules/Header';
import Head from 'next/head';
import { Footer } from 'src/components/molecules/Footer';
import LoginScreen from 'src/components/organisms/LoginScreen';
import PaymentScreen from 'src/components/organisms/PaymentScreen';
import OrderScreen from 'src/components/organisms/OrderScreen';

const Order: NextPage<Response> = () => {
    return (
        <>
            <Head>
                <title>Weavver · Размещение заказа</title>
            </Head>
            <Header backTitle="< Обратно к оплате" backHref="/payment" />
            <Container>
                <OrderScreen />
            </Container>
            <Footer />
        </>
    );
};

export default Order;

import { NextPage } from 'next';
import React, { useState } from 'react';
import { Container } from 'src/components/templates/Container';
import { Header } from 'src/components/molecules/Header';
import Head from 'next/head';
import { Footer } from 'src/components/molecules/Footer';
import CategoryFilter from 'src/components/molecules/CategoryFilter';
import { CatalogList } from 'src/components/organisms/CatalogList';
import LoginScreen from 'src/components/organisms/LoginScreen';
import ShippingScreen from 'src/components/organisms/ShippingScreen';

const Shipping: NextPage<Response> = () => {
    return (
        <>
            <Head>
                <title>Weavver · Формирование заказа</title>
            </Head>
            <Header backTitle="< В корзину" backHref="/cart" />
            <Container>
                <ShippingScreen />
            </Container>
        </>
    );
};

export default Shipping;

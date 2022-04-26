import { NextPage } from 'next';
import React, { useState } from 'react';
import { Container } from 'src/components/templates/Container';
import { Header } from 'src/components/molecules/Header';
import Head from 'next/head';
import { Footer } from 'src/components/molecules/Footer';
import CategoryFilter from 'src/components/molecules/CategoryFilter';
import { CatalogList } from 'src/components/organisms/CatalogList';
import LoginScreen from 'src/components/organisms/LoginScreen';
import RegisterScreen from 'src/components/organisms/RegisterScreen';

const Catalog: NextPage<Response> = () => {
    return (
        <>
            <Head>
                <title>Weavver · Регистрация</title>
            </Head>
            <Header backTitle="< К покупкам" backHref="/catalog" />
            <Container>
                <RegisterScreen />
            </Container>
            <Footer />
        </>
    );
};

export default Catalog;

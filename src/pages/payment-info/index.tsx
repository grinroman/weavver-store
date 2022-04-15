import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { Container } from 'src/components/templates/Container';
import { Footer } from 'src/components/molecules/Footer';
import { Header } from 'src/components/molecules/Header';
import Head from 'next/head';
import { enablePageScroll } from 'scroll-lock';

const HowTo: NextPage = () => {
    useEffect(() => {
        enablePageScroll();
    });
    return (
        <>
            <Head>
                <title>Weavver · Проведение оплаты</title>
            </Head>
            <Header />
            <Container></Container>
            <Footer />
        </>
    );
};

export default HowTo;

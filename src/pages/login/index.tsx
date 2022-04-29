import { NextPage } from 'next';
import React, { useState } from 'react';
import { Container } from 'src/components/templates/Container';
import { Header } from 'src/components/molecules/Header';
import Head from 'next/head';
import { Footer } from 'src/components/molecules/Footer';
import LoginScreen from 'src/components/organisms/LoginScreen';

const Login: NextPage<Response> = () => {
    return (
        <>
            <Head>
                <title>Weavver · Авторизация</title>
            </Head>
            <Header backTitle="< К покупкам" backHref="/catalog" />
            <Container>
                <LoginScreen />
            </Container>
            <Footer />
        </>
    );
};

export default Login;

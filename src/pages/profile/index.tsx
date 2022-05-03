import { NextPage } from 'next';
import React, { useState } from 'react';
import { Container } from 'src/components/templates/Container';
import { Header } from 'src/components/molecules/Header';
import Head from 'next/head';
import { Footer } from 'src/components/molecules/Footer';
import LoginScreen from 'src/components/organisms/LoginScreen';
import PaymentScreen from 'src/components/organisms/PaymentScreen';
import PlaceOrderScreen from 'src/components/organisms/PalaceOrderScreen';
import ProfileScreen from 'src/components/organisms/ProfileScreen';

const Profile: NextPage<Response> = () => {
    return (
        <>
            <Head>
                <title>Weavver · Размещение заказа</title>
            </Head>
            <Header backTitle="< Обратно к оплате" backHref="/payment" />
            <Container>
                <ProfileScreen />
            </Container>
            <Footer />
        </>
    );
};

export default Profile;

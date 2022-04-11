import { NextPage } from 'next';
import React from 'react';
import { Container } from 'src/components/templates/Container';
import { Header } from 'src/components/molecules/Header';
import Head from 'next/head';

const Catalog: NextPage = () => {
    return (
        <>
            <Head>
                <title>Weavver · Одежда</title>
            </Head>
            <Header />
        </>
    );
};

export default Catalog;

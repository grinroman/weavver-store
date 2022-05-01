import { GetStaticProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Container } from 'src/components/templates/Container';
import { Header } from 'src/components/molecules/Header';
import Head from 'next/head';
import { Footer } from 'src/components/molecules/Footer';
import ProductPage from 'src/components/organisms/ProductPage';
import productListMock from 'src/mocks/productListMock.json';
import { Product } from 'src/Types/Product';
import { LoadingSpinner } from 'src/components/atoms/LoadingSpinner';
import { ErrorMessage } from 'src/components/atoms/ErrorMessage';
import CreatedOrderScreen from 'src/components/organisms/CreatedOrderScreen';

export function getServerSideProps({ params }: any) {
    return {
        props: { params },
    };
}

export type PageProps = {
    params: any;
};

const ReadyOrder: NextPage<PageProps> = ({ params }) => {
    const { id: orderId } = params;
    return (
        <>
            <Head>
                <title>Weavver · {`Заказ ${orderId}`}</title>
            </Head>
            <Header backTitle="< Вернуться к каталогу" backHref="/catalog" />
            <Container>
                <CreatedOrderScreen orderId={orderId} />
            </Container>
            <Footer />
        </>
    );
};

export default ReadyOrder;

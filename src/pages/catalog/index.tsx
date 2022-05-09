import { NextPage } from 'next';
import React, { useState } from 'react';
import { Container } from 'src/components/templates/Container';
import { Header } from 'src/components/molecules/Header';
import Head from 'next/head';
import { Footer } from 'src/components/molecules/Footer';
import CategoryFilter from 'src/components/molecules/CategoryFilter';
import { CatalogList } from 'src/components/organisms/CatalogList';
import productListMock from 'src/mocks/productListMock.json';
import client from 'src/utils/routes/client';

export type Product = {
    name: any;
    price: any;
    sale: any;
    image: any;
    description: any;
    slug: any;
    brand: any;
    size: any;
    category: any;
    rating: any;
    numReviews: any;
};

export type Response = {
    products: Product[];
    error: any;
    loading: boolean;
};

const Catalog: NextPage<Response> = ({ products, error, loading }) => {
    return (
        <>
            <Head>
                <title>Weavver · Каталог товаров</title>
            </Head>
            <Header />
            <Container>
                <CategoryFilter />
            </Container>
            <Footer />
        </>
    );
};

export default Catalog;

import { NextPage } from 'next';
import React from 'react';
import { Container } from 'src/components/templates/Container';
import { Header } from 'src/components/molecules/Header';
import Head from 'next/head';
import { Footer } from 'src/components/molecules/Footer';
import CategoryFilter from 'src/components/molecules/CategoryFilter';
import { CatalogList } from 'src/components/organisms/CatalogList';
import productListMock from 'src/mocks/productListMock.json';
import ProductCard from 'src/components/molecules/ProductCard';
import Link from 'next/link';

const Catalog: NextPage = () => {
    return (
        <>
            <Head>
                <title>Weavver · Каталог товаров</title>
            </Head>
            <Header />
            <Container>
                <CategoryFilter />

                <CatalogList>
                    {productListMock.map((product) => {
                        return (
                            <ProductCard
                                imgSrc={product.imgSrc}
                                title={product.title}
                                price={product.price}
                                shortDesc={product.shortDesc}
                                sale={product.sale}
                                id={product.id}
                            />
                        );
                    })}
                </CatalogList>
            </Container>
            <Footer />
        </>
    );
};

export default Catalog;

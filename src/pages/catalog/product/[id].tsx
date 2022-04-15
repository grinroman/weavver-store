import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import { Container } from 'src/components/templates/Container';
import { Header } from 'src/components/molecules/Header';
import Head from 'next/head';
import { Footer } from 'src/components/molecules/Footer';
import { useRouter } from 'next/router';
import ProductPage from 'src/components/organisms/ProductPage';
import productListMock from 'src/mocks/productListMock.json';

export type PageProps = {
    data: any;
};

const Product: NextPage<PageProps> = ({ data }) => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Weavver · Покупка</title>
            </Head>
            <Header backTitle="< Вернуться к каталогу" backHref="/catalog" />
            <Container>
                <ProductPage data={data.product} />
            </Container>
            <Footer />
        </>
    );
};

export default Product;

export async function getStaticProps(context: any) {
    const id = context.params.id;
    const product = productListMock.filter((el) => el.id === id)[0];
    return {
        props: {
            data: {
                product,
            },
        },
    };
}

export async function getStaticPaths() {
    const paths = productListMock.map((el) => {
        return {
            params: { id: el.id.toString() },
        };
    });

    return {
        paths,
        fallback: false,
    };
}

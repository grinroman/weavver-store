import { GetStaticProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Container } from 'src/components/templates/Container';
import { Header } from 'src/components/molecules/Header';
import Head from 'next/head';
import { Footer } from 'src/components/molecules/Footer';
import { useRouter } from 'next/router';
import ProductPage from 'src/components/organisms/ProductPage';
import productListMock from 'src/mocks/productListMock.json';
import client from 'src/utils/routes/client';
import { Product } from 'src/Types/Product';
import { LoadingSpinner } from 'src/components/atoms/LoadingSpinner';
import { ErrorMessage } from 'src/components/atoms/ErrorMessage';
export type PageProps = {
    slug: any;
};

export function getServerSideProps(context: any): any {
    return {
        props: { slug: context.params.slug },
    };
}

export type Response = {
    product: Product | null;
    error: any;
    loading: boolean;
};

const Product: NextPage<PageProps> = ({ slug }) => {
    const [oneProductResponse, setOneProductResponse] = useState<any>({
        product: null,
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const product = await client.fetch(
                    `
            *[_type == "product" && slug.current == $slug][0]`,
                    { slug }
                );
                setOneProductResponse({
                    product: product,
                    loading: false,
                    error: '',
                });
            } catch (error) {
                setOneProductResponse({
                    product: null,
                    loading: false,
                    error: error.message,
                });
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <Head>
                <title>Weavver · Покупка</title>
            </Head>
            <Header backTitle="< Вернуться к каталогу" backHref="/catalog" />
            <Container>
                {oneProductResponse.loading ? (
                    <LoadingSpinner />
                ) : oneProductResponse.error ? (
                    <ErrorMessage />
                ) : (
                    <ProductPage product={oneProductResponse.product} />
                )}
            </Container>
            <Footer />
        </>
    );
};

export default Product;

import React, {
    forwardRef,
    MutableRefObject,
    useEffect,
    useRef,
    useState,
} from 'react';
import styles from './cataloglist.module.scss';
import productListMock from 'src/mocks/productListMock.json';
import client from 'src/utils/routes/client';
import ProductCard from 'src/components/molecules/ProductCard';
import Link from 'next/link';
import { Typography } from 'src/components/atoms/Typography';
import clsx from 'clsx';
import { LoadingSpinner } from 'src/components/atoms/LoadingSpinner';
import { urlForThumbnail } from 'src/utils/routes/image';
import { useNextSanityImage } from 'next-sanity-image';
import sanityClient from '@sanity/client';
import { Product } from 'src/Types/Product';
import _ from 'lodash';
export type CategoryProps = {
    // children: React.ReactNode;
};
//FIXME: компонент не нужен
export type AllProductsResponse = {
    products: Product[];
    error: any;
    loading: boolean;
};

export const CatalogList: React.FC<CategoryProps> = () => {
    const [productResponse, setProductResponse] = useState<AllProductsResponse>(
        {
            products: [],
            error: '',
            loading: true,
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                let products = await client.fetch(`*[_type == "product"]`);
                products = [
                    ...new Map(
                        products.map((product: Product) => [
                            product['description'],
                            product,
                        ])
                    ).values(),
                ];
                setProductResponse({ products, error, loading: false });
            } catch (error) {
                setProductResponse({
                    products,
                    loading: false,
                    error: error.message,
                });
            }
        };
        fetchData();
    }, []);

    const { loading, error, products } = productResponse;

    return (
        <div className={styles.root}>
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul className={styles.root__grid}>
                    {products.map((product, i) => {
                        return (
                            <li key={i}>
                                <ProductCard
                                    imgSrc={urlForThumbnail(product.image)}
                                    name={product.name}
                                    price={product.price}
                                    sale={product.sale}
                                    slug={product.slug}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

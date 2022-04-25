import React, {
    useEffect,
    useRef,
    useState,
    forwardRef,
    useContext,
} from 'react';
import styles from './productpage.module.scss';
import productTypes from 'src/mocks/productTypes.json';
import clsx from 'clsx';
import { Product } from 'src/Types/Product';
import { Typography } from 'src/components/atoms/Typography';
import client from 'src/utils/routes/client';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';
import { urlFor, urlForThumbnail } from 'src/utils/routes/image';
import { Breakpoint, useBreakpoints } from 'src/hooks/useBreakpoints';
import { Rating } from '@mui/material';
import { Store } from 'src/utils/context/Store';
import axios from 'axios';
import { useSnackbar } from 'notistack';
export type ProductPageProps = {
    product: Product;
};
// export type ContextType = {
//     state: any | undefined;
//     dispatch: any;
// };

export const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
    const {
        state: { cart },
        dispatch,
    } = useContext(Store);
    const priceWithSale = Math.round(product.price * (1 - product.sale / 100));
    const [isTablet, setIsTablet] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [productAmount, setProductAmount] = useState<number>(1);
    const characteristics = product.description.split(', ');
    const { enqueueSnackbar } = useSnackbar();

    useBreakpoints((breakpoint) => {
        setIsTablet(breakpoint <= Breakpoint.TABLET);
        setIsMobile(breakpoint <= Breakpoint.MOBILE);
    });

    const onAmountChange = (isIncrease: boolean): void => {
        isIncrease
            ? setProductAmount((productAmount) => productAmount + 1)
            : setProductAmount((productAmount) =>
                  productAmount ? productAmount - 1 : 1
              );
    };

    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find(
            (x: Product) => x._id === product._id
        );
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/Products/${product._id}`);
        if (data.countInStock < quantity) {
            enqueueSnackbar('Извините, товара нет в наличии!', {
                variant: 'error',
            });
            return;
        }
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: {
                _key: product._id,
                name: product.name,
                countInStock: product.countInStock,
                slug: product.slug.current,
                price: product.price,
                image: urlForThumbnail(product.image),
                quantity,
            },
        });
        enqueueSnackbar(`${product.name} добавлен в заказ! `, {
            variant: 'success',
        });
    };

    return (
        <div className={styles.root}>
            <div className={styles.root__picturewrapper}>
                <Image
                    src={urlFor(product.image)}
                    alt={product.name}
                    width={isMobile ? 350 : isTablet ? 450 : 450}
                    height={isMobile ? 400 : isTablet ? 590 : 550}
                />
                <div className={styles.root__rating}>
                    <Rating value={product.rating} />
                    <Typography
                        preset="title4"
                        component="div"
                        color="paragraph"
                        className={styles.root__stockwrapper}
                    >
                        {product.countInStock} в наличии
                    </Typography>
                </div>
            </div>

            <div className={styles.root__descriptionwrapper}>
                <Typography preset="title4" color="paragraph" align="center">
                    {product.name}
                </Typography>
                <div className={styles.root__infowrapper}>
                    <div className={styles.root__description}>
                        <div className={styles.root__catbrand}>
                            <Typography preset="common4" color="paragraph">
                                <u>Бренд:</u> {product.brand}
                            </Typography>
                            <Typography preset="common4" color="paragraph">
                                <u>Категория</u> {product.category}
                            </Typography>
                        </div>
                        <ul className={styles.root__chracteristics}>
                            {characteristics.map(
                                (descPoint: string, i: number) => {
                                    return (
                                        <li
                                            className={
                                                styles.root__descriptionitem
                                            }
                                            key={i}
                                        >
                                            <Typography
                                                preset="common4"
                                                color="grey"
                                            >
                                                {descPoint}
                                            </Typography>
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </div>
                    <div className={styles.root__buymenu}>
                        {product.sale ? (
                            <div className={styles.root__pricewithsale}>
                                <Typography
                                    preset="title4"
                                    color="grey"
                                    align="center"
                                    component="div"
                                    className={styles.root__crossed}
                                >
                                    {product.price}₽
                                </Typography>
                                <Typography
                                    preset="title4"
                                    color="paragraph"
                                    align="center"
                                    component="div"
                                >
                                    {priceWithSale}₽
                                </Typography>
                            </div>
                        ) : (
                            <Typography
                                preset="title4"
                                color="paragraph"
                                align="center"
                                component="div"
                            >
                                {product.price}₽
                            </Typography>
                        )}
                        <div className={styles.root__ammount__wrapper}>
                            <button onClick={() => onAmountChange(false)}>
                                <Typography preset="title3" color="paragraph">
                                    -
                                </Typography>
                            </button>
                            <div className={styles.root__totalcount__wrapper}>
                                <Typography
                                    preset="title3"
                                    component="div"
                                    color="paragraph"
                                >
                                    {productAmount}
                                </Typography>
                            </div>
                            <button onClick={() => onAmountChange(true)}>
                                <Typography preset="title3" color="paragraph">
                                    +
                                </Typography>
                            </button>
                        </div>
                        <button
                            disabled={!Boolean(product.countInStock)}
                            className={styles.root__buy__button}
                            onClick={addToCartHandler}
                        >
                            <Typography preset="title4" color="paragraph">
                                Купить
                            </Typography>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;

import React, { useState, useContext, useCallback } from 'react';
import {
    Button,
    Card,
    Grid,
    Link,
    List,
    ListItem,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { Store } from 'src/utils/context/Store';
import styles from './basketscreen.module.scss';
import cartpagetitles from 'src/mocks/cardpagetitle.json';
import { Product } from 'src/Types/Product';
import { Typography } from 'src/components/atoms/Typography';
import Image from 'next/image';
import NextLink from 'next/link';
import { getPlural } from 'src/utils/calculations/getPlural';
import { cartItemsCountig } from 'src/utils/calculations/cartItemsCounting';
import { cartItemsPriceCountig } from 'src/utils/calculations/cartItemsPriceCountig';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import classes from 'src/utils/classes/classes';
import { getError } from 'src/utils/routes/error';

export type TableHeader = {
    name: string;
    align: string | null;
};

export const BasketScreen: React.FC = () => {
    const router = useRouter();
    const {
        state: {
            cart: { cartItems },
        },
        dispatch,
    } = useContext(Store);
    const { state } = useContext(Store);
    const { userInfo } = state;
    // const [itemsCount, setItemsCount] = useState(
    //     cartItems.reduce((a: any, c: { quantity: any }) => a + c.quantity, 0)
    // );
    const { enqueueSnackbar } = useSnackbar();

    const updateCartHandler = useCallback(
        // изменение списка товаров в текущем заказе в стейтах + куках
        async (item: Product, quantity: number) => {
            const { data } = await axios.get(`/api/Products/${item._key}`);
            // setItemsCount(quantity);
            if (data.countInStock < quantity) {
                enqueueSnackbar('Извините, товар закончился', {
                    variant: 'error',
                });
                return;
            }
            dispatch({
                type: 'CART_ADD_ITEM',
                payload: {
                    _key: item._key,
                    name: item.name,
                    countInStock: item.countInStock,
                    slug: item.slug,
                    price: item.price,
                    image: item.image,
                    quantity,
                },
            });
            enqueueSnackbar(
                `Для товара ${item.name} корзина была успешно обновлена!`,
                {
                    variant: 'success',
                }
            );
        },
        [cartItems]
    );

    const confirmHandler = () => {
        //подтверждение заказа - сброс товаров в корзину
        cartItems.forEach(async (orderEl: Product) => {
            try {
                const { data } = await axios.put(
                    `/api/${orderEl._key}/product-update`,
                    {
                        newCountInStock: orderEl.quantity
                            ? orderEl.countInStock - orderEl.quantity
                            : 0, },
                    {
                        headers: { authorization: `Bearer ${userInfo.token}` },
                    }
                );
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }

            // console.log(
            //     orderEl.quantity ? orderEl.countInStock - orderEl.quantity : 0
            // );
        });
        router.push('/shipping');
    };

    const removeItemHandler = async (removedItem: any) => {
        console.log(removedItem.countInStock + removedItem.quantity);
        // при удалении товара из заказа требуется вернуть кол-во товаров обпатно в бд
        try {
            await axios.put(
                `/api/${removedItem._key}/product-update`,
                {
                    newCountInStock: removedItem.quantity
                        ? removedItem.countInStock
                        : 0,
                },
                {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                }
            );
        } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        }

        dispatch({ type: 'CART_REMOVE_ITEM', payload: removedItem });
    };

    return (
        <div className={styles.root}>
            {cartItems.length === 0 ? (
                <>
                    <Typography
                        component="div"
                        preset="title2"
                        color="paragraph"
                        className={styles.root__header}
                    >
                        Ваша корзина пуста!
                    </Typography>{' '}
                    <Link href="/catalog">
                        <Typography
                            component="a"
                            preset="title3"
                            color="primary"
                            className={styles.root__backtoprodlist}
                        >
                            Перейти в каталог
                        </Typography>
                    </Link>
                </>
            ) : (
                <>
                    <Typography
                        component="div"
                        preset="title2"
                        color="paragraph"
                        className={styles.root__header}
                    >
                        Ваша корзина
                    </Typography>
                    <Grid container>
                        <Grid item spacing={1} md={9} xs={12}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {cartpagetitles.map(
                                                (item: any, i: number): any => {
                                                    return (
                                                        <TableCell
                                                            key={i}
                                                            align={item.align.toString()}
                                                        >
                                                            <Typography
                                                                preset="title4"
                                                                color="paragraph"
                                                            >
                                                                {item.name}
                                                            </Typography>
                                                        </TableCell>
                                                    );
                                                }
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cartItems.map((item: any): any => (
                                            <TableRow key={item._key}>
                                                <TableCell>
                                                    <NextLink
                                                        href={`/catalog/product/${item.slug}`}
                                                        passHref
                                                    >
                                                        <Link>
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                width={80}
                                                                height={80}
                                                            />
                                                        </Link>
                                                    </NextLink>
                                                </TableCell>
                                                <TableCell>
                                                    <NextLink
                                                        href={`/catalog/product/${item.slug}`}
                                                        passHref
                                                    >
                                                        <Link>
                                                            <Typography
                                                                preset="common7"
                                                                color="paragraph"
                                                            >
                                                                {item.name}
                                                            </Typography>
                                                        </Link>
                                                    </NextLink>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Select
                                                        value={item.quantity}
                                                        onChange={(e) =>
                                                            updateCartHandler(
                                                                item,
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                item.countInStock <
                                                                    5
                                                                    ? item.countInStock
                                                                    : 5
                                                            ).keys(),
                                                        ].map((x) => (
                                                            <MenuItem
                                                                key={x + 1}
                                                                value={x + 1}
                                                            >
                                                                <Typography
                                                                    preset="common4"
                                                                    color="primary"
                                                                >
                                                                    {x + 1}
                                                                </Typography>
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography
                                                        preset="common4"
                                                        color="primary"
                                                    >
                                                        {item.price} руб.
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() =>
                                                            removeItemHandler(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        &#10005;
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <Card sx={classes.section}>
                                <List>
                                    <ListItem>
                                        <Typography
                                            preset="common4"
                                            color="paragraph"
                                            className={styles.root__subtotal}
                                        >
                                            Итого ({cartItemsCountig(cartItems)}{' '}
                                            {getPlural(
                                                cartItemsCountig(cartItems),
                                                'вещь',
                                                'вещи',
                                                'вещей'
                                            )}
                                            ) : ₽{' '}
                                            {cartItemsPriceCountig(cartItems)}
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Button
                                            fullWidth
                                            color="secondary"
                                            variant="contained"
                                            onClick={confirmHandler}
                                        >
                                            Подтвердить
                                        </Button>
                                    </ListItem>
                                </List>
                            </Card>
                        </Grid>
                    </Grid>
                </>
            )}
        </div>
    );
};

export default dynamic(() => Promise.resolve(BasketScreen), { ssr: false });

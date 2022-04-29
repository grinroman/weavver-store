import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './orderscreen.module.scss';
import NextLink from 'next/link';
import {
    Button,
    Card,
    CircularProgress,
    Grid,
    Link,
    List,
    ListItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import classes from 'src/utils/classes/classes.js';
import Form from 'src/components/atoms/Form';
import { Typography } from 'src/components/atoms/Typography';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Store } from 'src/utils/context/Store';
import jsCookie from 'js-cookie';
import CheckoutWizzard from 'src/components/molecules/CheckoutWizzard';
import { LoadingSpinner } from 'src/components/atoms/LoadingSpinner';
import { getError } from 'src/utils/routes/error';
import { CartItems } from 'src/Types/CartItems';
import { round2 } from 'src/utils/calculations/round2';

const OrderScreen: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const {
        userInfo,
        cart: { cartItems, shippingAddress, paymentMethod },
    } = state;
    const itemsPrice = round2(
        cartItems.reduce(
            (a: number, c: { price: number; quantity: number }) =>
                a + c.price * c.quantity,
            0
        )
    );
    const shippingPrice = itemsPrice > 200 ? 0 : 15;
    const taxPrice = round2(itemsPrice * 0.15);
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

    useEffect(() => {
        if (!paymentMethod) {
            router.push('/payment');
        }
        if (cartItems.length === 0) {
            router.push('/cart');
        }
    }, [cartItems, paymentMethod, router]);

    const placeOrderHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                '/api/orders',
                {
                    orderItems: cartItems.map((x: any) => ({
                        ...x,
                        countInStock: undefined,
                        slug: undefined,
                    })),
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    totalPrice,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            dispatch({ type: 'CART_CLEAR' });
            jsCookie.remove('cartItems');
            setLoading(false);
            router.push(`/order/${data}`);
        } catch (err) {
            setLoading(false);
            enqueueSnackbar(getError(err), { variant: 'error' });
        }
    };

    return (
        <div className={styles.root}>
            <div className={styles.root__checkoutwrapper}>
                <CheckoutWizzard activeStep={3}></CheckoutWizzard>
            </div>
            <Typography
                preset="title3"
                color="primary"
                component="div"
                className={styles.root__header}
            >
                Размещение заказа
            </Typography>

            <Grid container spacing={1}>
                <Grid item md={9} xs={12}>
                    <Card sx={classes.section}>
                        <List>
                            <ListItem>
                                <Typography preset="common3" color="paragraph">
                                    Адрес доставки
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography preset="common3" color="paragraph">
                                    {shippingAddress.fullName},{' '}
                                    {shippingAddress.address},{' '}
                                    {shippingAddress.city},{' '}
                                    {shippingAddress.postalCode},{' '}
                                    {shippingAddress.country}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Button
                                    onClick={() => router.push('/shipping')}
                                    variant="contained"
                                    color="secondary"
                                >
                                    Изменить
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                    <Card sx={classes.section}>
                        <List>
                            <ListItem>
                                <Typography preset="common3" color="paragraph">
                                    Метод оплаты
                                </Typography>
                            </ListItem>
                            <ListItem>
                                {' '}
                                <Typography preset="common3" color="paragraph">
                                    {paymentMethod}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Button
                                    onClick={() => router.push('/payment')}
                                    variant="contained"
                                    color="secondary"
                                >
                                    Изменить
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                    <Card sx={classes.section}>
                        <List>
                            <ListItem>
                                <Typography preset="common3" color="paragraph">
                                    Сосотавляющие заказа
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography
                                                        preset="common3"
                                                        color="paragraph"
                                                    >
                                                        Картинка
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        preset="common3"
                                                        color="paragraph"
                                                    >
                                                        Наименвоание
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography
                                                        preset="common3"
                                                        color="paragraph"
                                                    >
                                                        Количество
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography
                                                        preset="common3"
                                                        color="paragraph"
                                                    >
                                                        Цена
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {cartItems.map(
                                                (item: CartItems) => (
                                                    <TableRow key={item._key}>
                                                        <TableCell>
                                                            <NextLink
                                                                href={`/product/${item.slug}`}
                                                                passHref
                                                            >
                                                                <Link>
                                                                    <Image
                                                                        src={
                                                                            item.image
                                                                        }
                                                                        alt={
                                                                            item.name
                                                                        }
                                                                        width={
                                                                            50
                                                                        }
                                                                        height={
                                                                            50
                                                                        }
                                                                    ></Image>
                                                                </Link>
                                                            </NextLink>
                                                        </TableCell>
                                                        <TableCell>
                                                            <NextLink
                                                                href={`/product/${item.slug}`}
                                                                passHref
                                                            >
                                                                <Link>
                                                                    <Typography
                                                                        preset="common3"
                                                                        color="paragraph"
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </Typography>
                                                                </Link>
                                                            </NextLink>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography
                                                                preset="common3"
                                                                color="paragraph"
                                                            >
                                                                {item.quantity}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography
                                                                preset="common3"
                                                                color="paragraph"
                                                            >
                                                                {item.price} ₽
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card sx={classes.section}>
                        <List>
                            <ListItem>
                                <Typography preset="common3" color="paragraph">
                                    Ваш заказ
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography
                                            preset="common3"
                                            color="paragraph"
                                        >
                                            Товары:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography
                                            preset="common3"
                                            color="primary"
                                        >
                                            {itemsPrice} ₽
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography
                                            preset="common3"
                                            color="paragraph"
                                        >
                                            Доставка:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography
                                            preset="common3"
                                            color="primary"
                                        >
                                            {shippingPrice} ₽
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography
                                            preset="common3"
                                            color="paragraph"
                                        >
                                            <strong>Итого:</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography
                                            preset="common3"
                                            color="primary"
                                        >
                                            <strong>{totalPrice} ₽</strong>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button
                                    onClick={placeOrderHandler}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={loading}
                                >
                                    Place Order
                                </Button>
                            </ListItem>
                            {loading && (
                                <ListItem>
                                    <LoadingSpinner />
                                </ListItem>
                            )}
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default OrderScreen;

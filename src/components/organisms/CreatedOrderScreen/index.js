import React, { useContext, useEffect, useReducer } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import styles from './createdorderscreen.module.scss';
import NextLink from 'next/link';
import Image from 'next/image';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {
    Alert,
    Box,
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
    TextField,
} from '@mui/material';
import Form from 'src/components/atoms/Form';
import { Typography } from 'src/components/atoms/Typography';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Store } from 'src/utils/context/Store';
import jsCookie from 'js-cookie';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from 'src/components/atoms/LoadingSpinner';
import classes from 'src/utils/classes/classes';
import { CartItems } from 'src/Types/CartItems';
import { getError } from 'src/utils/routes/error';

// type CreatedOrderScreenProps = {
//     orderId: string,
// };

function reducer(state, action) {
    //: any
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                order: action.payload,
                error: '',
            };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'PAY_REQUEST':
            return { ...state, loadingPay: true };
        case 'PAY_SUCCESS':
            return { ...state, loadingPay: false, successPay: true };
        case 'PAY_FAIL':
            return { ...state, loadingPay: false, errorPay: action.payload };
        case 'PAY_RESET':
            return {
                ...state,
                loadingPay: false,
                successPay: false,
                errorPay: '',
            };
    }
}

const CreatedOrderScreen = ({ orderId }) => {
    const [{ loading, error, order, successPay }, dispatch] = useReducer(
        reducer,
        {
            loading: true,
            order: {},
            error: '',
        }
    );

    const {
        shippingAddress,
        paymentMethod,
        orderItems,
        itemsPrice,
        shippingPrice,
        totalPrice,
        isPaid,
        paidAt,
        isDelivered,
        deliveredAt,
    } = order;

    const router = useRouter();
    const { state } = useContext(Store);
    const { userInfo } = state;
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer(); // when loading pending is true after loaded it become false

    useEffect(() => {
        if (!userInfo) {
            return router.push('/login');
        }
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    // извлечение инфы из заказа
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });

                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        if (!order._id || successPay || (order._id && order._id !== orderId)) {
            fetchOrder();
            if (successPay) {
                dispatch({ type: 'PAY_RESET' });
            }
        } else {
            const loadPaypalScript = async () => {
                const { data: clientId } = await axios.get('/api/keys/paypal', {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': clientId,
                        currency: 'RUB',
                    },
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            };
            loadPaypalScript();
        }
    }, [order, orderId, successPay, paypalDispatch, router, userInfo]);
    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: { value: totalPrice },
                    },
                ],
            })
            .then((orderID) => {
                return orderID;
            });
    }
    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                dispatch({ type: 'PAY_REQUEST' });
                const { data } = await axios.put(
                    `/api/orders/${order._id}/pay`,
                    details,
                    {
                        headers: { authorization: `Bearer ${userInfo.token}` },
                    }
                );
                dispatch({ type: 'PAY_SUCCESS', payload: data });
                enqueueSnackbar('Заказ успешно оплачен!', {
                    variant: 'success',
                });
            } catch (err) {
                dispatch({ type: 'PAY_FAIL', payload: getError(err) });
                enqueueSnackbar(getError(err), { variant: 'error' });
            }
        });
    }
    function onError(err) {
        enqueueSnackbar(getError(err), { variant: 'error' });
    }
    return (
        <div className={styles.root}>
            <Typography
                preset="title3"
                color="primary"
                component="div"
                className={styles.root__header}
            >
                Заказ {orderId}
            </Typography>

            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <Grid container spacing={1}>
                    <Grid item md={9} xs={12}>
                        <Card sx={classes.section}>
                            <List>
                                <ListItem>
                                    <Typography
                                        preset="common4"
                                        color="paragraph"
                                    >
                                        Адрес доставки
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography
                                        preset="common4"
                                        color="paragraph"
                                    >
                                        {' '}
                                        {shippingAddress.fullName},{' '}
                                        {shippingAddress.address},{' '}
                                        {shippingAddress.city},{' '}
                                        {shippingAddress.postalCode},{' '}
                                        {shippingAddress.country}
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography
                                        preset="common4"
                                        color="paragraph"
                                    >
                                        {' '}
                                        Статус заказа:{' '}
                                        {isDelivered
                                            ? `доставлен в ${deliveredAt}`
                                            : 'не доставлен'}
                                    </Typography>
                                </ListItem>
                            </List>
                        </Card>

                        <Card sx={classes.section}>
                            <List>
                                <ListItem>
                                    <Typography
                                        preset="common4"
                                        color="paragraph"
                                    >
                                        Метод оплаты
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography
                                        preset="common4"
                                        color="paragraph"
                                    >
                                        {paymentMethod}
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography
                                        preset="common4"
                                        color="paragraph"
                                    >
                                        Статус:{' '}
                                        {isPaid
                                            ? `оплачено: ${paidAt}`
                                            : 'не оплачено'}
                                    </Typography>
                                </ListItem>
                            </List>
                        </Card>
                        <Card sx={classes.section}>
                            <List>
                                <ListItem>
                                    <Typography
                                        preset="common3"
                                        color="paragraph"
                                    >
                                        Элементы заказа
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
                                                            Наименование
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
                                                {orderItems.map(
                                                    (
                                                        item //: CartItems
                                                    ) => (
                                                        <TableRow
                                                            key={item._key}
                                                        >
                                                            <TableCell>
                                                                <NextLink
                                                                    href={`/catalog/product/${item.slug}`}
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
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Typography
                                                                    preset="common3"
                                                                    color="paragraph"
                                                                >
                                                                    {item.price}{' '}
                                                                    ₽
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
                                    <Typography
                                        preset="common3"
                                        color="paragraph"
                                    >
                                        Итог заказа
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography
                                                preset="common3"
                                                color="paragraph"
                                            >
                                                Элементы:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography
                                                preset="common3"
                                                color="paragraph"
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
                                                color="paragraph"
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
                                                color="paragraph"
                                            >
                                                <strong>{totalPrice} ₽</strong>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                {!isPaid && (
                                    <ListItem>
                                        {isPending ? (
                                            <CircularProgress />
                                        ) : (
                                            <Box sx={classes.fullWidth}>
                                                <PayPalButtons
                                                    createOrder={createOrder} //before going to paypal
                                                    onApprove={onApprove} //after successfull payment
                                                    onError={onError} //error paid order
                                                ></PayPalButtons>
                                            </Box>
                                        )}
                                    </ListItem>
                                )}
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default dynamic(() => Promise.resolve(CreatedOrderScreen), {
    ssr: false,
});

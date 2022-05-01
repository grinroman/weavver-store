import React, { useContext, useEffect, useReducer, useState } from 'react';
import Image from 'next/image';
import styles from './orderhistoryscreen.module.scss';
import NextLink from 'next/link';
import {
    Alert,
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
import dynamic from 'next/dynamic';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Store } from 'src/utils/context/Store';
import jsCookie from 'js-cookie';
import CheckoutWizzard from 'src/components/molecules/CheckoutWizzard';
import { LoadingSpinner } from 'src/components/atoms/LoadingSpinner';
import { getError } from 'src/utils/routes/error';

function reducer(state: any, action: any) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                orders: action.payload,
                error: '',
            };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            state;
    }
}

const OrderHistoryScreen: React.FC = () => {
    const { state } = useContext(Store);
    const { userInfo } = state;

    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        orders: [],
        error: '',
    });

    const router = useRouter();

    useEffect(() => {
        if (!userInfo) {
            router.push('/login');
        }
        const fetchOrders = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/history`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });

                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchOrders();
    }, [router, userInfo]);

    return (
        <div className={styles.root}>
            <Typography
                preset="title2"
                color="primary"
                component="div"
                className={styles.root__header}
            >
                История заказов
            </Typography>
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography
                                        preset="common4"
                                        color="paragraph"
                                    >
                                        ID
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        preset="common4"
                                        color="paragraph"
                                    >
                                        ДАТА
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        preset="common4"
                                        color="paragraph"
                                    >
                                        ИТОГО
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        preset="common4"
                                        color="paragraph"
                                    >
                                        ОПЛАЧЕНО
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        preset="common4"
                                        color="paragraph"
                                    >
                                        ДЕЙСТВИЕ
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order: any) => (
                                <TableRow key={order._id}>
                                    <TableCell>
                                        <Typography
                                            preset="common4"
                                            color="paragraph"
                                        >
                                            {order._id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            preset="common4"
                                            color="paragraph"
                                        >
                                            {order.createdAt}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {' '}
                                        <Typography
                                            preset="common4"
                                            color="paragraph"
                                        >
                                            {order.totalPrice} ₽
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            preset="common4"
                                            color="paragraph"
                                        >
                                            {' '}
                                            {order.isPaid
                                                ? `оплачено в ${order.paidAt}`
                                                : 'не оплачено'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <NextLink
                                            href={`/order/${order._id}`}
                                            passHref
                                        >
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                            >
                                                Детали
                                            </Button>
                                        </NextLink>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default dynamic(() => Promise.resolve(OrderHistoryScreen), {
    ssr: false,
});

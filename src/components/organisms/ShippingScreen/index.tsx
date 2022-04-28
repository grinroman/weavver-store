import React, { useContext, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import styles from './shippingscreen.module.scss';
import NextLink from 'next/link';
import { Button, Link, List, ListItem, TextField } from '@mui/material';
import Form from 'src/components/atoms/Form';
import { Typography } from 'src/components/atoms/Typography';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router';
import { Store } from 'src/utils/context/Store';
import { getError } from 'src/utils/routes/error.js';
import CheckoutWizzard from 'src/components/molecules/CheckoutWizzard/inndex';
// type FormValues = {
//     name: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
// };

const ShippingScreen: React.FC = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm();

    const { state, dispatch } = useContext(Store);

    const {
        userInfo,
        cart: { shippingAddress },
    } = state;

    const router = useRouter();

    useEffect((): any => {
        //FIXME: поменять на норм тип
        if (!userInfo) {
            return router.push('/login?redirect=/shipping');
        }

        setValue('fullName', shippingAddress.fullName);
        setValue('address', shippingAddress.address);
        setValue('city', shippingAddress.city);
        setValue('postalCode', shippingAddress.postalCode);
        setValue('country', shippingAddress.country);
    }, [router, setValue, shippingAddress, userInfo]);

    const submitHandler: SubmitHandler<any> = ({
        fullName,
        address,
        city,
        postalCode,
        country,
    }) => {
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { fullName, address, city, postalCode, country },
        });
        jsCookie.set(
            'shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country,
            })
        );
        router.push('/payment');
    };

    const useStyles = makeStyles({
        input: {
            color: '#FFFFFF',
        },
    });
    const classes = useStyles();

    return (
        <div className={styles.root}>
            <div className={styles.root__checkoutwrapper}>
                <CheckoutWizzard activeStep={1}></CheckoutWizzard>
            </div>
            <Form onSubmit={handleSubmit(submitHandler)}>
                <Typography
                    preset="title2"
                    color="primary"
                    component="div"
                    align="center"
                    className={styles.root__header}
                >
                    Формирование заказа
                </Typography>
                <List>
                    <ListItem>
                        <Controller
                            name="fullName"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 5,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="fullName"
                                    label="ФИО получателя"
                                    inputProps={{ type: 'fullName' }}
                                    error={Boolean(errors.fullName)}
                                    helperText={
                                        errors.fullName
                                            ? errors.fullName.type ===
                                              'minLength'
                                                ? 'ФИО более 5 символов!'
                                                : 'Требуется ФИО получателя!'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="address"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 5,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="address"
                                    label="Адрес"
                                    inputProps={{ type: 'address' }}
                                    error={Boolean(errors.address)}
                                    helperText={
                                        errors.address
                                            ? errors.address.type ===
                                              'minLength'
                                                ? 'Длина адреса более 5 символов!'
                                                : 'Требуется ввести адрес!'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="city"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 1,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="city"
                                    label="Город"
                                    inputProps={{ type: 'city' }}
                                    error={Boolean(errors.city)}
                                    helperText={
                                        errors.city
                                            ? errors.city.type === 'minLength'
                                                ? 'Название города требует более 1 символа!'
                                                : 'Требуется ввести название города!'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="postalCode"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 6,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="postalCode"
                                    label="Индекс"
                                    inputProps={{ type: 'postalCode' }}
                                    error={Boolean(errors.postalCode)}
                                    helperText={
                                        errors.postalCode
                                            ? errors.postalCode.type ===
                                              'minLength'
                                                ? 'Длина индекса более 5 симовлов 5!'
                                                : 'Требуется ввести индекс!'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="country"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 3,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="postalCode"
                                    label="Страна"
                                    inputProps={{ type: 'country' }}
                                    error={Boolean(errors.country)}
                                    helperText={
                                        errors.country
                                            ? errors.country.type ===
                                              'minLength'
                                                ? 'Название страны более 2 символов!'
                                                : 'Требуется ввести название страны!'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            color="secondary"
                        >
                            Продолжить
                        </Button>
                    </ListItem>
                </List>
            </Form>
        </div>
    );
};

export default ShippingScreen;

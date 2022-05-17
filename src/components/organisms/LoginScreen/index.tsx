import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import styles from './loginscreen.module.scss';
import NextLink from 'next/link';
import { Button, Link, List, ListItem, TextField } from '@mui/material';
import Form from 'src/components/atoms/Form';
import { Typography } from 'src/components/atoms/Typography';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Store } from 'src/utils/context/Store';
import jsCookie from 'js-cookie';
import Image from 'next/image';
import { Breakpoint, useBreakpoints } from 'src/hooks/useBreakpoints';

const LoginScreen: React.FC = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const router = useRouter();
    const { redirect } = router.query;
    const { enqueueSnackbar } = useSnackbar();
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    useEffect(() => {
        if (userInfo) {
            router.push(redirect ? redirect.toString() : '/');
        }
    }, [router, userInfo, redirect]);

    const submitHandler: SubmitHandler<any> = async ({ email, password }) => {
        try {
            const { data } = await axios.post('/api/users/login', {
                email,
                password,
            });
            dispatch({ type: 'USER_LOGIN', payload: data });
            jsCookie.set('userInfo', JSON.stringify(data));
            router.push(redirect ? redirect!.toString() : '/');
        } catch (err) {
            enqueueSnackbar(err.message, { variant: 'error' });
        }
    };

    const [isMobile, setIsMobile] = useState<boolean>(false);
    useBreakpoints((breakpoint) => {
        setIsMobile(breakpoint < Breakpoint.TABLET);
    });

    const useStyles = makeStyles({
        input: {
            color: '#FFFFFF',
        },
    });
    const classesLocal = useStyles();

    return (
        <div className={styles.root}>
            <div className={styles.root__formwrapper}>
                <Form onSubmit={handleSubmit(submitHandler)}>
                    <div className={styles.root__titlewrapper}>
                        <Typography
                            preset="title2"
                            color="primary"
                            component="div"
                            className={styles.root__header}
                            align={isMobile ? 'left' : 'center'}
                        >
                            Вход
                        </Typography>
                        {isMobile && (
                            <div className={styles.root__mobileskullwrapper}>
                                <Image
                                    src="/images/backgrounds/mobileskull.svg"
                                    alt="skull background"
                                    width={160}
                                    height={1550}
                                />
                            </div>
                        )}
                    </div>
                    <List>
                        <ListItem>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true,
                                    pattern:
                                        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                }}
                                render={({ field }) => (
                                    <TextField
                                        color="secondary"
                                        variant="outlined"
                                        fullWidth
                                        id="name"
                                        label={
                                            <Typography
                                                preset="common4"
                                                color="paragraph"
                                            >
                                                Почта
                                            </Typography>
                                        }
                                        inputProps={{
                                            type: 'name',
                                            className: classesLocal.input,
                                        }}
                                        error={Boolean(errors.name)}
                                        helperText={
                                            errors.name
                                                ? errors.name.type ===
                                                  'minLength'
                                                    ? 'Имя должно быть более 4-ёх симовлов'
                                                    : 'Требуется имя'
                                                : ''
                                        }
                                        {...field}
                                    ></TextField>
                                )}
                            ></Controller>
                        </ListItem>
                        <ListItem>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true,
                                    minLength: 6,
                                }}
                                render={({ field }) => (
                                    <TextField
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                        id="password"
                                        label={
                                            <Typography
                                                preset="common4"
                                                color="paragraph"
                                            >
                                                Пароль
                                            </Typography>
                                        }
                                        inputProps={{
                                            type: 'password',
                                        }}
                                        error={Boolean(errors.password)}
                                        helperText={
                                            errors.password
                                                ? errors.password.type ===
                                                  'minLength'
                                                    ? 'Password length is more than 5'
                                                    : 'Password is required'
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
                                <Typography preset="common1" color="paragraph">
                                    Вход
                                </Typography>
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Typography preset="common4" color="paragraph">
                                Нет аккаунта?
                            </Typography>
                            <NextLink
                                href={`/register?redirect=${redirect || '/'}`}
                                passHref
                            >
                                <a className={styles.root__registation__link}>
                                    <Typography
                                        preset="common4"
                                        color="primary"
                                        component="div"
                                        className={styles.root__entrance}
                                    >
                                        Зарегестрироваться
                                    </Typography>
                                </a>
                            </NextLink>
                        </ListItem>
                    </List>
                </Form>
            </div>
            {!isMobile && (
                <div className={styles.root__skullwrapper}>
                    <Image
                        src="/images/backgrounds/skullsignin.svg"
                        alt="skull background"
                        width={750}
                        height={660}
                    />
                </div>
            )}
        </div>
    );
};

export default LoginScreen;

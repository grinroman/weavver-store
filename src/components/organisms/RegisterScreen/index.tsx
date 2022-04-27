import React, { useContext, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import styles from './registerscreen.module.scss';
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

// type FormValues = {
//     name: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
// };

const RegisterScreen: React.FC = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    const router = useRouter();
    useEffect(() => {
        //if user has already loged in in is no need to show login screen again so we need to redirect user to main creen through using router
        if (userInfo) {
            router.push('/');
        }
    }, [router, userInfo]);
    const { enqueueSnackbar } = useSnackbar();
    const submitHandler: SubmitHandler<any> = async ({
        //FIXME: поменять тип
        name,
        email,
        password,
        confirmPassword,
    }) => {
        if (password !== confirmPassword) {
            enqueueSnackbar('Пароли не совпадают!', { variant: 'error' });
            return;
        }

        try {
            const { data } = await axios.post('/api/users/register', {
                name,
                email,
                password,
            });
            dispatch({ type: 'USER_LOGIN', payload: data });
            jsCookie.set('userInfo', JSON.stringify(data));
            router.push('/');
        } catch (err) {
            enqueueSnackbar(err.message, { variant: 'error' });
        }
    };

    const useStyles = makeStyles({
        input: {
            color: '#FFFFFF',
        },
    });
    const classes = useStyles();

    return (
        <div className={styles.root}>
            <Form onSubmit={handleSubmit(submitHandler)}>
                <Typography
                    preset="title2"
                    color="primary"
                    component="div"
                    className={styles.root__header}
                >
                    Регистрация
                </Typography>
                <List>
                    <ListItem>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 4,
                            }}
                            render={({ field }) => (
                                <TextField
                                    color="secondary"
                                    variant="outlined"
                                    fullWidth
                                    id="name"
                                    label="Имя"
                                    inputProps={{
                                        type: 'name',
                                        className: classes.input,
                                    }}
                                    error={Boolean(errors.name)}
                                    helperText={
                                        errors.name
                                            ? errors.name.type === 'minLength'
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
                                    id="email"
                                    label="Почта"
                                    inputProps={{
                                        type: 'email',
                                        className: classes.input,
                                    }}
                                    error={Boolean(errors.email)}
                                    helperText={
                                        errors.email
                                            ? errors.email.type === 'pattern'
                                                ? 'Не корректно задана почта'
                                                : 'Требуется почта'
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
                                    label="Пароль"
                                    inputProps={{
                                        type: 'password',
                                        className: classes.input,
                                    }}
                                    error={Boolean(errors.password)}
                                    helperText={
                                        errors.password
                                            ? errors.password.type ===
                                              'minLength'
                                                ? 'Пароль должен быть более 5 символов'
                                                : 'Требуется ввести пароль'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="confirmPassword"
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
                                    id="confirmPassword"
                                    label="Подтверждение пароля"
                                    inputProps={{
                                        type: 'confirmPassword',
                                        className: classes.input,
                                    }}
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={
                                        errors.confirmPassword
                                            ? errors.confirmPassword.type ===
                                              'minLength'
                                                ? 'Пароль должен быть более 5 символов'
                                                : 'Требуется подтверждение пароля'
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
                                Регистрация
                            </Typography>
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Typography preset="common4" color="paragraph">
                            Уже есть аккаунт?
                        </Typography>
                        <NextLink href={'/login'} passHref>
                            <a className={styles.root__registation__link}>
                                <Typography preset="common4" color="primary">
                                    Вход
                                </Typography>
                            </a>
                        </NextLink>
                    </ListItem>
                </List>
            </Form>
        </div>
    );
};

export default RegisterScreen;

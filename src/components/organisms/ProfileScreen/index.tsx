import React, { useContext, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import styles from './profilescreen.module.scss';
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
import dynamic from 'next/dynamic';
// import classes from 'src/utils/classes/classes';
type SubmitProps = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const ProfileScreen: React.FC = () => {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm();

    useEffect((): any => {
        if (!userInfo) {
            return router.push('/login');
        }
        setValue('name', userInfo.name);
        setValue('email', userInfo.email);
    }, [router, setValue, userInfo]);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const submitHandler: SubmitHandler<any> = async ({
        name,
        email,
        password,
        confirmPassword,
    }: SubmitProps) => {
        closeSnackbar();
        if (password !== confirmPassword) {
            enqueueSnackbar("Passwords don't match", { variant: 'error' });
            return;
        }
        try {
            const { data } = await axios.put(
                '/api/users/profile',
                {
                    name,
                    email,
                    password,
                },
                { headers: { authorization: `Bearer ${userInfo.token}` } }
            );
            dispatch({ type: 'USER_LOGIN', payload: data }); //relogin updated user
            jsCookie.set('userInfo', JSON.stringify(data));
            enqueueSnackbar('Профиль обновлен успешно', {
                variant: 'success',
            });
        } catch (err) {
            enqueueSnackbar(getError(err), { variant: 'error' });
        }
    };

    const useStyles = makeStyles({
        input: {
            color: '#FFFFFF',
        },
    });
    const classesLocal = useStyles();

    return (
        <div className={styles.root}>
            <Typography
                preset="title2"
                color="primary"
                component="div"
                className={styles.root__header}
                align="center"
            >
                Профиль
            </Typography>
            <Form onSubmit={handleSubmit(submitHandler)}>
                <List>
                    <ListItem>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                    color="primary"
                                    variant="outlined"
                                    fullWidth
                                    id="name"
                                    label={
                                        <Typography
                                            preset="common4"
                                            color="registerbutton"
                                        >
                                            Имя
                                        </Typography>
                                    }
                                    inputProps={{
                                        type: 'text',
                                        className: classesLocal.input,
                                    }}
                                    error={Boolean(errors.name)}
                                    helperText={
                                        errors.name
                                            ? errors.name.type === 'minLength'
                                                ? 'Имя более 2-ух символов'
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
                                    color="primary"
                                    variant="outlined"
                                    fullWidth
                                    id="email"
                                    label={
                                        <Typography
                                            preset="common4"
                                            color="registerbutton"
                                        >
                                            Почта
                                        </Typography>
                                    }
                                    inputProps={{
                                        type: 'email',
                                        className: classesLocal.input,
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
                                validate: (value) =>
                                    value === '' ||
                                    value.length > 5 ||
                                    'Длина пароля должна быть более 5 символов',
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    id="password"
                                    label={
                                        <Typography
                                            preset="common4"
                                            color="registerbutton"
                                        >
                                            Пароль
                                        </Typography>
                                    }
                                    inputProps={{
                                        type: 'password',
                                        className: classesLocal.input,
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
                                validate: (value) =>
                                    value === '' ||
                                    value.length > 5 ||
                                    'Подтверждени пароля должно быть более 5 символов!',
                            }}
                            render={({ field }) => (
                                <TextField
                                    color="primary"
                                    variant="outlined"
                                    fullWidth
                                    id="confirmPassword"
                                    label={
                                        <Typography
                                            preset="common4"
                                            color="registerbutton"
                                        >
                                            Повторите подтвержление пароля
                                        </Typography>
                                    }
                                    inputProps={{
                                        type: 'password',
                                        className: classesLocal.input,
                                    }}
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={
                                        errors.confirmPassword
                                            ? 'Подтверждение пароля более 5 символов!'
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
                            color="primary"
                        >
                            Обновить
                        </Button>
                    </ListItem>
                </List>
            </Form>
        </div>
    );
};

export default dynamic(() => Promise.resolve(ProfileScreen), {
    ssr: false,
});

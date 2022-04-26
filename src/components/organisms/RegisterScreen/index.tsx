import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './registerscreen.module.scss';
import NextLink from 'next/link';
import { Button, Link, List, ListItem, TextField } from '@mui/material';
import Form from 'src/components/atoms/Form';
import { Typography } from 'src/components/atoms/Typography';
import { makeStyles } from '@mui/styles';
type Props = {};

const RegisterScreen: React.FC<Props> = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const submitHandler = async ({
        name,
        email,
        password,
        confirmPassword,
    }) => {
        console.log('gg');
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
                                        type: 'email',
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
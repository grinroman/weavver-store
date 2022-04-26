import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './loginscreen.module.scss';
import NextLink from 'next/link';
import { Button, Link, List, ListItem, TextField } from '@mui/material';
import Form from 'src/components/atoms/Form';
import { Typography } from 'src/components/atoms/Typography';
import { makeStyles } from '@mui/styles';
type Props = {};

const LoginScreen: React.FC<Props> = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const submitHandler = async ({ email, password }) => {
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
                    Вход
                </Typography>
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
                                                ? 'Email is not valid'
                                                : 'Email is required'
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
                        <NextLink href={'/register'} passHref>
                            <a className={styles.root__registation__link}>
                                <Typography preset="common4" color="primary">
                                    Зарегестрироваться
                                </Typography>
                            </a>
                        </NextLink>
                    </ListItem>
                </List>
            </Form>
        </div>
    );
};

export default LoginScreen;
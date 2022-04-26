import React, {
    useEffect,
    useRef,
    useState,
    forwardRef,
    useContext,
} from 'react';
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
import axios from 'axios';
import { useSnackbar } from 'notistack';
import dynamic from 'next/dynamic';

export type TableHeader = {
    name: string;
    align: string | null;
};

export const CartScreen: React.FC = () => {
    const {
        state: {
            cart: { cartItems },
        },
        dispatch,
    } = useContext(Store);
    const [itemsCount, setItemsCount] = useState(
        cartItems.reduce((a: any, c: { quantity: any }) => a + c.quantity, 0)
    );
    const { enqueueSnackbar } = useSnackbar();

    const updateCartHandler = async (item: Product, quantity: number) => {
        const { data } = await axios.get(`/api/Products/${item._id}`);
        setItemsCount(quantity);
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
    };

    const removeItemHandler = (item: any) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
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
                        <Grid item md={9} xs={12} spacing={1}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {cartpagetitles.map(
                                                (item: any): any => {
                                                    return (
                                                        <TableCell
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
                                                                item.countInStock
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
                            <Card>
                                <List>
                                    <ListItem>
                                        <Typography
                                            preset="common4"
                                            color="background"
                                            className={styles.root__subtotal}
                                        >
                                            Итого (
                                            {cartItems.reduce(
                                                (
                                                    a: any,
                                                    c: { quantity: any }
                                                ) => a + c.quantity,
                                                0
                                            )}{' '}
                                            {getPlural(
                                                cartItems.reduce(
                                                    (
                                                        a: any,
                                                        c: { quantity: any }
                                                    ) => a + c.quantity,
                                                    0
                                                ),
                                                'вещь',
                                                'вещи',
                                                'вещей'
                                            )}
                                            ) : ₽{' '}
                                            {cartItems.reduce(
                                                (
                                                    a: number,
                                                    c: {
                                                        quantity: number;
                                                        price: number;
                                                    }
                                                ) => a + c.quantity * c.price,
                                                0
                                            )}
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Button
                                            fullWidth
                                            color="secondary"
                                            variant="contained"
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

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });

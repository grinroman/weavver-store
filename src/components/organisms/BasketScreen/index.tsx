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

    return (
        <div className={styles.root}>
            {cartItems.length === 0 ? (
                <Typography component="div" preset="title2" color="paragraph">
                    Ваша корзина пуста!
                </Typography>
            ) : (
                <>
                    <Typography
                        component="div"
                        preset="title2"
                        color="paragraph"
                    >
                        Ваша корзина
                    </Typography>
                    <Grid container>
                        <Grid item md={9} xs={12}>
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
                                                            updateCardHandler(
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
                                                        x
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
                                                itemsCount,
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
                                            Checkout
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

export default CartScreen;

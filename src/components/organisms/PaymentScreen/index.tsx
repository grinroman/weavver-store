import React, {
    useEffect,
    useRef,
    useState,
    forwardRef,
    useContext,
} from 'react';
import styles from './paymentscreen.module.scss';
import CheckoutWizzard from 'src/components/molecules/CheckoutWizzard';
import Form from 'src/components/atoms/Form';
import { Typography } from 'src/components/atoms/Typography';
import {
    Button,
    FormControl,
    FormControlLabel,
    List,
    ListItem,
    Radio,
    RadioGroup,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { Store } from 'src/utils/context/Store';
import { useRouter } from 'next/router';
import jsCookie from 'js-cookie';
// export type ProductPageProps = {
//     product: Product;
// };

export const PaymentScreen: React.FC = ({}) => {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState('');
    const { state, dispatch } = useContext(Store);
    const {
        cart: { shippingAddress },
    } = state;

    useEffect(() => {
        if (!shippingAddress.address) {
            router.push('/shipping');
        } else {
            setPaymentMethod(jsCookie.get('paymentMethod') || '');
        }
    }, [router, shippingAddress]);

    const submitHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (!paymentMethod) {
            enqueueSnackbar('Требуется внести метод оплаты!', {
                variant: 'error',
            });
        } else {
            dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
            jsCookie.set('paymentMethod', paymentMethod);
            router.push('/placeorder');
        }
    };
    //FIXME: dont keep selected method17
    return (
        <div className={styles.root}>
            <div className={styles.root__checkoutwrapper}>
                <CheckoutWizzard activeStep={2}></CheckoutWizzard>
            </div>
            <Form onSubmit={submitHandler}>
                <Typography
                    preset="title2"
                    color="primary"
                    component="div"
                    className={styles.root__header}
                >
                    Payment Method
                </Typography>
                <List>
                    <ListItem>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="Способ оплаты"
                                name="paymentMethod"
                                sx={{
                                    color: '#6600c6',
                                }}
                                value={paymentMethod}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            >
                                <FormControlLabel
                                    label="PayPal"
                                    value="PayPal"
                                    control={
                                        <Radio
                                            color="secondary"
                                            sx={{
                                                color: '#6600c6',
                                            }}
                                        />
                                    }
                                />
                                <FormControlLabel
                                    label="Stripe"
                                    value="Stripe"
                                    control={
                                        <Radio
                                            color="secondary"
                                            sx={{
                                                color: '#6600c6',
                                            }}
                                        />
                                    }
                                />
                                <FormControlLabel
                                    label="Наличная оплата"
                                    value="Cash"
                                    control={
                                        <Radio
                                            color="secondary"
                                            sx={{
                                                color: '#6600c6',
                                            }}
                                        />
                                    }
                                />
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={() => router.push('/placeorder')}
                        >
                            Продолжить
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button
                            fullWidth
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={() => router.push('/shipping')}
                        >
                            Назад
                        </Button>
                    </ListItem>
                </List>
            </Form>
        </div>
    );
};

export default PaymentScreen;

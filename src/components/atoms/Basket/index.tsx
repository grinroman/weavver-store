import { Typography } from '../Typography';
import styles from './basket.module.scss';

type BasketProps = { itemsQuantity: number };

export const Basket: React.FC<BasketProps> = ({ itemsQuantity }) => {
    return (
        <div className={styles.root}>
            <button>
                <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-labelledby="basketIconTitle"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    color="#000000"
                >
                    {' '}
                    <title id="basketIconTitle">Basket</title>{' '}
                    <path d="M14 4l6 6-1.372 9H5.372L4 10l6-6" />{' '}
                    <path strokeLinecap="round" d="M4 10h16" />{' '}
                </svg>
            </button>
            {itemsQuantity ? (
                <div className={styles.root__cart__quantity}>
                    <Typography
                        preset="common4"
                        color="paragraph"
                        component="div"
                        className={styles.root__centrise__quantity}
                    >
                        {itemsQuantity}
                    </Typography>
                </div>
            ) : null}
        </div>
    );
};

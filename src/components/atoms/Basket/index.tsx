import styles from './basket.module.scss';
import skull from 'public/svgs/skull-svgrepo-com.svg';

export const Basket: React.FC = () => {
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
        </div>
    );
};

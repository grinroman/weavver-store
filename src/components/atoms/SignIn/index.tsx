import styles from './signin.module.scss';

export const SignIn: React.FC = () => {
    return (
        <div className={styles.root}>
            <button>
                <svg
                    width="20"
                    height="22"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.0002 2.25C8.06721 2.25 6.50021 3.817 6.50021 5.75C6.50021 7.683 8.06721 9.25 10.0002 9.25C11.9332 9.25 13.5002 7.683 13.5002 5.75C13.5002 3.817 11.9332 2.25 10.0002 2.25ZM4.50021 5.75C4.50021 2.71243 6.96264 0.25 10.0002 0.25C13.0378 0.25 15.5002 2.71243 15.5002 5.75C15.5002 8.78757 13.0378 11.25 10.0002 11.25C6.96264 11.25 4.50021 8.78757 4.50021 5.75Z"
                        fill="#1E212C"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.10427 14.25C3.41095 14.25 2.86904 14.5876 2.64907 15.0726C2.34461 15.7439 2.06891 16.5432 2.00385 17.3012C1.97477 17.64 2.11605 17.8897 2.31073 18.0107C3.33989 18.65 5.7246 19.75 10.0002 19.75C14.2758 19.75 16.6605 18.65 17.6897 18.0107C17.8844 17.8897 18.0257 17.64 17.9966 17.3012C17.9315 16.5432 17.6558 15.7439 17.3514 15.0726C17.1314 14.5876 16.5895 14.25 15.8961 14.25H4.10427ZM0.827638 14.2466C1.43558 12.9061 2.79312 12.25 4.10427 12.25H15.8961C17.2073 12.25 18.5648 12.9061 19.1728 14.2466C19.522 15.0165 19.8967 16.0515 19.9892 17.1301C20.0735 18.1124 19.6653 19.1379 18.745 19.7096C17.3915 20.5504 14.6398 21.75 10.0002 21.75C5.36061 21.75 2.60891 20.5504 1.25537 19.7096C0.335112 19.1379 -0.0731282 18.1124 0.0111763 17.1301C0.103754 16.0515 0.478452 15.0165 0.827638 14.2466Z"
                        fill="#1E212C"
                    />
                </svg>
            </button>
        </div>
    );
};
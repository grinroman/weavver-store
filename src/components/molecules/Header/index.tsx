import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, {
    MutableRefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import styles from './header.module.scss';
import { Typography } from 'src/components/atoms/Typography';
import Link from 'next/link';
import { Logo } from 'src/components/atoms/Logo';
import { Basket } from 'src/components/atoms/Basket';
import { SignIn } from 'src/components/atoms/SignIn';
import { Breakpoint, useBreakpoints } from 'src/hooks/useBreakpoints';
import { Store } from 'src/utils/context/Store';
import {
    Box,
    Button,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
} from '@mui/material';
import classes from 'src/utils/classes/classes.js';
import jsCookie from 'js-cookie';
import { SubmitHandler } from 'react-hook-form';

export type HeaderProps = {
    popularRef?: MutableRefObject<HTMLDivElement | null>;
    categoryRef?: MutableRefObject<HTMLDivElement | null>;
    aboutusRef?: MutableRefObject<HTMLDivElement | null>;
    contactusRef?: MutableRefObject<HTMLDivElement | null>;
    haveBasketIcon?: boolean;
    scrollTo?: any;
    setTitle?: any;
    backTitle?: string;
    backHref?: string | '/';
};
export type TabName = 'right' | 'value' | 'key' | 'other' | 'disabled';

export const Header: React.FC<HeaderProps> = ({
    popularRef,
    categoryRef,
    aboutusRef,
    contactusRef,
    scrollTo,
    setTitle,
    backTitle,
    backHref,
    haveBasketIcon = true,
}) => {
    backTitle = backTitle || `\< На главную`;
    backHref = backHref || '/';
    const router = useRouter();
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isTablet, setIsTablet] = useState<boolean>(false);
    const [isBurger, setIsBurger] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<TabName>(
        router.asPath === '/' ? 'right' : 'disabled'
    );
    const burgerRef = useRef<HTMLDivElement | null>(null);
    const { state, dispatch } = useContext(Store);
    const { cart, userInfo } = state;

    useBreakpoints((breakpoint) => {
        setIsMobile(breakpoint < Breakpoint.TABLET);
        setIsTablet(
            breakpoint < Breakpoint.DESKTOP && breakpoint > Breakpoint.MOBILE
        );
    });

    useEffect(() => {
        const handleScroll = () => {
            if (
                popularRef &&
                categoryRef &&
                aboutusRef &&
                contactusRef &&
                popularRef.current &&
                categoryRef.current &&
                aboutusRef.current &&
                contactusRef.current
            ) {
                const currentHeight = window.scrollY + 94;
                const valueHeight = categoryRef.current!.offsetTop;
                const keyHeight = aboutusRef.current!.offsetTop;
                const otherHeight = contactusRef.current!.offsetTop;

                if (currentHeight >= otherHeight - 300) {
                    setActiveTab('other');
                    setTitle('Связаться');
                } else if (currentHeight >= keyHeight - 300) {
                    setActiveTab('key');
                    setTitle('О компании');
                } else if (currentHeight >= valueHeight - 300) {
                    setActiveTab('value');
                    setTitle('Аресы');
                } else {
                    setActiveTab('right');
                    setTitle('Популярное');
                }
            }
        };

        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    });

    const burgerHandler = () => {
        setIsBurger(!isBurger);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const loginMenuCloseHandler = (e: any, redirect: any) => {
        setAnchorEl(null);
        if (redirect) {
            router.push(redirect);
        }
    };

    const loginClickHandler = (e: any) => {
        setAnchorEl(e.currentTarget);
    };
    const logoutClickHandler = () => {
        setAnchorEl(null);
        dispatch({ type: 'USER_LOGOUT' });
        jsCookie.remove('userInfo');
        jsCookie.remove('cartItems');
        jsCookie.remove('shippingAdress');
        jsCookie.remove('paymentMethod');
        router.push('/');
    };
    const [querySearch, setQuerySearch] = useState('');

    const queryChangeHandler: SubmitHandler<any> = (e) => {
        setQuerySearch(e.target.value);
    };

    const submitHandler: SubmitHandler<any> = (e) => {
        e.preventDefault();
        router.push(`/catalog?query=${querySearch}`);
    };

    return (
        <>
            <header className={styles.root}>
                {isMobile && ( //кнопка бургер меню для ТЕЛЕФОНА
                    <div className={styles.root__mobilebtnwrapper}>
                        <button
                            className={styles.root__burger}
                            onClick={() => burgerHandler()}
                        >
                            <span
                                className={clsx(
                                    styles.root__burger__line1,
                                    isBurger && styles['active']
                                )}
                            />
                            <span
                                className={clsx(
                                    styles.root__burger__line2,
                                    isBurger && styles['active']
                                )}
                            />
                        </button>
                        {haveBasketIcon ? (
                            <>
                                <Link href="/cart">
                                    <a
                                        className={clsx(
                                            router.asPath === '/' &&
                                                styles['active']
                                        )}
                                    >
                                        <Basket
                                            itemsQuantity={
                                                cart.cartItems.length
                                            }
                                        />
                                    </a>
                                </Link>
                                {userInfo ? (
                                    // <Link href="/profile">
                                    //     <a
                                    //         className={clsx(
                                    //             router.asPath === '/' &&
                                    //                 styles['active']
                                    //         )}
                                    //     >
                                    //         <SignIn userName={userInfo.name} />
                                    //     </a>
                                    // </Link>
                                    <>
                                        <div className={styles.root__logined}>
                                            <Button
                                                aria-controls="simple-menu"
                                                aria-haspopup="true"
                                                sx={classes.navbarButton}
                                                onClick={loginClickHandler}
                                            >
                                                {userInfo.name}
                                            </Button>
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={loginMenuCloseHandler}
                                            >
                                                <MenuItem
                                                    onClick={(e) =>
                                                        loginMenuCloseHandler(
                                                            e,
                                                            '/profile'
                                                        )
                                                    }
                                                >
                                                    Профиль
                                                </MenuItem>

                                                <MenuItem
                                                    onClick={(e) =>
                                                        loginMenuCloseHandler(
                                                            e,
                                                            '/order-history'
                                                        )
                                                    }
                                                >
                                                    История заказов
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={logoutClickHandler}
                                                >
                                                    Выход
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                    </>
                                ) : (
                                    <Link href="/login">
                                        <a
                                            className={clsx(
                                                router.asPath === '/' &&
                                                    styles['active']
                                            )}
                                        >
                                            <SignIn userName={null} />
                                        </a>
                                    </Link>
                                )}
                            </>
                        ) : null}
                    </div>
                )}
                {!isMobile && ( //навигация по ГЛАВНОЙ странице для ПК
                    <>
                        <nav className={styles.root__nav}>
                            {router.asPath === '/' ? (
                                <>
                                    <button
                                        onClick={() => {
                                            scrollTo(popularRef!.current);
                                        }}
                                        className={clsx(
                                            styles.root__tab,
                                            activeTab === 'right'
                                                ? styles['active']
                                                : styles['inactive']
                                        )}
                                    >
                                        <Typography
                                            preset="tab"
                                            color={
                                                activeTab === 'right'
                                                    ? 'paragraph'
                                                    : 'primary'
                                            }
                                        >
                                            Популярное
                                        </Typography>
                                    </button>
                                    <button
                                        onClick={() => {
                                            scrollTo(categoryRef!.current);
                                        }}
                                        className={clsx(
                                            styles.root__tab,
                                            activeTab === 'value'
                                                ? styles['active']
                                                : styles['inactive']
                                        )}
                                    >
                                        <Typography
                                            preset="tab"
                                            color={
                                                activeTab === 'value'
                                                    ? 'paragraph'
                                                    : 'primary'
                                            }
                                        >
                                            Категории
                                        </Typography>
                                    </button>
                                    <button
                                        onClick={() => {
                                            scrollTo(aboutusRef!.current);
                                        }}
                                        className={clsx(
                                            styles.root__tab,
                                            activeTab === 'key'
                                                ? styles['active']
                                                : styles['inactive']
                                        )}
                                    >
                                        <Typography
                                            preset="tab"
                                            color={
                                                activeTab === 'key'
                                                    ? 'paragraph'
                                                    : 'primary'
                                            }
                                        >
                                            Мы
                                        </Typography>
                                    </button>
                                    <button
                                        onClick={() => {
                                            scrollTo(contactusRef!.current);
                                        }}
                                        className={clsx(
                                            styles.root__tab,
                                            activeTab === 'other'
                                                ? styles['active']
                                                : styles['inactive']
                                        )}
                                    >
                                        <Typography
                                            preset="tab"
                                            color={
                                                activeTab === 'other'
                                                    ? 'paragraph'
                                                    : 'primary'
                                            }
                                        >
                                            Связаться
                                        </Typography>
                                    </button>
                                </>
                            ) : (
                                <Link href={backHref}>
                                    <a
                                        className={
                                            styles.root__links__item__home
                                        }
                                    >
                                        <Typography
                                            preset="common4"
                                            color={
                                                router.asPath === '/howto'
                                                    ? 'paragraph'
                                                    : 'primary'
                                            }
                                        >
                                            {backTitle}
                                        </Typography>
                                    </a>
                                </Link>
                            )}
                        </nav>
                        <form
                            onSubmit={submitHandler}
                            className={styles.root__formwrapper}
                        >
                            <Box sx={classes.searchForm}>
                                <InputBase
                                    name="query"
                                    sx={classes.searchInput}
                                    placeholder="Поиск товаров"
                                    onChange={queryChangeHandler}
                                />
                                <IconButton
                                    type="submit"
                                    sx={classes.searchButton}
                                    aria-label="search"
                                >
                                    <SearchIcon />
                                </IconButton>
                            </Box>
                        </form>
                    </>
                )}
                <Link href="/">
                    <a className={styles.root__logo}>
                        <Logo />
                    </a>
                </Link>

                {isMobile && (
                    <>
                        <form
                            onSubmit={submitHandler}
                            className={styles.root__formwrapper}
                        >
                            <Box sx={classes.searchForm}>
                                <InputBase
                                    name="query"
                                    sx={classes.searchInput}
                                    placeholder="Поиск товаров"
                                    onChange={queryChangeHandler}
                                />
                                <IconButton
                                    type="submit"
                                    sx={classes.searchButton}
                                    aria-label="search"
                                >
                                    <SearchIcon />
                                </IconButton>
                            </Box>
                        </form>
                        <nav
                            ref={burgerRef}
                            className={clsx(
                                styles.root__burger__menu,
                                isBurger && styles['toggle']
                            )}
                        >
                            <Link href={backHref}>
                                <a
                                    className={clsx(
                                        styles.root__links__item,
                                        router.asPath === '/' &&
                                            styles['active']
                                    )}
                                >
                                    <Typography
                                        preset={isMobile ? 'burger' : 'common4'}
                                        color={
                                            router.asPath === '/'
                                                ? 'paragraph'
                                                : 'primary'
                                        }
                                    >
                                        {backTitle}
                                    </Typography>
                                </a>
                            </Link>

                            <Link href="/catalog">
                                <a
                                    className={clsx(
                                        styles.root__links__item,
                                        router.asPath === '/' &&
                                            styles['active']
                                    )}
                                >
                                    <Typography
                                        preset={isMobile ? 'burger' : 'common4'}
                                        color={
                                            router.asPath === '/'
                                                ? 'paragraph'
                                                : 'body-0'
                                        }
                                    >
                                        К покупкам
                                    </Typography>
                                </a>
                            </Link>
                            <Link href="https://vk.com/heds.clother">
                                <a
                                    className={styles.root__links__item}
                                    target="_blank"
                                >
                                    <Typography
                                        preset={isMobile ? 'burger' : 'common4'}
                                        color="body-0"
                                    >
                                        Вконтакте
                                    </Typography>
                                </a>
                            </Link>
                        </nav>
                    </>
                )}
                {!isMobile && (
                    <nav className={styles.root__links}>
                        <Link href="/catalog">
                            <a className={styles.root__links__item}>
                                <Typography
                                    preset="common4"
                                    color={
                                        router.asPath === '/howto'
                                            ? 'paragraph'
                                            : 'body-0'
                                    }
                                >
                                    К покупкам
                                </Typography>
                            </a>
                        </Link>
                        <Link href="https://vk.com/heds.clother">
                            <a
                                className={styles.root__links__item}
                                target="_blank"
                            >
                                <Typography preset="common4" color="body-0">
                                    Вконтакте
                                </Typography>
                            </a>
                        </Link>
                        {haveBasketIcon ? (
                            <>
                                <Link href="/cart">
                                    <a
                                        className={clsx(
                                            router.asPath === '/' &&
                                                styles['active']
                                        )}
                                    >
                                        <Basket
                                            itemsQuantity={
                                                cart.cartItems.length
                                            }
                                        />
                                    </a>
                                </Link>{' '}
                                {userInfo ? (
                                    // <Link href="/profile">
                                    //     <a
                                    //         className={clsx(
                                    //             router.asPath === '/' &&
                                    //                 styles['active']
                                    //         )}
                                    //     >
                                    //         <SignIn userName={userInfo.name} />
                                    //     </a>
                                    // </Link>
                                    <>
                                        <div className={styles.root__logined}>
                                            <Button
                                                aria-controls="simple-menu"
                                                aria-haspopup="true"
                                                sx={classes.navbarButton}
                                                onClick={loginClickHandler}
                                            >
                                                {userInfo.name}
                                            </Button>
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={loginMenuCloseHandler}
                                            >
                                                <MenuItem
                                                    onClick={(e) =>
                                                        loginMenuCloseHandler(
                                                            e,
                                                            '/profile'
                                                        )
                                                    }
                                                >
                                                    Профиль
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={(e) =>
                                                        loginMenuCloseHandler(
                                                            e,
                                                            '/order-history'
                                                        )
                                                    }
                                                >
                                                    История заказов
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={logoutClickHandler}
                                                >
                                                    Выход
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                    </>
                                ) : (
                                    <Link href="/login">
                                        <a
                                            className={clsx(
                                                router.asPath === '/' &&
                                                    styles['active']
                                            )}
                                        >
                                            <SignIn userName={null} />
                                        </a>
                                    </Link>
                                )}
                            </>
                        ) : null}
                    </nav>
                )}
            </header>
            {isMobile && router.asPath === '/' && (
                <nav className={styles.root__nav__mobile}>
                    <button
                        onClick={() => {
                            scrollTo(popularRef!.current);
                        }}
                        className={clsx(
                            styles.root__tab,
                            activeTab === 'right' && styles['active']
                        )}
                    >
                        <Typography
                            preset="tab"
                            color={
                                activeTab === 'right' ? 'paragraph' : 'primary'
                            }
                        >
                            Популярное
                        </Typography>
                    </button>
                    <button
                        onClick={() => {
                            scrollTo(categoryRef!.current);
                        }}
                        className={clsx(
                            styles.root__tab,
                            activeTab === 'value' && styles['active']
                        )}
                    >
                        <Typography
                            preset="tab"
                            color={
                                activeTab === 'value' ? 'paragraph' : 'primary'
                            }
                        >
                            Категории
                        </Typography>
                    </button>
                    <button
                        onClick={() => {
                            scrollTo(aboutusRef!.current);
                        }}
                        className={clsx(
                            styles.root__tab,
                            activeTab === 'key' && styles['active']
                        )}
                    >
                        <Typography
                            preset="tab"
                            color={
                                activeTab === 'key' ? 'paragraph' : 'primary'
                            }
                        >
                            О нас
                        </Typography>
                    </button>
                    <button
                        onClick={() => {
                            scrollTo(contactusRef!.current);
                        }}
                        className={clsx(
                            styles.root__tab,
                            activeTab === 'other' && styles['active']
                        )}
                    >
                        <Typography
                            preset="tab"
                            color={
                                activeTab === 'other' ? 'paragraph' : 'primary'
                            }
                        >
                            Связаться
                        </Typography>
                    </button>
                </nav>
            )}
        </>
    );
};

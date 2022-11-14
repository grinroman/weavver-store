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
    weaverStoreRef?: MutableRefObject<HTMLDivElement | null>;
    categoriesRef?: MutableRefObject<HTMLDivElement | null>;
    whoWeAreRef?: MutableRefObject<HTMLDivElement | null>;
    contactusRef?: MutableRefObject<HTMLDivElement | null>;
    haveBasketIcon?: boolean;
    scrollTo?: any;
    backTitle?: string;
    backHref?: string | '/';
    haveSearch?: boolean;
};
export type TabName = 'weaverStore' | 'categories' | 'whoWeAre' | 'disabled';

export const Header: React.FC<HeaderProps> = ({
    weaverStoreRef,
    categoriesRef,
    whoWeAreRef,
    scrollTo,
    backTitle,
    backHref,
    haveBasketIcon = true,
    haveSearch,
}) => {
    backTitle = backTitle || `\< На главную`;
    backHref = backHref || '/';
    const router = useRouter();
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isTablet, setIsTablet] = useState<boolean>(false);
    const [isBurger, setIsBurger] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<TabName>(
        router.asPath === '/' ? 'weaverStore' : 'disabled'
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
                weaverStoreRef &&
                categoriesRef &&
                whoWeAreRef &&
                weaverStoreRef.current &&
                categoriesRef.current &&
                whoWeAreRef.current
            ) {
                const currentHeight = window.scrollY + 94;
                const weaverStoreHeight = weaverStoreRef.current!.offsetTop;
                const categoriesHeight = categoriesRef.current!.offsetTop;
                const whoWeAreHeight = whoWeAreRef.current!.offsetTop;

                if (currentHeight >= whoWeAreHeight - 300) {
                    setActiveTab('whoWeAre');
                } else if (currentHeight >= categoriesHeight - 300) {
                    setActiveTab('categories');
                } else {
                    setActiveTab('weaverStore');
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
        setQuerySearch(e.target.categories);
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
                                    <a>
                                        <Basket
                                            itemsQuantity={
                                                cart.cartItems.length
                                            }
                                        />
                                    </a>
                                </Link>
                                {userInfo ? (
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
                                            scrollTo(weaverStoreRef!.current);
                                        }}
                                        className={clsx(
                                            styles.root__tab,
                                            activeTab === 'weaverStore'
                                                ? styles['active']
                                                : styles['inactive']
                                        )}
                                    >
                                        <Typography
                                            preset="tab"
                                            color={
                                                activeTab === 'weaverStore'
                                                    ? 'paragraph'
                                                    : 'primary'
                                            }
                                        >
                                            Weavver Store
                                        </Typography>
                                    </button>
                                    <button
                                        onClick={() => {
                                            scrollTo(categoriesRef!.current);
                                        }}
                                        className={clsx(
                                            styles.root__tab,
                                            activeTab === 'categories'
                                                ? styles['active']
                                                : styles['inactive']
                                        )}
                                    >
                                        <Typography
                                            preset="tab"
                                            color={
                                                activeTab === 'categories'
                                                    ? 'paragraph'
                                                    : 'primary'
                                            }
                                        >
                                            Категории
                                        </Typography>
                                    </button>
                                    <button
                                        onClick={() => {
                                            scrollTo(whoWeAreRef!.current);
                                        }}
                                        className={clsx(
                                            styles.root__tab,
                                            activeTab === 'whoWeAre'
                                                ? styles['active']
                                                : styles['inactive']
                                        )}
                                    >
                                        <Typography
                                            preset="tab"
                                            color={
                                                activeTab === 'whoWeAre'
                                                    ? 'paragraph'
                                                    : 'primary'
                                            }
                                        >
                                            Мы
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
                        {haveSearch ? (
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
                        ) : null}
                    </>
                )}
                <Link href="/">
                    <a className={styles.root__logo}>
                        <Logo />
                    </a>
                </Link>

                {isMobile && (
                    <>
                        {haveSearch ? (
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
                        ) : null}

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
                                        Каталог
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
                                    Каталог
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
                            scrollTo(weaverStoreRef!.current);
                        }}
                        className={clsx(
                            styles.root__tab,
                            activeTab === 'weaverStore' && styles['active']
                        )}
                    >
                        <Typography
                            preset="tab"
                            color={
                                activeTab === 'weaverStore'
                                    ? 'paragraph'
                                    : 'primary'
                            }
                        >
                            Популярное
                        </Typography>
                    </button>
                    <button
                        onClick={() => {
                            scrollTo(categoriesRef!.current);
                        }}
                        className={clsx(
                            styles.root__tab,
                            activeTab === 'categories' && styles['active']
                        )}
                    >
                        <Typography
                            preset="tab"
                            color={
                                activeTab === 'categories'
                                    ? 'paragraph'
                                    : 'primary'
                            }
                        >
                            Категории
                        </Typography>
                    </button>
                </nav>
            )}
        </>
    );
};

import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import styles from './header.module.scss';
import { Typography } from 'src/components/atoms/Typography';
import Link from 'next/link';
import { Logo } from 'src/components/atoms/Logo';
import { Basket } from 'src/components/atoms/Basket';
import { Breakpoint, useBreakpoints } from 'src/hooks/useBreakpoints';

export type HeaderProps = {
    popularRef?: MutableRefObject<HTMLDivElement | null>;
    categoryRef?: MutableRefObject<HTMLDivElement | null>;
    aboutusRef?: MutableRefObject<HTMLDivElement | null>;
    contactusRef?: MutableRefObject<HTMLDivElement | null>;
    scrollTo?: any;
    setTitle?: any;
};

export type TabName = 'right' | 'value' | 'key' | 'other' | 'disabled';

export const Header: React.FC<HeaderProps> = ({
    popularRef,
    categoryRef,
    aboutusRef,
    contactusRef,
    scrollTo,
    setTitle,
}) => {
    const router = useRouter();
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isTablet, setIsTablet] = useState<boolean>(false);
    const [isBurger, setIsBurger] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<TabName>(
        router.asPath === '/' ? 'right' : 'disabled'
    );
    const burgerRef = useRef<HTMLDivElement | null>(null);

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
                        <Basket />
                    </div>
                )}
                {!isMobile && ( //навигация по ГЛАВНОЙ странице для ПК
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
                                        О компании
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
                            <Link href="/">
                                <a className={styles.root__links__item__home}>
                                    <Typography
                                        preset="common4"
                                        color={
                                            router.asPath === '/howto'
                                                ? 'paragraph'
                                                : 'primary'
                                        }
                                    >
                                        {`\< На главную`}
                                    </Typography>
                                </a>
                            </Link>
                        )}
                    </nav>
                )}
                <Link href="/">
                    <a className={styles.root__logo}>
                        <Logo />
                    </a>
                </Link>
                {isMobile && (
                    <nav
                        ref={burgerRef}
                        className={clsx(
                            styles.root__burger__menu,
                            isBurger && styles['toggle']
                        )}
                    >
                        <Link href="/">
                            <a
                                className={clsx(
                                    styles.root__links__item,
                                    router.asPath === '/' && styles['active']
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
                                    На главную
                                </Typography>
                            </a>
                        </Link>
                        <Link href="/catalog">
                            <a
                                className={clsx(
                                    styles.root__links__item,
                                    router.asPath === '/' && styles['active']
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
                                    Каталог товаров
                                </Typography>
                            </a>
                        </Link>
                        <Link href="/clothes">
                            <a
                                className={clsx(
                                    styles.root__links__item,
                                    router.asPath === '/' && styles['active']
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
                                    Одежда
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
                                    Каталог товаров
                                </Typography>
                            </a>
                        </Link>
                        <Link href="/clothes">
                            <a className={styles.root__links__item}>
                                <Typography
                                    preset="common4"
                                    color={
                                        router.asPath === '/howto'
                                            ? 'paragraph'
                                            : 'body-0'
                                    }
                                >
                                    Одежда
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
                        <Basket />
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
                            О компании
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
import React, { useEffect, useRef, useState } from 'react';
import styles from './categoryfilter.module.scss';
import productTypes from 'src/mocks/productTypes.json';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { Typography } from 'src/components/atoms/Typography';
import { useRouter } from 'next/router';
import axios from 'axios';
import client from 'src/utils/routes/client';
import DeleteIcon from '@mui/icons-material/Delete';
import { eType } from 'src/Types/eType';
import { Product } from 'src/Types/Product';
import { ProductCard } from 'src/components/molecules/ProductCard';
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputBase,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import prices from 'src/mocks/prices.json';
import classes from 'src/utils/classes/classes';
import { LoadingSpinner } from 'src/components/atoms/LoadingSpinner';
import { urlForThumbnail } from 'src/utils/routes/image';
import { SubmitHandler } from 'react-hook-form';

type CategoryFilterProps = {};

// type StateProps = { //FIXME: типизирвоать
//     categories: any[];
//     products: any[];
//     error: any;
//     loading: boolean;
// };

type FilterSerachProps = {
    category?: any;
    sort?: any;
    searchQuery?: any;
    price?: any;
    rating?: any;
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({}) => {
    const [sortingType, setSortingType] = useState('Умолчанию'); //тип сортировки
    const [priceRange, setPriceRange] = useState('Всё');
    const [productCategories, setProductCategories] = useState('Всё');

    const router = useRouter();
    const {
        category = 'all',
        query = 'all',
        price = 'all',
        rating = 'all',
        sort = 'default',
    } = router.query;

    const [state, setState] = useState<any>({
        categories: [],
        products: [],
        error: '',
        loading: true,
    });

    const { loading, products, error } = state;
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`/api/Products/categories`);
                setCategories(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchCategories();

        const fetchData = async () => {
            try {
                let gQuery = '*[_type == "product"';
                if (category !== 'all') {
                    gQuery += ` && category match "${category}" `;
                }
                if (query !== 'all') {
                    gQuery += ` && name match "${query}" `;
                }
                if (price !== 'all') {
                    const minPrice = Number((price as string).split('-')[0]);
                    const maxPrice = Number((price as string).split('-')[1]);
                    gQuery += ` && price >= ${minPrice} && price <= ${maxPrice}`;
                }
                if (rating !== 'all') {
                    gQuery += ` && rating >= ${Number(rating)} `;
                }
                let order = '';
                if (sort !== 'default') {
                    if (sort === 'lowest') order = '| order(price asc)';
                    if (sort === 'highest') order = '| order(price desc)';
                    if (sort === 'toprated') order = '| order(rating desc)';
                }

                gQuery += `] ${order}`;
                setState({ loading: true });

                const products = await client.fetch(gQuery);
                products = [
                    ...new Map(
                        products.map((product: Product) => [
                            product['description'],
                            product,
                        ])
                    ).values(),
                ];
                setState({ products, loading: false });
            } catch (err) {
                setState({ error: err.message, loading: false });
            }
        };
        fetchData();
    }, [category, price, query, rating, sort]);

    const filterSearch = ({
        category,
        sort,
        searchQuery,
        price,
        rating,
    }: FilterSerachProps) => {
        const path = router.pathname;
        const { query } = router;
        if (searchQuery) query.searchQuery = searchQuery;
        if (category) query.category = category;
        if (sort) query.sort = sort;
        if (price) query.price = price;
        if (rating) query.rating = rating;
        console.log(query);
        router.push({
            //redirect user to page with calculated query(where query = our needs for sort)
            pathname: path,
            query: query,
        });
    };

    const categoryHandler = (e: SelectChangeEvent) => {
        setProductCategories(e.target.value);
        filterSearch({ category: e.target.value });
    };
    const sortHandler = (e: SelectChangeEvent) => {
        setSortingType(e.target.value);
        filterSearch({ sort: e.target.value });
    };
    const priceHandler = (e: SelectChangeEvent) => {
        setPriceRange(e.target.value);
        filterSearch({ price: e.target.value });
    };
    //for search form
    const [querySearch, setQuerySearch] = useState('');

    const queryChangeHandler: SubmitHandler<any> = (e) => {
        setQuerySearch(e.target.value);
    };

    const submitHandler: SubmitHandler<any> = (e) => {
        e.preventDefault();
        router.push(`/catalog?query=${querySearch}`);
    };

    return (
        <div className={styles.root}>
            <div className={styles.root__procesfilter}>
                <Box sx={classes.filterBox}>
                    <FormControl
                        sx={classes.formFilter}
                        size="small"
                        color="secondary"
                        fullWidth
                    >
                        <InputLabel>
                            <Typography
                                preset="common1"
                                color="primary"
                                component="div"
                                className={styles.root__inscription}
                            >
                                По категориям
                            </Typography>
                        </InputLabel>
                        <Select
                            value={productCategories}
                            onChange={categoryHandler}
                            sx={classes.selectArea}
                        >
                            <MenuItem value="all">Всё</MenuItem>
                            {categories &&
                                categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={classes.filterBox}>
                    <FormControl
                        sx={classes.formFilter}
                        size="small"
                        color="secondary"
                        fullWidth
                    >
                        <InputLabel>
                            <Typography
                                preset="common1"
                                color="primary"
                                component="div"
                                className={styles.root__inscription}
                            >
                                По цене
                            </Typography>
                        </InputLabel>
                        <Select
                            value={priceRange}
                            onChange={priceHandler}
                            sx={classes.selectArea}
                        >
                            <MenuItem value="all">Всё</MenuItem>
                            {prices.map((price) => (
                                <MenuItem key={price.value} value={price.value}>
                                    {price.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={classes.filterBox}>
                    <FormControl
                        sx={classes.formFilter}
                        size="small"
                        color="secondary"
                        fullWidth
                    >
                        <InputLabel>
                            <Typography
                                preset="common1"
                                color="primary"
                                component="div"
                                className={styles.root__inscription}
                            >
                                Сортирвоать по
                            </Typography>
                        </InputLabel>
                        <Select
                            sx={classes.selectArea}
                            value={sortingType}
                            label="Сортировать по"
                            onChange={sortHandler}
                        >
                            <MenuItem value="all">Умолчанию</MenuItem>
                            <MenuItem value="lowest">Убыванию</MenuItem>
                            <MenuItem value="highest">Возрастанию</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <div className={styles.root__resultsammount}>
                    <Typography
                        preset="common2"
                        color="primary"
                        component="div"
                    >
                        {products && products.length !== 0
                            ? products.length
                            : 'Нет'}{' '}
                        результатов
                    </Typography>
                </div>
                <div className={styles.root__queries}>
                    <Typography
                        preset="common2"
                        color="paragraph"
                        component="div"
                    >
                        {query !== 'all' && query !== '' && ' : ' + query}
                        {price !== 'all' && '  Цена ' + price}
                    </Typography>
                    {<Typography
                        preset="common2"
                        color="paragraph"
                        component="div"
                    >
                        {(query !== 'all' && query !== '') ||
                            rating !== 'all' ||
                            price !== 'all'}
                    </Typography> ? (
                        <Button
                            startIcon={<DeleteIcon />}
                            sx={classes.removeFiltersbutton}
                            onClick={() => router.push('/catalog')}
                        >
                            Сбросить
                        </Button>
                    ) : null}
                </div>
            </div>
            <div className={styles.root__thelist}>
                {loading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <ul className={styles.root__grid}>
                        {products.map((product: Product, i: number) => {
                            return (
                                <li key={i}>
                                    <ProductCard
                                        imgSrc={urlForThumbnail(product.image)}
                                        name={product.name}
                                        price={product.price}
                                        sale={product.sale}
                                        slug={product.slug}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CategoryFilter;

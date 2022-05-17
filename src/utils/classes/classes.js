const classes = {
    section: {
        marginTop: 1,
        marginBottom: 1,
        backgroundColor: '#191d2b',
    },
    navbarButton: {
        color: '#ffffff',
        textTransform: 'initial',
    },
    fullWidth: {
        width: '100%',
    },
    selectArea: {
        // для фильтра
        color: '#FFF',
        border: '1px solid #ced4da',
        fill: '#FFF',
        '&:hover,&:focus': {
            border: '1.5px solid #6600c6',
        },
    },
    removeFiltersbutton: {
        // кнопка сброса фильтров
        marginLeft: '8px',
        color: '#6600c6',
    },
    filterBox: {
        // обёртка для фильтров
        minWidth: 120,
    },
    formFilter: {
        // размеры формы для фильтра
        m: 1,
        minWidth: 120,
    },
    searchForm: {
        // форма поиска
        border: '1px solid #ffffff',
        backgroundColor: '#ffffff',
        borderRadius: 1,
    },
    inputElements: {
        // for inputs in register pages etc.
        color: '#ffffff',
        textColor: '#ffffff',
        border: '1px solid #ffff',
        borderRadius: 1,
    },
    searchInput: {
        paddingLeft: 1,
        color: '#000000',
        '& ::placeholder': {
            color: '#606060',
        },
    },
    searchButton: {
        backgroundColor: '#6600c6',
        padding: 1,
        borderRadius: '0 5px 5px 0',
        '& span': {
            color: '#000000',
        },
    },
    inputTExtFieldColor: {
        color: '#FFFFFF',
    },
};

export default classes;

export default {
    title: 'Адреса доставки',
    name: 'shippingAddress',
    type: 'object',
    fields: [
        {
            title: 'Полное название',
            name: 'fullName',
            type: 'string',
        },
        {
            title: 'Адрес',
            name: 'address',
            type: 'string',
        },
        {
            title: 'Город',
            name: 'city',
            type: 'string',
        },
        {
            title: 'Почтовый индекс',
            name: 'postalCode',
            type: 'string',
        },
        {
            title: 'Страна',
            name: 'country',
            type: 'string',
        },
    ],
};

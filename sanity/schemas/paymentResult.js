export default {
    title: 'Результат оплаты',
    name: 'paymentResult',
    type: 'object',
    fields: [
        {
            title: 'id',
            name: 'id',
            type: 'string',
        },
        {
            title: 'Статус оплвты',
            name: 'status',
            type: 'string',
        },
        {
            title: 'Адрес почты',
            name: 'email_address',
            type: 'string',
        },
    ],
};

export default {
    name: 'order',
    title: 'Заказы',
    type: 'document',
    fields: [
        {
            title: 'Клиент',
            name: 'user',
            type: 'reference',
            to: [{ type: 'user' }],
            options: {
                disableNew: true, // brecause we not gonna create new user - user automaticly create in the code
            }, // not from the sanity studio
        },
        {
            name: 'userName',
            title: 'Имя клиента',
            type: 'string',
        },
        {
            name: 'itemsPrice',
            title: 'Стоимость элементов заказа',
            type: 'number',
        },
        {
            name: 'shippingPrice',
            title: 'Цена доставки',
            type: 'number',
        },
        {
            name: 'totalPrice',
            title: 'Итоговая цена',
            type: 'number',
        },
        {
            name: 'paymentMethod',
            title: 'Метод оплаты',
            type: 'string',
        },
        {
            title: 'Адрес доставки',
            name: 'shippingAddress',
            type: 'shippingAddress',
        },
        {
            title: 'Результат оплаты',
            name: 'paymentResult',
            type: 'paymentResult', // custom schema with special type
        },
        {
            title: 'Составляющие заказа',
            name: 'orderItems',
            type: 'array',
            of: [
                {
                    title: 'Order Item',
                    type: 'orderItem',
                },
            ],
        },
        {
            title: 'Оплачен?',
            name: 'isPaid',
            type: 'boolean',
        },
        {
            title: 'Дата оплаты',
            name: 'paidAt',
            type: 'datetime',
        },
        {
            title: 'Доставлен?',
            name: 'isDelivered',
            type: 'boolean',
        },
        {
            title: 'Куда доставлен',
            name: 'deliveredAt',
            type: 'datetime',
        },
        {
            title: 'Когда создан',
            name: 'createdAt',
            type: 'datetime',
        },
    ],
};

export default {
    title: 'Элемент заказа',
    name: 'orderItem',
    type: 'object',
    fields: [
        {
            title: 'Наименование продукта',
            name: 'name',
            type: 'string',
        },
        {
            title: 'Количество',
            name: 'quantity',
            type: 'number',
        },
        {
            title: 'Картинка',
            name: 'image',
            type: 'string',
        },
        {
            title: 'Цена',
            name: 'price',
            type: 'number',
        },
    ],
};

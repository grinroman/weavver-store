export default {
    name: 'product',
    title: 'Товары',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'sale',
            title: 'Sale',
            type: 'number',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true, //define the most important type of the image
            },
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string',
        },
        {
            name: 'slug', //жетон - в него конвертируется наше название
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        },
        {
            name: 'brand',
            title: 'Brand',
            type: 'string',
        },
        {
            name: 'size',
            title: 'Size',
            type: 'string',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
        },

        {
            name: 'countInStock',
            title: 'Count in stock',
            type: 'number',
        },
    ],
};

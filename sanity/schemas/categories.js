export default {
    name: 'categories',
    title: 'Категории товаров',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Наименование',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Описание',
            type: 'text',
        },

        {
            name: 'commonImage',
            title: 'Картинка для компьютерной версии',
            type: 'image',
            options: {
                hotspot: true, //define the most important type of the image
            },
        },
        {
            name: 'telephoneImage',
            title: 'Картинка для мобильной версии',
            type: 'image',
            options: {
                hotspot: true, //define the most important type of the image
            },
        },
    ],
};

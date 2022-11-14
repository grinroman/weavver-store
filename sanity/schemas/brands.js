export default {
    name: 'brands',
    title: 'Бренды товаров',
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
            name: 'commonImageBrand',
            title: 'Картинка для компьютерной версии',
            type: 'image',
            options: {
                hotspot: true, //define the most important type of the image
            },
        },
        {
            name: 'telephoneImageBrand',
            title: 'Картинка для мобильной версии',
            type: 'image',
            options: {
                hotspot: true, //define the most important type of the image
            },
        },
    ],
};

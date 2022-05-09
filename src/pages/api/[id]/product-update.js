//updating state of the order and make it payed
import axios from 'axios';
import nc from 'next-connect';
import { isAuth } from 'src/utils/routes/auth';
import config from 'src/utils/routes/config';

const handler = nc();

handler.use(isAuth);
handler.put(async (req, res) => {
    const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
    await axios.post(
        `https://${config.projectId}.api.sanity.io/v1/data/mutate/${config.dataset}`,
        {
            mutations: [
                {
                    patch: {
                        id: req.query.id,
                        set: {
                            countInStock: req.body.newCountInStock,
                        },
                    },
                },
            ],
        },
        {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${tokenWithWriteAccess}`,
            },
        }
    );

    res.send({ message: 'Количество товаров на складе изменено!' });
});

export default handler;

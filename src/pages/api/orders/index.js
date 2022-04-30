import nc from 'next-connect';
import axios from 'axios';
import { isAuth } from 'src/utils/routes/auth';
import config from 'src/utils/routes/config.js';
const handler = nc();

handler.use(isAuth);

handler.post(async (req, res) => {
    const projectId = config.projectId;
    const dataset = config.dataset;
    const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
    const { data } = await axios.post(
        `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
        {
            mutations: [
                {
                    create: {
                        _type: 'order',
                        createdAt: new Date().toISOString(),
                        ...req.body, //contains payment method, shippingAdress,orderItems
                        userName: req.user.name, //comes from isAuth in routes/auth
                        user: {
                            _type: 'reference',
                            _ref: req.user._id,
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

    res.status(201).send(data.results[0].id);
});
export default handler;

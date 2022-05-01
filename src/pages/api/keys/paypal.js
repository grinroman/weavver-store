import nc from 'next-connect';
import { isAuth } from 'src/utils/routes/auth';

const handler = nc();
handler.use(isAuth);

handler.get(async (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb'); //sb = sandbox
});

export default handler;

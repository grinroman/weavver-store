import nc from 'next-connect';
import client from 'src/utils/routes/client';

const handler = nc();

handler.get(async (req: any, res: any) => {
    const product = await client.fetch(
        `*[_type == "Product" && _id == $id][0]`,
        {
            id: req.query.id,
        }
    );
    res.send(product);
});
export default handler;

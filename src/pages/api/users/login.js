import nc, { NextConnect } from 'next-connect';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import config from 'src/utils/routes/config';
import { signToken } from 'src/utils/routes/auth';
import { IncomingMessage, ServerResponse } from 'http';
import client from 'src/utils/routes/client';

const handler = nc();

handler.post(async (req, res) => {
    const user = await client.fetch(
        `*[_type == "user" && email == $email][0]`,
        {
            email: req.body.email,
        }
    );

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        //comparison of entered and decrypted from sanity
        const token = signToken({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token,
        });
    } else {
        res.status(401).send({
            message: 'Некорректно введена почта или пароль!',
        });
    }
    res.send({ ...user, token });
});

export default handler;

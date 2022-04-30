import jwt from 'jsonwebtoken';

const signToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '120d',
    });
};

const isAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // BEARER XXX
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Токен не валидирован!' });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({ message: 'Токен не может быть предоставлен!' });
    }
};

export { signToken, isAuth };

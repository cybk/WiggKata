import jwt from 'jsonwebtoken';
import config from 'config';

export default function  (req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) res.status(401).send('Access Denied, no token provided.');

    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded;
        next();
    }
    catch (ex){
        res.status(400).send('Invalid token');
    }

   
}

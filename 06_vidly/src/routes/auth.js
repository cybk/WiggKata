import { Router } from 'express';
import _ from 'lodash';
import { User } from '../Models/user';
import bcrypt  from 'bcryptjs';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import config from 'config';

const router = Router();

router.get('/',  async (req, res) => {
    res.status(400).send('Users list is pending to implement');
});

router.post('/', async (req, res) => {
    const { error } = Validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await  User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid Email or Password.');

    var validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid Email or Password.');

    const token = jwt.sign({ _id: user._id }, config.get('jwtSecret'));

    res.send(token);
  });

function Validate (user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);
}

export default router;
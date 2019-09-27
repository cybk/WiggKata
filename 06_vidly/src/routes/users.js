import { Router } from 'express';
import _ from 'lodash';
import { User, Validate } from '../Models/user';
import bcrypt  from 'bcryptjs';

const router = Router();

router.get('/',  async (req, res) => {
    res.status(400).send('Users list is pending to implement');
});

router.post('/', async (req, res) => {
    const { error } = Validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await  User.findOne({ email: req.body.email });
    
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(user.password, salt);
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashed
    });

    user = await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token)
        .send(_.pick(user, ['_id', 'name', 'email']));
  });

export default router;
import exporess from 'express';

const homeRouter = exporess.Router();

homeRouter.get('/', (req, res) => {
    res.render('index', { title:'My Expess App', message: 'Hello world!!!' });;
});

export default homeRouter;
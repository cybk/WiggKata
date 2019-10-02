import { Router } from 'express';
import { Genre, Validate } from '../Models/genre';
import auth from '../Middleware/auth';
import admin from '../Middleware/admin';

const router = Router();

router.get('/', auth,  async (req, res, next) => {
    throw new Error('Could not get the genres');

    const genres = await Genre.find();
    res.send(genres);   
});

router.post('/', auth, async (req, res) => {
  const { error } = Validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });

  genre = await genre.save();
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = Validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

export default router;
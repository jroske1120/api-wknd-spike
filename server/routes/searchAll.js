const express = require('express');
const pool = require('../modules/pool');
const {default: Axios} = require('axios');
console.log('api key', process.env.API_KEY);

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  console.log('hit server', req.query.search);
  Axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.query.search}&key=${process.env.API_KEY}&fields=items/accessInfo/webReaderLink, items/volumeInfo(title, authors, description, imageLinks/thumbnail)&orderBy=relevance&limit=2
  `)
      .then((response)=>{
          res.send(response.data);
      })
      .catch((error)=>{
          console.log('error getting trending', error);
          res.sendStatus(500);
      })
})
























// add a new favorite 
router.post('/', (req, res) => {
  console.log('post router says req.body is:', req.body.url)
  const newFavorite = req.body.url;
  const queryText = `INSERT INTO "favorite" ("url")
                    VALUES ($1)`;
  const queryValues = [
    newFavorite
  ];
  pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error completing INSERT favorite query', err);
      res.sendStatus(500);
    });
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;

const express = require('express');
const pool = require('../modules/pool');
const {default: Axios} = require('axios');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('hit server', req.query.search);
  Axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.query.search}&filter=full&key=${process.env.API_KEY}&fields=items/accessInfo/webReaderLink, items/volumeInfo(title, authors, description, imageLinks/thumbnail)&orderBy=relevance&limit=2
  `)
      .then((response)=>{
          res.send(response.data);
      })
      .catch((error)=>{
          console.log('error getting trending', error);
          res.sendStatus(500);
      })
})

module.exports = router;
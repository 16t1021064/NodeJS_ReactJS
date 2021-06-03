var express = require('express');
var router = express.Router();
const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SanPham',
  password: '123',
  port: 5432,
})

/* GET home page. */
router.get('/', function (req, res, next) {
});
router.get('/getData', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  pool.query('SELECT * FROM "Product_Info"', (error, response) => {
    if (error) {
      console.log(error);
    } else {
      res.send(response.rows);
    }
  })
});
router.get('/add', function (req, res, next) {
  res.render('add', {});
});
router.post('/add', function (req, res, next) {
  var product_name = req.body.product_name;
  product_price = req.body.product_price;
  Image = req.body.Image;
  pool.query('insert into "Product_Info"  (product_name, product_price, "Image") values ($1, $2, $3)',
    [product_name, product_price, Image], () => {
      process.on('uncaughtException', function (err) {
        console.error(err.stack);
        console.log("Node NOT Exiting...");
      });
    })

});
module.exports = router;

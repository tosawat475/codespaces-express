const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
var mysql = require('mysql');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, x-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methonds",
    "GET, POST, PUT, DELETE",
  );
  next();
})
app.use(express.json())

var con = mysql.createConnection({
  host: "korawit.ddns.net",
  user: "webapp",
  password: "secret2024",
  port: "3307",
  database: "shop"
});

con.connect(function (err) {
  if (err) throw err;
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/products', (req, res) => {
  con.query("SELECT * FROM products", function (err, result, fields) {
    if (err) throw res.status(400).send('Not found any products');
    console.log(result);
    res.send(result);
  });
  /* if(products.length > 0)
    res.send(products);
  else
    res.status(400).send("No products founds"); */
});

app.get('/api/products/:id', (req, res) => {
  const id = req.params.id;
  con.query("SELECT * FROM products where id=" + id, function (err, result, fields) {
    if (err) throw err;
    let product = result;
    if (product.length > 0) {
      res.send(product);
    }else{
      res.status(400).send('Not found product for' + id);
    }
  });

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
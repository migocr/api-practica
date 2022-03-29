const express = require('express');
const app = express();
const morgan = require('morgan');

app.set('json spaces',2);

const fs = require('fs');

const rawdata = fs.readFileSync('src/database.json');
const database = JSON.parse(rawdata);


//midlewares
//app.use(morgan('dev'));
app.unsubscribe(express.urlencoded({extended : true}));
app.use(express.json());

//routes
app.get('/',(req,res) =>{
    res.json(database);
});

app.get('/search',async(req,res) => {

    stringRequest = req.query.name;
    productos = database.product;

    searchProducts = await productos.filter(v => v.name.toLowerCase().includes(stringRequest.toLowerCase()) );
    console.log(searchProducts[0])
    if(searchProducts[0]){
        suggestedProducts = productos.filter(v => v.category === searchProducts[0].category);
        response = [{'search_products': searchProducts, 'suggested_products': suggestedProducts.slice(0,2)}]
        res.json(response);
    } else {
        res.json({"no_data" : `no data found for ${req.query.name}`});
    }
        
      
   
   
});

//starting the server
app.listen(3000,() => {
    console.log(`server online on http://localhost:${3000}`);
});
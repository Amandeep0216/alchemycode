const mongooseConnection = require('./DB')
var mongoose = require('mongoose');

class Product
{
    productSchema = mongoose.Schema({
        prod_name: String,
        prod_price: Number,
        prod_cate: String,
        prod_brand: String,
        prod_image: String
      });
    

    saveProduct = (data,callback)=>
    {       
        var model = mongoose.model("product",this.productSchema,"product");
        mongooseConnection(conn=>{
            conn.once('open', function() 
            {
                var ob = new model(data)
                ob.save(function (err,product) {
                    console.log(product)
                    conn.close()
                    if (err) 
                        callback(false)
                    else    
                        callback(true,product)
                  });
            });
        })
    }

    fetchProduct = (callback)=>
    {       
        var model = mongoose.model("product",this.productSchema,"product");
        mongooseConnection(conn=>{
            conn.once('open', function() 
            {
                var obj = model.find({})
                obj.exec((err,data)=>{
                    conn.close()
                    if(err)
                    {
                        console.log(err)
                        callback([])
                    }
                    else
                        callback(data) 
                });
             })
        })
    }
}

module.exports = new Product()
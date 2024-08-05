
const Product = require('../models/Product'); 

exports.home = (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).send('Error fetching products');
            return;
        }
        res.render('home', { products: products }); 
    });
};

exports.deltal = async (req,res) => {
    try {
        var product = await Product.findById(req.params.id);
        if (product) {
            res.render('deltal', { product });
        } else {
            console.log('Không tìm thấy product tương ứng');
        }
    } catch (err) {
        console.log(err);
    }
}

import Product from "../models/product.js";


export const getAll = async (req, res) =>{
    const products = await Product.find();
    if(products.length === 0){
        return res.status(404).json({
            message:"Không tìm thấy sản phẩm",
        })
    }
    return res.status(200).json({
        message:"Đã tìm thấy sản phẩm",
        datas: products,
    });
};

export const getID =  (req, res) => {
    const product = products.find((product) =>{
        console.log(req.params.id);
        console.log(product.id);

        return product.id === req.params.id;
    });
    console.log(product);
    res.send(product);
}

export const create = (req, res) =>{
    res.send('create products')
}

export const update =(req, res) =>{
    res.send('up products')
}

export const remove = (req, res) =>{
    res.send('delete products')
}


import express from 'express';

import { connect } from 'mongoose';

import dotenv from 'dotenv';

import router from './routes/product.js';

const app = express();
dotenv.config();


const PORT = process.env.PORT || 8000;
const URI_DB = process.env.URI_DB;


connect(URI_DB);


    
// const server = http.createServer((req, res) => {
    
//     // console.log("req.method:",req.method);
//     // console.log("req.url:",req.url);

//     const path = url.parse(req.url).pathname;
//     console.log("path");
//     const method = req.method.toUpperCase();
//     console.log("method:",method);
    
//    switch(method){
//        case 'GET':
//         // xu ly du lieu
//         if(path === '/getall'){
//             const products = ["a", "b", "c"];
//             res.end(JSON.stringify(products));
//         } else{
//             res.statusCode = 404;
//             res.end("404");
//         }
//         // console.log("day la method GET");
//            break;
//        case 'POST':
//         // tao moi du lieu
//            break;
//        case 'UPDATE':
//            break;
//        case 'DELETE':
//            break;
//        default:
//            break;
//    }
// })
app.use("/api", router);
app.listen(PORT, () => {
    console.log(`Server is listening on port 8000 ${PORT}`);
});
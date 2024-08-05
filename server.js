//khởi tạo server
const express = require('express'); //require express
const multer = require('multer'); //upload file

const mongoose = require('mongoose');
 //ket noi voi mongodb
const ProductController = require('./controllers/ProductController'); //require controller
const AuthController = require('./controllers/AuthController');
const HomeController = require('./controllers/HomeController');

const app = express();
const port = 3000;

//khai báo thông tin để upload file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({ storage: storage })

//khai báo sử dụng ejs
app.set('view engine', 'ejs'); //khai báo view engine là ejs
app.set('views', './views'); //khai báo thư mục chứ file giao diện
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); 

mongoose.connect('mongodb://localhost:27017/wd18412') //wd18412: tên database
    .then(result => {
        //giao diện
        app.get('/list', ProductController.getList); //danh sách sp
        app.get('/create', ProductController.create); //form tạo mới
        app.post('/save', upload.single('image'), ProductController.save); //lưu vào db
        app.get('/edit/:id', ProductController.edit); //form sửa
        app.post('/update/:id', upload.single('image'), ProductController.update); //update data
        app.get('/delete/:id', ProductController.delete); //xóa

        // router cho api
        app.get('/products', ProductController.apiGetList);
        app.get('/products/:id', ProductController.apiDetail);
        app.post('/products',upload.single('image'), ProductController.apiCreate);
        app.put('/products/:id',upload.single('image'), ProductController.apiUpdate);
        app.delete('/products/:id', ProductController.apiDelete);
        // router cho dang nhap
        app.get('/regis', AuthController.regis);
        app.post('/register', AuthController.register);
        app.get('/log', AuthController.log);
        app.post('/login', AuthController.login);
        // router cho home
        app.get('/home', HomeController.home);
        app.get('/deltal/:id', HomeController.deltal);
       

        app.listen(port, () => { //chạy sv với port 3000
            console.log(`running in port ${port}`);
        })
    })
    .catch(err => {
        console.log(err);
    })
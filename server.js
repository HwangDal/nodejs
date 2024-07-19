//khởi tạo server
const express = require("express"); //require express
// từ express 4.16, ko cần require body-parser
// var bodyParser = require('body-parser'); //require body-parser
const mysql = require("mysql");// kết nối csdl
const multer = require('multer'); // up load file
const app = express();
const port = 3000;

// Tạo kết nối csdl
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs",
});
// khai báo thông tin up load file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
})

const upload = multer({ storage: storage })
//khai báo sử dụng ejs
app.set("view engine", "ejs"); //khai báo view engine là ejs
app.set("views", "./views"); //khai báo thư mục chứ file giao diện
app.use(express.static("public"));
// app.use(bodyParser.urlencoded()); //từ express 4.16 trở xuống
app.use(express.urlencoded({ extended: true })); //từ express 4.16 trở lên
//router

app.get("/list", (req, res) => {
  let sql = "SELECT * FROM list"; // Khai báo câu truy vấn
  db.query(sql, function (err, data) {
    // thực thi câu truy vấn lấy data
    if (err) throw err; // xử lý lỗi
    res.render("products", { products: data }); // hiển thi dữ liệu sang ejs
  });
});

app.get("/delete", (req, res) => {
    let id = req.query.id;
    let sql = "DELETE FROM list WHERE id = ?";
    db.query(sql, [id], function (err, data) {
        if (err) {
            console.error(err); 
        }
        res.redirect("/list");
    });
});

app.get("/create", (req, res) => {
  res.render("create");
});


app.post("/save", upload.single('image'), (req, res) => {
 
  // console.log(req.body, req.file);

  const newProduct = {
    name: req.body.name,
    price: req.body.price,
    decription: req.body.decription,
    image: req.file.filename,
  };
  db.query("INSERT INTO list SET ?", newProduct, function (err, data) {
    if (err) {
      console.error(err); 
    }
    res.redirect("/list");
  });
});

app.get("/edit/:id", (req, res) => {

  let id = req.params.id;
  console.log(id);
  db.query(`SELECT * FROM list WHERE id = ${id}`,(err, data) => {
    // console.log(data);
    if (err) {
      console.error(err); 
    }
    console.log(data[0]);
    res.render("edit", { product: data[0] });
  });
});

app.post("/update/:id", upload.single('image'), (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const price = req.body.price;
  const decription = req.body.decription;

  // Log the file object to debug
  console.log(req.file);

  // Check if req.file is undefined
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const image = req.file.filename;
  console.log(id, name, price, decription, image);
  console.log("update");

  db.query("UPDATE list SET name = ?, price = ?, decription = ?, image = ? WHERE id = ?",
  [name, price, decription, image, id], function (err, data) {
    if (err) {
      console.error(err); 
    }
    res.redirect("/list");
  });
});


// app.get("/danhmuc/:iddanhmuc/sanpham/:id", (req, res) => {
//   console.log(req.query); //được đánh dấu bằng ?ten1=x&ten2=y trên url
//   console.log(req.params); //nằm trong url /:id
//   //params không được trùng tên nhau
//   //nếu đặt trùng thì sẽ lấy giá trị của thằng sau cùng
//   // res.send('<h1>Đây là trang chủ</h1>');
//   res.render("detail", {
//     id: req.params.id,
//     iddanhmuc: req.params.iddanhmuc,
//   });
// });

app.listen(port, () => {
  console.log(`SV đang chạy ở port ${port}`);
});

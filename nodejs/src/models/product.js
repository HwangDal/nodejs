import mongoose from 'mongoose';

const productShema = new mongoose.Schema(
    {name: String, price: Number}
)
//tạo ra 1 model tên là mydb1
export default mongoose.model('mydb1', productShema);



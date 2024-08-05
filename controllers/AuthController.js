const User = require('../models/User');
const bcrypt = require('bcryptjs'); //mã hóa password
const jwt = require('jsonwebtoken'); //tạo token



// register
exports.regis = (req, res) => {
    res.render('regis'); 
};

exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        if (newUser) {
            console.log('đăng kí thanh công');
            res.redirect('/log');
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Something went wrong' });
    }
};

// login
exports.log = (req, res) => {
    res.render('log'); 
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email không tồn tại' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Sai thông tin đăng nhập' });
        }

        const token = jwt.sign({ id: user.id }, 'wd18412', { expiresIn: '1h' });
        res.status(200).json({
            redirect: '/home',
            message: 'hello ' + user.username,
            token: token
        });

    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Something went wrong' });
    }
};


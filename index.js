require('dotenv').config();
const express = require('express');
const cors = require('cors'); // 1. THÊM IMPORT CORS
const router = require('./routes/Student.route');
const app = express();
const passport = require('passport');
const session = require('express-session');
const adminRouter = require('./routes/Auth.route');
const PORT = process.env.PORT || 3000;
const flash = require('connect-flash');

// 2. THÊM MIDDLEWARE CORS VÀ PARSER VÀO ĐÂY (TRƯỚC CÁC ROUTE)
app.use(cors({
    origin: '*', // Tạm thời cho phép mọi domain truy cập để test
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // THÊM DÒNG NÀY để đọc dữ liệu form

app.use(flash());

app.use(session({
    secret: process.env.SESSION_SECRET || 'secretkey',
    resave: false,
    saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router);
app.use('/auth', adminRouter);
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log(`Server đang chạy ở port ${PORT}`);
});
    console.log(`App listening on port ${PORT}`);
});

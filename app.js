
import express from 'express';
import mongoose from 'mongoose';
import { checkAuth } from './middlewares/checkAuth';
import routeUser from './routes/auth';
import routerCategory from './routes/categories';
import home from './routes/home';
import routerProduct from './routes/products';
// bước 1: include thư viện http
// const http = require('http');
// const express = require('express');
const app = express();
// const server = http.createServer(app);

// const homeRoute = require('./routes/home');
app.use(express.json());
app.use("/",home);
app.use("/api",checkAuth,routerProduct);
app.use("/api", checkAuth, routerCategory);
app.use("/api", checkAuth,routeUser)
mongoose.connect('mongodb://localhost:27017/we16308');


// bước 2: khởi tạo server
// const server = http.createServer((request , response) => {
//     // console.log(request);
//     if (request.url === '/') {
//         // console.log("Home page");
//         response.setHeader("Content-Type", "text/html");
//         response.write(`
//             <h1>Trang chủ</h1>
//         `);
//         response.end();
//     }

//     if (request.url === '/product') {
//         response.setHeader("Content-Type", "text/html");
//         response.write(`
//             <h1>Product page</h1>
//         `);
//         response.end();
//     }
// })



// bước 3: lắng nghe cổng thực thi 

app.listen(8000, () => {
    console.log("Server is running on port 8000");
})  
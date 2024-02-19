import express from 'express';
import userRouter from './user/user.router.js';
import reviewRouter from './performanceReview/Review.router.js';
import assignReviewRouter from './assignReview/assignReview.router.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';

const app = express();
import 'dotenv/config';

// Use middleware to parse JSON data
app.use(express.json());
app.set('view engine', 'ejs');

app.set('views', path.join(path.resolve(),'views'));
const temppath = path.join(path.resolve(),'views')
console.log(temppath);

app.use(ejsLayouts);

// Use import.meta.url to get the current module's URL
const __filename = new URL(import.meta.url).pathname;

// Use path.dirname to extract the directory path
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(path.resolve(), 'public')));

// Specify the default layout file
app.set('layout', 'layout');

app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/Employees', (req, res)=>{
    res.render('Employees');
})
// For handling the registeration request of both User and Admin
app.use('/user', userRouter);
app.use('/Review', reviewRouter);
app.use('/assignReview', assignReviewRouter);
export default app;
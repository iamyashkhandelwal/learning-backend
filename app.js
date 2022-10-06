const express = require('express');
const path = require('path');
// const axios = require('axios');

const app = express();

app.listen(3000);

// important otherwise req.body will give u undefined
app.use(express.json());


// set Static files path
// app.use(express.static(path.join(__dirname, 'public')))

const signupRouter = express.Router();
app.use('/signup', signupRouter);

signupRouter
    .route('/')
    .get(getSignUp)
    .post(postSignUp)

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', {root: __dirname});
})

app.get('/user/:id', (req, res) => {
    res.end('user Data');
    console.log('param: ', req.params);
    console.log('query: ', req.query);
})

app.get('/about', (req, res) => {
    res.sendFile('./views/aboutUs.html', {root: __dirname});
})

app.get('/aboutUs', (req, res) => {
    res.redirect('/about');
})

// app.get('/signup', (req, res) => {
//     res.sendFile('./views/signup.html', {root: __dirname});
// })

// app.post('/signup', (req, res) => {
//     const body = req.body;
//     res.json({
//         message: "creds received!",
//         data: body
//     });
//     // console.log('req.body -> ', req.body);
// })

function getSignUp(req, res) {
    res.sendFile('./views/signup.html', {root: __dirname});
}

function postSignUp(req, res) {
    const body = req.body;
    res.json({
        message: "creds received!",
        data: body
    });
}

app.use((req, res) => {
    res.status(404).sendFile('./views/error.html', {root: __dirname})
})
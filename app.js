const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('./mongoose/app');
const port = 3005;

// const axios = require('axios');

const app = express();

app.listen(port, () => console.log(`Server is listening at port: ${port}`));

// important otherwise req.body will give u undefined
app.use(express.json());


// set Static files path
app.use(express.static(path.join(__dirname, 'public')))

const signupRouter = express.Router();
app.use('/signup', signupRouter);
signupRouter
    .route('/')
    .get(getSignUp)
    .post(postSignUp)

const signinRouter = express.Router();
app.use('/signin', signinRouter);
signinRouter
    .route('/')
    .get(getSignIn)
    .post(postSignIn)

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', {root: __dirname});
})

// !!------- for testing/learning only  -----!!
app.get('/user/:id', (req, res) => {
    res.end('user Data');
    console.log('param: ', req.params);
    console.log('query: ', req.query);
})

// !!------- for testing/learning only  -----!!
app.get('/users', async (req, res) => {
    const users = await User.find({});
    // console.log('users -> ', users);
    const data = users.map((user) => {
        return {
            name: user.name,
            age: user.age,
        }
    });
    res.json({
        data,
        code: 200,
    })
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

async function isEmailAlreadyExists(userEmail) {
    return await User.count({ email: userEmail });
}

async function postSignUp(req, res) {
    try {
        const body = req.body;

        // check if both the passwords are same 
        if(body.password !== body.confirmPassword) {
            return res.status(400).json({ message: 'Bad Credentials!' });
        }
        else if(await isEmailAlreadyExists(body.email)) {
            return res.status(400).json({ message: 'Email already exists!' })
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);
        // console.log('hashedPassword -> ', hashedPassword);

        const newUser = new User({
            name: body.name,
            age: body.age,
            email: body.email,
            // password: body.password,
            // confirmPassword: body.confirmPassword,
            password: hashedPassword,
            confirmPassword: hashedPassword,
        });
    
        await newUser.save();
        res.status(201).json({
            message: "User created!",
        });
    }
    catch(err) {
        console.log('err -> ', err);
        res.status(501).end();
    }
}

function getSignIn(req, res) {
    res.sendFile('./views/signin.html', {root: __dirname});
}

async function postSignIn(req, res) {
    try{
        const user = await User.find({ email: req.body.email });

        if(user.length === 1) {
            const match = await bcrypt.compare(req.body.password, user[0].password);
            if(match) {
                res.status(200).json({ message: 'login successful!' });
                return;
            }
        }
    
        res.status(401).json({ message: 'Invalid creds!!' });
    }
    catch(err) {
        console.log('err --> ', err);
    }
}

app.use((req, res) => {
    res.status(404).sendFile('./views/error.html', {root: __dirname})
})
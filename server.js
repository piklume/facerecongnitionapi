const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const e = require('express');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'sa',
      database : 'smartbrain'
    }
  });


const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', signin.handelSignin(db, bcrypt));

app.post('/register', register.handelRegister(db, bcrypt));

app.get('/profile/:id', (req, res) => {profile.handelProfileGet(req, res, db)});

app.put('/image', (req, res) => {image.handelImage(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


app.listen(process.env.PORT || 3000, () => {
    console.log('app is running on port 3000');
});


/*
 / --> this is working
 /signin --> POST = success/fail
 /register --> POST = user
 /profile/:userid --> GET = user
 /image --> PUT --> user

*/
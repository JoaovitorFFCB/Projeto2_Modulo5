const express = require('express')
const {engine} = require('express-handlebars')

const app = express()

const conn = require('./db/conn.js')

const User = require('./models/User')

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended:true,
    }),
)

app.use(express.json())

app.use(express.static('public'))

app.get('/users/create', (req,res) => {
    res.render('adduser')
})

app.post('/users/create', (req,res) =>{
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    } else{
        newsletter = false
    }
    User.create({name, occupation, newsletter})

    res.redirect('/')
})

app.get('/', function(req,res){

    User.findAll({raw: true})
    .then((users) =>{
        console.log(users);
        res.render('home', {users: users})
    })
    .catch((err) => console.log(err))
})

app.get('/users/:id', function(req, res){
    const id = req.params.id

    User.findOne({
        raw: true,
        where: {
            id: id,
        },
    })
    .then((user) => {
        console.log(user);
        res.render('userview', { user })
    })
    .catch((err) => console.log(err))
})

app.post('/users/delete/:id', (req,res) =>{
    const id = req.params.id

    User.destroy({
        where: {
            id:id,
        },
    })
    .then((user) =>{
        res.redirect('/')
    })
    .catch((err) => console.log(err))
})

app.get('/users/edit/:id', (req, res) =>{
    const id = req.params.id

    User.findOne({
        raw: true,
        where: {
            id: id,
        },
    })
    .then((user) => {
        console.log(user)
        res.render('useredit', {user})
    })
    .catch((err) => console.log(err))
})

app.post('/users/update', (req, res) => {
    const id = req.params.id
    const name = req.params.name
    const occupation = req.params.occupation
    let newsletter = req.params.newsletter

    if (newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }

    const userData = {
        id,
        name, 
        occupation,
        newsletter,
    }

    User.update(userData, {
        where: {
            id: id,
        },
    })
    .then((user) => {
        console.log(user)
        res.redirect('/')
    })
    .catch((err) => console.log(err))
})

//rodar o app e criar as tabelas

conn.sync().then(() =>{
    app.listen(3000)
    })
.catch((err) => console.log(err))

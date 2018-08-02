const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
//this is telling express that we want to use hbs as view engine
app.set('view engine', 'hbs');
//middleware express


//middleware need the next so that it lets the listeners to continue working
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    res.render
    next();
});
//This code will make code defined after this not show
app.use((req, res, next) => {

    res.render('maintenance.hbs');
    
});

app.use(express.static(__dirname + '/public'));

//handler for http get request
app.get('/another', (req, res) => {
    //response.send('<h1>Hello express!</h1>');
    res.send({
        name: 'Nicolas',
        likes: [
            'Biking',
            'Travelling'
        ]
    });
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        siteName: 'Randomize',
        welcomeName: 'Nicolas',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
    });
    

});

// /bad - send back json with errorMessage

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'There was an error trying to get what you asked for'
    })
});

//bind application to a port in our machine
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
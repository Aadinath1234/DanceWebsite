const express = require("express");
const path = require("path");

const app = express();
// this mongoose we are adding in #88 and we are connecting database with the help of mongoose.
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser:true});

const port = 8000;


// here we are defining mongoose schema:
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
var Contact = mongoose.model('Contact', contactSchema);


// Express specific stuff:
app.use('/static', express.static('static'))  //for serving static files.
app.use(express.urlencoded())


// PUG specific stuff:
app.set('view engine','pug') // set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // from which directory you want to read the template files.


//endpoints:
app.get('/', (req, res)=>{
    const params = { }
    // res.status(200).render('index.pug', params);
    res.status(200).render('home.pug', params);
    //    we are serving this home.pug in #79 .
})
// this is we are doing for #79 only.
app.get('/contact', (req, res)=>{
    const params = { }
    // res.status(200).render('index.pug', params);
    res.status(200).render('contact.pug', params);
    //    we are serving this home.pug in #79 .
})

// this is for #88
app.post('/contact', (req, res)=>{
    // when somebody will do post request on contact 
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render('index.pug', params);
    // contact.put params is for contact page creating inside the website
    // res.status(200).render('contact.pug', params);
    // this is for #88 only:
    // res.status(200).render('contact.pug');
    //    we are serving this home.pug in #79 .
})

// start the server:
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);

});

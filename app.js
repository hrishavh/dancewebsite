const express = require("express")
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true})
const port = 8000;


//define mongoose schema
var contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String
})

var Contact = mongoose.model('Contact', contactSchema);

//EXPRESSING SPECIFIC STUFF
app.use('/static', express.static('static')) // for serving static file 
app.use(express.urlencoded())
// PUG SPECIFIC STUFF
app.set('view engine', 'pug') //Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

//endpoints
app.get('/',(req, res)=>{
    const params = { }
      res.status(200).render('home.pug', params);
  })
app.get('/contact',(req, res)=>{
    const params = { }
      res.status(200).render('contact.pug', params);
  })
app.post('/contact',(req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this data has been send to the database")
    }).catch(()=>{
      res.status(400).send("item was not saved to the database")
    });

     //res.status(200).render('contact.pug');
     
  })

  //START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started succesfully on port ${port}`);
});
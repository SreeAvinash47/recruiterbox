const express = require('express');
const mongoose = require('mongoose');
const mongoURI = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const kudos = require('./routes/api/kudos');

const app = express();

//Kudo Model
const Kudo = require('./models/Kudo');

let prevInstDay = null;  // Previous instance of current day

const resetKudosCount =() => {
  const date=new Date();
  const currDay = date.getDay();
  console.log(`PrevInstDay: ${prevInstDay}, CurrDay: ${currDay}`);
  if (prevInstDay==6 && currDay==0){
    //reset Db's kudos count
    Kudo.find().then(kudos => {
      kudos.forEach(kudo=>{
        kudo.kudos_count = 3;
        kudo.save().then(()=>'Kudos count set to 3 and saved').catch(err=>console.log(err))
      })
    }).catch(err=>console.log(err));
  }
  
  //change the prevInstDay
  prevInstDay = currDay

}
const checkAndSetKudoCount = async () => {
  await setInterval(()=>resetKudosCount(), 5000)
}
checkAndSetKudoCount();
//middlewares

// bodyparser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }) // Let us remove that nasty deprecation warrning :)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);
//routes
app.use('/api/users', users);
app.use('/api/kudos', kudos);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port: ${port}`));
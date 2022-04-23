const express=require('express');
const mongoose=require('mongoose');
const app=express();
const ejs=require('ejs');

//Express Middleware - npm install body-parser --save
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb+srv://dmoreno0716:Monkey0716@cluster0.nmwvx.mongodb.net/PlayerDB?retryWrites=true&w=majority');

const leaderboardSchema = {
    Name: String,
    Score: Number
} 

var Leaderboard = mongoose.model('leaderboards', leaderboardSchema);

app.get('/', (req, res) => {
    Leaderboard.find({}, function(err, leaderboards){
        res.render('index', {
            leaderboardList: leaderboards
        })
        console.log(`leaderboard: `, leaderboards)
    }).sort({Score:-1})
}) 

app.listen(4000, function() {
    console.log('server is running');
})  

app.post("/addleaderboard", (req, res) => {
    var myData = new Leaderboard(req.body);
    myData.save()
    .then(item => {
    res.redirect("/");
    app.set('view engine', 'ejs');
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    })
})

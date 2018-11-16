var mongoose = require('mongoose');
var petSchema = mongoose.model('petSchema');
var express = require('express');
var router = express.Router();

/* GET account page. */
router.get('/account', function(req, res, next) {
    console.log("In account route");
    res.sendFile('account.html', { root: 'public' });
});

/* GET index (home) page. */
router.get('/', function(req, res, next) {
  console.log("In index (home) route");
  res.render('index', { title: 'Express' });
});


/* GET inventory page. */
router.get('/inventory', function(req, res, next) {
    console.log("In inventory route");
    res.sendFile('inventory.html', { root: 'public' });
});

/* GET pet page. */
router.get('/pet', function(req, res, next) {
    console.log("In pet route");
    res.sendFile('pet.html', { root: 'public' });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
    console.log("In register route");
    res.sendFile('register.html', { root: 'public' });
});

/* GET shop page. */
router.get('/shop', function(req, res, next) {
    console.log("In shop route");
    res.sendFile('shop.html', { root: 'public' });
});


router.post('/tamagotchi', function(req, res, next) {
  console.log("In Post");
  var tamagotchi = new petSchema(req.body);
  tamagotchi.save(function(err, tamagotchi){
    if(err){ return next(err); }
    console.log("After the database call");
    res.json(tamagotchi);
  });
  //res.redirect('/pet');
});

router.param('tamagotchi', function(req, res, next, id) {
  petSchema.findById(id, function (err, tamagotchi){
    if (err) { return next(err); }
    if (!tamagotchi) { return next(new Error("can't find the tamagotchi")); }
    req.tamagotchi = tamagotchi;
    return next();
  });
});

router.get('/tamagotchi/:tamagotchi', function(req, res) {
  res.json(req.tamagotchi);
});

//Searching for usernames
router.get('/query', function(req, res, next) {
    console.log("In the GET query route");
    
    console.log("Recieved Info!");
    console.log(req.query.username);
    
    petSchema.find({ username: req.query.username }, function(err, userList) { 
        if (err) return console.error(err); //If there's an error, print it out
        else {
            console.log(userList); 
            res.json(userList);
        }
    })
});

//Searching for session User
router.get('/sessionQuery', function(req, res, next) {
    console.log("In the GET session query route");
    
    console.log("Recieved Info!");
    console.log(req.query.username);
    
    petSchema.find({ username: req.query.username }, function(err, userList) { 
        if (err) return console.error(err); //If there's an error, print it out
        else {
            console.log(userList); 
            res.json(userList);
        }
    })
});

router.delete('/tamagotchi/:tamagotchi', function(req, res) {
  console.log("in Delete");
  req.tamagotchi.remove();
  res.sendStatus(200);
});


router.put('/tamagotchi/:tamagotchi/update', function(req, res, next) {
  req.tamagotchi.update(function(err, tamagotchi){
    if (err) { return next(err); }
    res.json(tamagotchi);
  });
});

router.put('/tamagotchi/:tamagotchi/walk', function(req, res, next) {
  req.tamagotchi.walk(function(err, tamagotchi){
    if (err) { return next(err); }
    res.json(tamagotchi);
  });
});

router.put('/tamagotchi/:tamagotchi/read', function(req, res, next) {
  req.tamagotchi.read(function(err, tamagotchi){
    if (err) { return next(err); }
    res.json(tamagotchi);
  });
});

router.put('/tamagotchi/:tamagotchi/feed', function(req, res, next) {
  req.tamagotchi.feed(function(err, tamagotchi){
    if (err) { return next(err); }
    res.json(tamagotchi);
  });
});

router.put('/tamagotchi/:tamagotchi/tickle', function(req, res, next) {
  req.tamagotchi.tickle(function(err, tamagotchi){
    if (err) { return next(err); }
    res.json(tamagotchi);
  });
});

router.put('/tamagotchi/:tamagotchi/buy', function(req, res, next) {
  req.tamagotchi.buy(function(err, tamagotchi){
    if (err) { return next(err); }
    res.json(tamagotchi);
  });
});

router.put('/tamagotchi/:tamagotchi/increaseSpeed', function(req, res, next) {
    console.log("Increasing Speed...");
  req.tamagotchi.increaseSpeed(function(err, tamagotchi){
    if (err) { return next(err); }
    res.json(tamagotchi);
  });
});

module.exports = router;


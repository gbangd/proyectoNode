var express = require('express');
var app = express();

var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;


var TWITTER_CONSUMER_KEY = "QlBLsy7OFfWFTfnY5LlkXQ";
var TWITTER_CONSUMER_SECRET = "00NzdqmNoctWtdEWQuGSqnkcC0ISrjtQITbEzcMZtuY";

var nombreDelTipo = "";


//Configuracion de la ruta absoluta de acceso a la vista y la sesion de usuario
app.configure(function() {
        app.set('view options', {
        layout:false
    });
     
        app.set('views', __dirname + '/views');
        app.set('view engine', 'ejs');
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser());
        app.use(express.session({ secret:'keyboard cat'}));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(app.router);
        app.use(express.static(__dirname+"/public"));
});


//Renderizado de las Paginas 
app.get('/', function(req, res) {
        res.render('index', { user: req.user });        
});

app.get('/other', function(req, res) {
       res.render('other.html');
});

app.get('/login', function(req, res) {
        res.render('login');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

//Acceso a Twitter

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:8080/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
      
      nombreDelTipo = ""+profile.displayName;
      console.log("name "+nombreDelTipo);
      
   done(null, profile);
  }
));


app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));
//Aplicacion encendida

app.listen(8080, function() {
        console.log("--- app.listen");
});
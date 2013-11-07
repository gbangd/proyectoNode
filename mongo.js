var express = require('express');
var app = express();

var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;


/** Con la mia
var TWITTER_CONSUMER_KEY = "QlBLsy7OFfWFTfnY5LlkXQ";
var TWITTER_CONSUMER_SECRET = "00NzdqmNoctWtdEWQuGSqnkcC0ISrjtQITbEzcMZtuY";
*/

var TWITTER_CONSUMER_KEY = "0PIumuh8Qj0BnJfRojTU4g";
var TWITTER_CONSUMER_SECRET = "Q3N2roz8ggqpwFypvuJqCGNw6IIwfH7vG1X4l0KNo";


var nombreDelTipo = "";
var datosArray = new Array();

//Conexion a mongo 

var mongodb = require('mongodb');

// obtenemos el server MongoDB que dejamos corriendo
var server = new mongodb.Server("127.0.0.1", 27017, {});
 
// obtenemos la base de datos de prueba que creamos
var dbTest = new mongodb.Db('test', server, {})
 
// abrimos la base pasando el callback para cuando esté lista para usar
dbTest.open(function (error, client) {
  if (error) throw error;
 
  //en el parámetro client recibimos el cliente para comenzar a hacer llamadas
  //este parámetro sería lo mismo que hicimos por consola al llamar a mongo
   
  //Obtenemos la coleccion personas que creamos antes
  //var collection = new mongodb.Collection(client, 'personas');
    var collection = new mongodb.Collection(client, 'mensajes');
   
  //disparamos un query buscando la persona que habiamos insertado por consola
    /** Buscar uno especifico    
  collection.find({'nombre': 'gustavo'}).toArray(function(err, docs, done) {
     //imprimimos en la consola el resultado
    //datosArray = docs;
      app.get('/mongo', function(req, res) {
            res.render('mongotest', { datos: docs });
        });
    console.dir(docs);
  });*/

    //Insertar un dato
    /**
    var personirijilla = {nombre:'David', apellido:'Perez'};
    collection.insert(personirijilla, {safe: true}, function(err, records){
        console.log('Agregado '+records[0]._id);
        });*/
   
    
    //Buscar Todos
    /**
    collection.find({}).toArray(function(err, docs) {
         //imprimimos en la consola el resultado
        //datosArray = docs;
          app.get('/mongo', function(req, res) {
                res.render('mongotest', { datos: docs  });
            });
        console.dir(docs);
    
        dbTest.close();
  });*/
    
    //Buscar Todos Los mensajes
    collection.find({}).toArray(function(err, docs) {
         //imprimimos en la consola el resultado
        //datosArray = docs;
          app.get('/chat', function(req, res) {
                res.render('chat', { datos: docs, user: req.user });
            });
        console.dir(docs);
    
        dbTest.close();
  });
    
});


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
        app.use(express.static(__dirname+"/views"));
});


//Renderizado de las Paginas 
app.get('/', function(req, res) {
        res.render('index', { user: req.user });        
});


app.get('/json', function(req, res) {
        res.render('articulosjson', { user: req.user });        
});


/**
app.get('/chat', function(req, res) {
       res.render('chat', { user: req.user });
});*/



app.get('/login', function(req, res) {
        res.render('login');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/json');
});


//Mongo Test

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
    callbackURL: "http://192.168.0.13:8080/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
      
      nombreDelTipo = ""+profile.displayName;
      console.log("name "+nombreDelTipo);
      
   done(null, profile);
  }
));


app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { successRedirect: '/json',
                                     failureRedirect: '/login' }));




//Comienza la seccion del socket



//Inicializacion
var io = require('socket.io').listen(app.listen(8080, function() {
        console.log("--- app.listen");
}));


//Manejo de datos enviados
io.sockets.on('connection', function (socket) {
        // Aqui arranca lo de mongo
        dbTest.open(function (error, client) {
          if (error) throw error;
                   
          var collection = new mongodb.Collection(client, 'mensajes');                       
         //Buscar Todos Los mensajes
            collection.find({}).toArray(function(err, docs) {
                var datosString ='';;
                for(var k=0; k< docs.length;k++)
                {
                    datosString += "<tr><td>"+docs[k]["cuerpo"]["message"]+"</td></tr>";
                }
                datosString+="<tr><td style='color:#fc2b2b'>Bienvenido al chat</td></tr>";                
                socket.emit('message', {
                    message: datosString               
                });
                console.dir(docs);
                dbTest.close();
          });
                
        }); 
        socket.on('send', function (data) {
        io.sockets.emit('message', data);
                
        // Aqui arranca lo de mongo
        dbTest.open(function (error, client) {
          if (error) throw error;
                   
          var collection = new mongodb.Collection(client, 'mensajes');
          //Insertar un dato
            var mensajillo = {cuerpo:data};
            collection.insert(mensajillo, {safe: true}, function(err, records){
                console.log('Agregado '+records[0]._id);
                });                      
            dbTest.close();    
            
             //Buscar Todos Los mensajes
            /**
                collection.find({}).toArray(function(err, docs) {
                     //imprimimos en la consola el resultado
                    //datosArray = docs;
                      app.get('/chat', function(req, res) {
                            res.render('chat', { datos: docs, user: req.user });
                        });
                    console.dir(docs);
                
                    dbTest.close();
              });**/
            
            
        }); 
        
        //Cierro la conexion
        
        // Aqui termina mongo
        
    });
});



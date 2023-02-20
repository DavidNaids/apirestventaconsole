var express = require('express');
var bodyparser = require ('body-parser');
var cors = require ('cors');
jsonParser = bodyparser.json();

var app = express();

let respuesta = {
    console : false,
    codigo : 200,
    mensaje : ''
};

let items = [

    {
    
    name:"Playstation 4",
    
    description: "Version de 500 gb",
    
    company : "Sony",
    
    img : "./assets/images/ps4.jpg"
    
    },
    
    {
    
    name:"Playstation 5",
    
    description: "Version de 1 tb",
    
    company : "Sony",
    
    img : "./assets/images/PlayStation_5.png"
    
    },
    
    {
    
    name:"Xbox Series s",
    
    description: "Version 500gb",
    
    company : "Microsoft",
    
    img : "./assets/images/xboxs.jpg"
    
    },
    
    {
    
    name:"Xbox Series X",
    
    description: "Version de 1tb",
    
    company : "Micrcosoft",
    
    img : "./assets/images/xboxx.jpg"
    
    },
    
    {
    
    name:"Nintendo Switch Oled",
    
    description: "Propiedad de compañia japonesa",
    
    company : "Nintendo",
    
    img : "./assets/images/nintendoswitch.jpg"
    
    }
    
    ];

    app.use(cors({
        origin : '*'
    }));

    app.get('/', function(req, res){
        res.send("API Videojuegos v1")
    });

    app.get('/products', function(req, res){
        respuesta = {
            error : false,
            codigo : 200,
            mensaje : items
        };
        res.send(respuesta);
    });

    app.get('/products/:id', jsonParser, function(req, res){
        let id = req.params.id;
        console.log("ID:: ", id);
        respuesta = {
            error : false,
            codigo : 200,
            mensaje : items[id]
        };
        res.send(respuesta);
    });

    app.post('/products', jsonParser, function(req, res){

        if(!req.body){
            respuesta = {
                error : true,
                codigo : 500,
                mensaje : 'Error creando la nueva consola!'
            }
        }else{
            items.push(req.body)
            respuesta = {
                error : false,
                codigo : 200,
                mensaje : items
            }
        }
        res.send(respuesta);
    });

    app.put('/products/:id', jsonParser, function(req, res){
        let id = req.params.id;

        items[id].name = req.body.name;
        items[id].description = req.body.description;
        items[id].company = req.body.company;
        items[id].img = req.body.img;

        respuesta = {
            error : false,
            codigo : 200,
            mensaje : items[id],
        }
        res.send(respuesta);
    })

    app.listen(3000, ()=>{
        console.log("API en el puerto 3000");
    })
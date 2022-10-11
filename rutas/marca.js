const { Router } = require('express');
const Marca = require('../modelos/Marca');

const router = Router();

// GET http://localhost:3000/marca
router.get('/', async function(req, res) {
    try {
        const marca = await Marca.find();
        res.send(marca);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

// POST http://localhost:3000/marca
router.post('/', async function(req, res) {
    try {
       console.log(req.body);

       let marca = await Marca.findOne({ nombre: req.body.nombre });
      
       if (marca) {
           return res.status(400).send('Marca ya existe');
       }


       marca = new Marca(); //new Marca(req.body);
       marca.nombre = req.body.nombre;
       marca.estado = req.body.estado;
       marca.fechaCreacion = new Date();
       marca.fechaActualizacion = new Date();

       // guardamos
       marca = await marca.save();
       res.send(marca);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

// PUT http://localhost:3000/marca
router.put('/:marcaId', async function(req, res) {
    try {
        console.log(req.body, req.params.marcaId);
       
        let marca = await Marca.findById(req.params.marcaId);
        if (!marca) {
            return res.status(400).send('La Marca no existe');
        }

        marca.nombre = req.body.nombre;
        marca.email = req.body.email;
        marca.estado = req.body.estado;
        marca.fechaActualizacion = new Date();
       // guardamos
       marca = await marca.save();
       res.send(marca);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

router.get('/:marcaId', async function(req, res) {
    try{
      const marca = await Marca.findById(req.params.marcaId);
      if(!marca){
          return res.status(404).send('marca no existe');
      }
      res.send(marca);
    }catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

module.exports = router;
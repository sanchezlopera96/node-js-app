const { Router } = require('express');
const TipoEquipo = require('../modelos/TipoEquipo');

const router = Router();

// GET http://localhost:3000/tipo-equipo
router.get('/', async function(req, res) {
    try {
        const tipoEquipo = await TipoEquipo.find();
        res.send(tipoEquipo);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});


// POST http://localhost:3000/tipo-equipo 
router.post('/', async function(req, res) {
    try {
       console.log(req.body);

       let tipoEquipo = await TipoEquipo.findOne({ nombre: req.body.nombre });
      
       if (tipoEquipo) {
           return res.status(400).send('Tipo de equipo ya existe');
       }


       tipoEquipo = new TipoEquipo(); //new TipoEquipo(req.body);
       tipoEquipo.nombre = req.body.nombre;
       tipoEquipo.estado = req.body.estado;
       tipoEquipo.fechaCreacion = new Date();
       tipoEquipo.fechaActualizacion = new Date();

       // guardamos
       tipoEquipo = await tipoEquipo.save();
       res.send(tipoEquipo);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

// PUT http://localhost:3000/tipo-equipo 
router.put('/:tipoEquipoId', async function(req, res) {
    try {
        console.log(req.body, req.params.tipoEquipoId);
       
        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if (!tipoEquipo) {
            return res.status(400).send('Tipo de Equipo no existe');
        }

       tipoEquipo.nombre = req.body.nombre;
       tipoEquipo.email = req.body.email;
       tipoEquipo.estado = req.body.estado;
       tipoEquipo.fechaActualizacion = new Date();
       // guardamos
       tipoEquipo = await tipoEquipo.save();
       res.send(tipoEquipo);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

router.get('/:tipoId', async function(req, res) {
    try{
      const tipo = await TipoEquipo.findById(req.params.tipoId);
      if(!tipo){
          return res.status(404).send('tipo no existe');
      }
      res.send(tipo);
    }catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

module.exports = router;
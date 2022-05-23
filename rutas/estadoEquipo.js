const { Router } = require('express');
const EstadoEquipo = require('../modelos/EstadoEquipo');

const router = Router();

// GET http://localhost:3000/estado-equipo 
router.get('/', async function(req, res) {
    try {
        const estadoEquipo = await EstadoEquipo.find();
        res.send(estadoEquipo);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});


// POST http://localhost:3000/estado-equipo 
router.post('/', async function(req, res) {
    try {
       console.log(req.body);

       let estadoEquipo = await EstadoEquipo.findOne({ nombre: req.body.nombre });
      
       if (estadoEquipo) {
           return res.status(400).send('Estado de Equipo ya existe');
       }


       estadoEquipo = new EstadoEquipo(); //new EstadoEquipo(req.body);
       estadoEquipo.nombre = req.body.nombre;
       estadoEquipo.estado = req.body.estado;
       estadoEquipo.fechaCreacion = new Date();
       estadoEquipo.fechaActualizacion = new Date();

       // guardamos
       estadoEquipo = await estadoEquipo.save();
       res.send(estadoEquipo);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});


// PUT http://localhost:3000/estado-equipo 
router.put('/:estadoEquipoId', async function(req, res) {
    try {
        console.log(req.body, req.params.estadoEquipoId);
       
        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if (!estadoEquipo) {
            return res.status(400).send('Estado Equipo no existe');
        }

        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.email = req.body.email;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaActualizacion = new Date();
       // guardamos
       estadoEquipo = await estadoEquipo.save();
       res.send(estadoEquipo);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});



module.exports = router;
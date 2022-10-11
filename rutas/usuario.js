const { Router } = require('express');
const router = Router();
const Usuario = require('../modelos/Usuario');

// GET http://localhost:3000/usuario 
router.get('/', async function(req, res) {
    try {
        const usuario = await Usuario.find();
        res.send(usuario);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

// POST http://localhost:3000/usuario 
router.post('/', async function(req, res) {
    try {
       console.log(req.body);

       let usuario = await Usuario.findOne({ email: req.body.email });
      
       if (usuario) {
           return res.status(400).send('Email ya existe');
       }

       usuario = new Usuario(); //new Usuario(req.body);
       usuario.nombre = req.body.nombre;
       usuario.email = req.body.email;
       usuario.estado = req.body.estado;
       usuario.fechaCreacion = new Date();
       usuario.fechaActualizacion = new Date();

       // guardamos
       usuario = await usuario.save();
       res.send(usuario);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

// PUT http://localhost:3000/usuario 
router.put('/:usuarioId', async function(req, res) {
    try {
        console.log(req.body, req.params.usuarioId);
       
        let usuario = await Usuario.findById(req.params.usuarioId);
        if (!usuario) {
            return res.status(400).send('Usuario no existe');
        }
        
       const usuExisteXEmail = await Usuario
                            .findOne({ email: req.body.email, _id: { $ne: usuario._id } });
       if (usuExisteXEmail) {
           return res.status(400).send('Usuario ya existe');
       }

       usuario.nombre = req.body.nombre;
       usuario.email = req.body.email;
       usuario.estado = req.body.estado;
       usuario.fechaActualizacion = new Date();
       // guardamos
       usuario = await usuario.save();
       res.send(usuario);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

router.get('/:usuarioId', async function(req, res) {
    try{
      const usuario = await Usuario.findById(req.params.usuarioId);
      if(!usuario){
          return res.status(404).send('usuario no existe');
      }
      res.send(usuario);
    }catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

module.exports = router;
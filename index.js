const express = require('express');
const { getConnection } = require('./db/db-connection-mongo');
const cors = require('cors');

const app = express();
app.use(cors());

getConnection();

const inventario = require('./rutas/inventario');
const usuario = require('./rutas/usuario');
const estadoequipo = require('./rutas/estadoEquipo');
const marca = require('./rutas/marca');
const tipoequipo = require('./rutas/tipoEquipo');

// lectura de json
app.use(express.json());

app.use('/inventario', inventario); // http://localhost:3000/inventario GET, POST, PUT
app.use('/usuario', usuario); // http://localhost:3000/usuario GET, POST, PUT
app.use('/estado-equipo', estadoequipo); // http://localhost:3000/estado-equipo GET, POST, PUT
app.use('/marca', marca); // http://localhost:3000/marca GET, POST, PUT
app.use('/tipo-equipo', tipoequipo); // http://localhost:3000/tipo-equipo GET, POST, PUT

app.set('port', process.env.PORT || 3001)
app.set('json spaces', 2)

app.listen(app.get('port'), () => {
    console.log(`Servidor arrancó por puerto ${app.get('port')}`);
});




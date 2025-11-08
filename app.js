const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Cargar variables de entorno
dotenv.config();

// Crear instancia de Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('✅ API de herramientas funcionando correctamente');
});

// Rutas por entidad (modularizadas)
app.use('/api/empresa', require('./routes/empresa.routes'));
app.use('/api/sucursal', require('./routes/sucursal.routes'));
app.use('/api/cargo', require('./routes/cargo.routes'));
app.use('/api/usuario', require('./routes/usuario.routes'));
app.use('/api/tercero', require('./routes/tercero.routes'));
app.use('/api/herramienta', require('./routes/herramienta.routes'));
app.use('/api/tipoMovimiento', require('./routes/tipoMovimiento.routes'));
app.use('/api/movimiento', require('./routes/movimiento.routes'));
app.use('/api/consultas', require('./routes/consultas.routes'));

// Inicializa los cargos fijos
const inicializarCargos = require('./utils/initCargos');

// Conectar a MongoDB Atlas
connectDB();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    inicializarCargos(); // ← Aquí se ejecuta

    // Iniciar servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar a MongoDB:', error.message);
  });

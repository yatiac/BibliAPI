const express = require('express');
const router = express.Router();

const libros = require('./routes/libros.js');
const versiculos = require('./routes/versiculos.js');

router.use("/libros", libros);
router.use("/versiculos", versiculos);

module.exports = router;
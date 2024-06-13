const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'alumno.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Modificar la nota de Matemáticas del primer alumno
const alumnoIndex = 0;
const materiaIndex = data[alumnoIndex].materias.findIndex(materia => materia.nombre === 'Matemáticas');
data[alumnoIndex].materias[materiaIndex].nota = 10;

const updatedData = JSON.stringify(data, null, 2);
fs.writeFileSync(filePath, updatedData, 'utf8');
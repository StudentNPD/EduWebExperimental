(async function() {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');

    if (id) {
      try {
        const response = await fetch('../data/alumno.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const alumnos = await response.json();
        const alumno = alumnos.find(a => a.id === parseInt(id));
        if (alumno) {
          const promedioMaterias = alumno.materias.reduce((total, materia) => total + materia.nota, 0) / alumno.materias.length;
          const promedioHabilidades = alumno.skills.reduce((total, skill) => total + skill.nota, 0) / alumno.skills.length;

          // Actualiza el contenido de la página
          document.getElementById('content').innerHTML = `
            <h1>Notas de ${alumno.nombre} ${alumno.apellido}</h1>
            <h2>Materias</h2>
            <table>
              <thead>
                <tr>
                  <th>Materia</th>
                  <th>Nota</th>
                </tr>
              </thead>
              <tbody>
                ${alumno.materias.map(materia => `
                  <tr>
                    <td>${materia.nombre}</td>
                    <td>${materia.nota}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <p>Promedio general de materias: ${promedioMaterias.toFixed(2)}</p>
            <h2>Habilidades</h2>
            <table>
              <thead>
                <tr>
                  <th>Habilidad</th>
                  <th>Nota</th>
                  <th>Porcentaje</th>
                </tr>
              </thead>
              <tbody>
                ${alumno.skills.map(skill => `
                  <tr>
                    <td>${skill.nombre}</td>
                    <td>${skill.nota}</td>
                    <td>${(skill.nota / 10 * 100).toFixed(0)}%</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <p>Promedio general de habilidades: ${promedioHabilidades.toFixed(2)}</p>
          `;
        } else {
          document.getElementById('content').textContent = 'Alumno no encontrado';
        }
      } catch (error) {
        console.error('Error fetching alumno:', error);
        document.getElementById('content').textContent = 'Error al cargar los datos';
      }
    } else {
      document.getElementById('content').textContent = 'ID de alumno no proporcionado';
    }
  })();
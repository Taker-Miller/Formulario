  // Actualizar la tabla con los objetos del LocalStorage
  function actualizarTabla() {
    var tabla = document.getElementById('tablaObjetos');
    var tbody = tabla.querySelector('tbody');

    tbody.innerHTML = ''; // Limpiar el contenido actual de la tabla

    var objetos = JSON.parse(localStorage.getItem('objetos')) || [];

    objetos.forEach(function(objeto, indice) {
      var fila = document.createElement('tr');

      var indiceCell = document.createElement('td');
      indiceCell.textContent = indice;

      var nombreCell = document.createElement('td');
      nombreCell.textContent = objeto.nombre;

      var apellidoCell = document.createElement('td');
      apellidoCell.textContent = objeto.apellido;

      var edadCell = document.createElement('td');
      edadCell.textContent = objeto.edad;

      var sexoCell = document.createElement('td');
      sexoCell.textContent = objeto.sexo;

      var fechaNacimientoCell = document.createElement('td');
      fechaNacimientoCell.textContent = objeto.fechaNacimiento;

      var correoCell = document.createElement('td');
      correoCell.textContent = objeto.correo;

      var accionesCell = document.createElement('td');

      var botonModificar = document.createElement('button');
      botonModificar.textContent = 'Modificar';
      botonModificar.addEventListener('click', function() {
        modificarObjeto(indice);
      });

      var botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.addEventListener('click', function() {
        eliminarObjeto(indice);
      });

      accionesCell.appendChild(botonModificar);
      accionesCell.appendChild(botonEliminar);

      fila.appendChild(indiceCell);
      fila.appendChild(nombreCell);
      fila.appendChild(apellidoCell);
      fila.appendChild(edadCell);
      fila.appendChild(sexoCell);
      fila.appendChild(fechaNacimientoCell);
      fila.appendChild(correoCell);
      fila.appendChild(accionesCell);

      tbody.appendChild(fila);
    });

    tabla.style.display = objetos.length > 0 ? 'table' : 'none';
  }

  // Modificar un objeto
  function modificarObjeto(indice) {
    var objetos = JSON.parse(localStorage.getItem('objetos')) || [];

    var objeto = objetos.find(function(obj) {
      return obj.indice === indice;
    });

    if (objeto) {
      var nombre = prompt('Ingrese el nuevo nombre:', objeto.nombre);
      var apellido = prompt('Ingrese el nuevo apellido:', objeto.apellido);
      var edad = prompt('Ingrese la nueva edad:', objeto.edad);
      var sexo = prompt('Ingrese el nuevo sexo:', objeto.sexo);
      var fechaNacimiento = prompt('Ingrese la nueva fecha de nacimiento:', objeto.fechaNacimiento);
      var correo = prompt('Ingrese el nuevo correo electrónico:', objeto.correo);

      if (nombre && apellido && edad && sexo && fechaNacimiento && correo) {
        objeto.nombre = nombre;
        objeto.apellido = apellido;
        objeto.edad = edad;
        objeto.sexo = sexo;
        objeto.fechaNacimiento = fechaNacimiento;
        objeto.correo = correo;

        localStorage.setItem('objetos', JSON.stringify(objetos));
        actualizarTabla();
      }
    }
  }

  // Eliminar un objeto
  function eliminarObjeto(indice) {
    var objetos = JSON.parse(localStorage.getItem('objetos')) || [];

    objetos = objetos.filter(function(obj) {
      return obj.indice !== indice;
    });

    // Reindexar los objetos después de eliminar uno
    objetos.forEach(function(obj, indice) {
      obj.indice = indice;
    });

    localStorage.setItem('objetos', JSON.stringify(objetos));
    actualizarTabla();
  }

  document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var nombre = document.getElementById("campo1").value;
    var apellido = document.getElementById("campo2").value;
    var edad = document.getElementById("campo3").value;
    var sexo = document.getElementById("campo4").value;
    var fechaNacimiento = document.getElementById("campo5").value;
    var correo = document.getElementById("campo6").value;
    var robotCheckbox = document.getElementsByName("robotCheckbox")[0].checked;

    if (nombre && apellido && edad && sexo && fechaNacimiento && correo && robotCheckbox) {
      var objetos = JSON.parse(localStorage.getItem('objetos')) || [];

      var indice = objetos.length;

      var objeto = {
        indice: indice,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        sexo: sexo,
        fechaNacimiento: fechaNacimiento,
        correo: correo
      };

      objetos.push(objeto);

      localStorage.setItem('objetos', JSON.stringify(objetos));
      actualizarTabla();

      document.getElementById("myForm").reset();
    } else {
      alert("Por favor, complete todos los campos y marque la casilla de verificación");
    }
  });

  // Mostrar los datos almacenados al cargar la página
  actualizarTabla();
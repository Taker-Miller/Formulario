document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var campo1 = document.getElementById("campo1").value;
    var campo2 = document.getElementById("campo2").value;
    var campo3 = document.getElementById("campo3").value;
    var campo4 = document.getElementById("campo4").value;
    var campo5 = document.getElementById("campo5").value;
    var campo6 = document.getElementById("campo6").checked;
    var campo7 = document.getElementById("campo7").value;

    var formData = {
      campo1: campo1,
      campo2: campo2,
      campo3: campo3,
      campo4: campo4,
      campo5: campo5,
      campo6: campo6,
      campo7: campo7
    };

    var formDataArray = localStorage.getItem("formDataArray");
    var formDataArrayParsed = formDataArray ? JSON.parse(formDataArray) : [];

    formDataArrayParsed.push(formData);

    localStorage.setItem("formDataArray", JSON.stringify(formDataArrayParsed));

    alert("Formulario guardado en localStorage");

    document.getElementById("myForm").reset();
    displayFormData();
  });

  function displayFormData() {
    var formDataArray = localStorage.getItem("formDataArray");
    if (formDataArray) {
      var parsedDataArray = JSON.parse(formDataArray);

      var dataContainer = document.getElementById("dataContainer");
      dataContainer.innerHTML = "";

      parsedDataArray.forEach(function(formData) {
        var p = document.createElement("p");
        var jsonData = JSON.stringify(formData);
        p.textContent = jsonData;
        dataContainer.appendChild(p);
      });
    }
  }

  // Mostrar los datos almacenados al cargar la página
  displayFormData();

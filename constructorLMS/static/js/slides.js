function cambiarDiapositiva(event) {
  event.preventDefault();

  // Obtener el enlace de la miniatura
  var enlace = this.querySelector("a");

  // Obtener el ID de la diapositiva a mostrar
  var diapositivaID = enlace.getAttribute("href").substring(1);

  // Mostrar la diapositiva seleccionada
  var diapositiva = document.getElementById(diapositivaID);
  if (diapositiva) {
    diapositiva.style.display = "block";
  }

  // Obtener el contenido del "result-div"
  var contenido = document.getElementById("result-div").innerHTML;

  // Actualizar el contenido en la diapositiva
  if (diapositiva) {
    diapositiva.innerHTML = contenido;
  }

  // Actualizar el contenido en las miniaturas
  var miniaturas = document.querySelectorAll(".miniaturas li");
  for (var i = 0; i < miniaturas.length; i++) {
    var miniatura = miniaturas[i];
    var miniaturaEnlace = miniatura.querySelector("a");
    var miniaturaDiapositivaID = miniaturaEnlace.getAttribute("href").substring(1);
    var miniaturaDiapositiva = document.getElementById(miniaturaDiapositivaID);
    if (miniaturaDiapositiva) {
      miniaturaDiapositiva.innerHTML = contenido;
    }
  }
}

document.querySelectorAll(".miniaturas li").forEach(function (miniatura) {
  miniatura.addEventListener("click", cambiarDiapositiva);
});

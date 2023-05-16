function actualizarMiniatura() {
    var resultDiv = document.getElementById('result-div');
    var miniatura = document.getElementById('result-miniatura');
    
    // Clonar el contenido del result-div
    var clon = resultDiv.cloneNode(true);
    
    // Eliminar atributos innecesarios que podrían interferir con la miniatura
    clon.removeAttribute('id');
    clon.removeAttribute('contenteditable');
    clon.querySelectorAll('.delete-button').forEach(function (button) {
      button.remove();
    });
    
    // Establecer el tamaño y la posición de la miniatura
    var width = resultDiv.offsetWidth;
    var height = resultDiv.offsetHeight;
    var left = resultDiv.offsetLeft;
    var top = resultDiv.offsetTop;
    
    miniatura.innerHTML = '';
    miniatura.appendChild(clon);
    miniatura.style.width = width + 'px';
    miniatura.style.height = height + 'px';
    miniatura.style.left = left + 'px';
    miniatura.style.top = top + 'px';
  }
  
  // Actualizar la miniatura cuando se cargue la página y cuando haya cambios en el result-div
  window.addEventListener('load', actualizarMiniatura);
  document.getElementById('result-div').addEventListener('input', actualizarMiniatura);
  
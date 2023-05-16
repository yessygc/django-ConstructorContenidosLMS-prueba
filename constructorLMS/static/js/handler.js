/*// Función para manejar la selección de archivo
function handleFileSelection(file, elementId) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const element = document.getElementById(elementId);
      element.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
  
  // Manejador de eventos para el botón de selección de archivo
  document.getElementById('file-selector').addEventListener('click', function() {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*, video/*, audio/*');
    input.style.display = 'none';
  
    input.onchange = function() {
      var file = this.files[0];
      var fileType = file.type.split('/')[0];
      var elementId = '';
  
      switch(fileType) {
        case 'image':
          elementId = 'selected-image';
          break;
        case 'video':
          elementId = 'selected-video';
          break;
        case 'audio':
          elementId = 'selected-audio';
          break;
      }
  
      if (elementId) {
        handleFileSelection(file, elementId);
      }
    };
  
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  });*/
  
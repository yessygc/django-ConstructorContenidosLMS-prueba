var currentEditor = null;

// Función para abrir el explorador de archivos externo
function openFileSelector(callback) {
  var input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.style.display = 'none';

  input.onchange = function () {
    var file = this.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      callback(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  document.body.appendChild(input);
  input.click();
  document.body.removeChild(input);
}

// Función para actualizar el contenido mostrado
function actualizarContenido(editor) {
  var content = editor.getContent();
  document.getElementById('result-div').innerHTML = content;

  // Actualizar el contenido en las miniaturas
  var miniaturas = document.querySelectorAll(".miniaturas li");
  for (var i = 0; i < miniaturas.length; i++) {
    var enlace = miniaturas[i].querySelector("a");
    var diapositivaID = enlace.getAttribute("href").substring(1);
    var diapositiva = document.getElementById(diapositivaID);
    if (diapositiva) {
      diapositiva.innerHTML = content;
    }
  }
}


document.querySelectorAll('.toggle-button').forEach(function (button) {
  button.addEventListener('click', function () {
    var containerId = this.dataset.editor;
    var container = document.getElementById(containerId);

    if (currentEditor !== null && currentEditor !== container) {
      currentEditor.style.display = 'none';
      tinymce.get(currentEditor.firstElementChild.id).remove();
    }

    if (container.style.display === 'none') {
      container.style.display = 'block';
      container.innerHTML = '<textarea id="' + containerId + '-editor"></textarea>';
      var plugins = '';
      var toolbar = '';
      var file_picker_types = '';
      var file_picker_callback = function () { };
      switch (containerId) {
        case 'editor-1':
          selector = 'textarea#premiumskinsandicons-fluent',
          plugins = 'wordcount fontselect fontsizeselect';
          toolbar = 'undo redo | blocks | bold italic forecolor backcolor formatselect fontselect fontsizeselect| alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat';
          break;
        case 'editor-2':
          selector = 'textarea#drive-pick-images-example';
          plugins = 'image imagetools';
          toolbar = 'undo redo | image';
          file_picker_types = 'image';
          file_picker_callback = function (callback, value, meta) {
            if (meta.filetype == 'image') {
              openFileSelector(function (url) {
                callback(url);
              });
            }
          };
          break;
        case 'editor-3':
          plugins = 'media';
          toolbar = 'undo redo | media';
          file_picker_types = 'video';
          file_picker_callback = function (callback, value, meta) {
            if (meta.filetype == 'video') {
              openFileSelector(function (url) {
                callback(url);
              });
            }
          };
          break;
        case 'editor-4':
          plugins = 'media';
          toolbar = 'undo redo | media';
          break;
      }
      tinymce.init({
        selector: '#' + containerId + '-editor',
        plugins: plugins,
        toolbar: toolbar,
        menubar: false,
        file_picker_types: file_picker_types,
        file_picker_callback: file_picker_callback,
        imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",
        imagetools_cors_hosts: ["http://127.0.0.1:3000/tres/", "http://127.0.0.1:3000/constructor/"],
        setup: function (editor) {
          editor.on('input', function () {
            actualizarContenido(editor);
          });
        }        
      });
      currentEditor = container;
    } else {
      container.style.display = 'none';
      tinymce.get(container.firstElementChild.id).remove();
      currentEditor = null;
    }
  });
});


/* // Inicializar editores de TinyMCE con diferentes plugins
tinymce.init({
    selector: '#editor-1',
    plugins: 'code',
    toolbar: 'undo redo | code'
});

tinymce.init({
    selector: '#editor-2',
    plugins: 'code table',
    toolbar: 'undo redo | table'
});

tinymce.init({
    selector: '#editor-3',
    plugins: 'code advlist',
    toolbar: 'undo redo | advlist'
});

tinymce.init({
    selector: '#editor-4',
    plugins: 'code lists',
    toolbar: 'undo redo | bullist numlist'
});

// Función para mostrar y ocultar el contenido de los divs
function toggleEditor(containerId) {
    var container = document.getElementById(containerId);
    if (container.style.display === 'none') {
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
} */

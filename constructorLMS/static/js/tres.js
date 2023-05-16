var currentEditor = null;

//Función para abrir el explorador de archivos externo
function openFileSelector(callback) {
  var input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*, video/*, audio/*');
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
  var editorId = editor.id;

  switch (editorId) {
    case 'editor-1':
      document.getElementById('h1-visor').textContent = content;
      break;
    case 'editor-2':
      document.getElementById('h2-visor').textContent = content;
      break;
    case 'editor-3':
      document.getElementById('p-visor').textContent = content;
      break;
    default:
      break;
  }
}

interact('.draggable')
  .draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    listeners: {
      start(event) {
        event.target.classList.add('dragging');
      },
      move(event) {
        const { dx, dy } = event;
        const target = event.target;

        const x = (parseFloat(target.getAttribute('data-x')) || 0) + dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + dy;

        target.style.transform = `translate(${x}px, ${y}px)`;

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      },
      end(event) {
        event.target.classList.remove('dragging');
        event.target.removeAttribute('data-x');
        event.target.removeAttribute('data-y');
      }
    }
  })
  .resizable({
    edges: { left: true, right: true, bottom: true, top: true },
    listeners: {
      move(event) {
        const target = event.target;
        const { width, height } = event.rect;

        target.style.width = `${width}px`;
        target.style.height = `${height}px`;
      }
    }
  });

/*Función para abrir y cerrar los botones y que se muestre su respectivo editor*/
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
          setup = function (editor) {
            editor.on('input', function () {
              actualizarContenido(editor);
            });
          }
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
          setup = function (editor) {
            editor.on('input', function () {
              actualizarContenido(editor);
            });
          }
          break;
        case 'editor-3':
          plugins = 'media';
          toolbar = 'undo redo | media';
          file_picker_types = ['video', 'audio']; // Permitir seleccionar archivos de video y audio
          file_picker_callback = function (callback, value, meta) {
            if (meta.filetype == 'video' || meta.filetype == 'audio') { // Verificar si es video o audio
              openFileSelector(function (url) {
                callback(url);
              });
            }
          };
          setup = function (editor) {
            editor.on('input', function () {
              actualizarContenido(editor);
            });
          }
          break;
        case 'editor-4':
          plugins = 'media';
          toolbar = 'undo redo | media';
          file_picker_types = ['video', 'audio']; // Permitir seleccionar archivos de video y audio
          file_picker_callback = function (callback, value, meta) {
            if (meta.filetype == 'audio' || meta.filetype == 'video') { // Verificar si es video o audio
              openFileSelector(function (url) {
                callback(url);
              });
            }
          };
          setup = function (editor) {
            editor.on('input', function () {
              actualizarContenido(editor);
            });
          }
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

function guardarContenido() {
  var visorDiapositiva = document.querySelector('#result-div');
  var diapositivaId = visorDiapositiva.getAttribute('name');
  var titulo = document.getElementById('h1-visor').textContent;
  var subtitulo = document.getElementById('h2-visor').textContent;
  var contenido = document.getElementById('p-visor').textContent;

  var diapositiva = diapositivasBase.find(function (diapositiva) {
    return diapositiva.id === diapositivaId;
  });

  if (diapositiva) {
    diapositiva.titulo = titulo;
    diapositiva.subtitulo = subtitulo;
    diapositiva.contenido = contenido;
  }

  console.log(diapositivasBase);
}


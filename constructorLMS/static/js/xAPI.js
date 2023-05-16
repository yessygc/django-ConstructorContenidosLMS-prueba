function guardarComoXAPI() {
  // Crear un statement en formato xAPI
  const statement = new TinCan.Statement({
    actor: {
      mbox: "mailto:usuario@example.com",
      name: "Nombre del usuario"
    },
    verb: {
      id: "http://adlnet.gov/expapi/verbs/completed",
      display: {
        "en-US": "completed"
      }
    },
    object: {
      id: "http://actividad/ejercicio",
      definition: {
        name: {
          "en-US": "Nombre de la actividad o ejercicio"
        }
      }
    },
    // Agregar los datos guardados al statement
    result: {
      extensions: {
        "http://example.com/data": contenidoGuardado
      }
    }
    // Agrega más propiedades según tus necesidades
  });

  // Convertir el statement a formato xAPI
  const xapiData = JSON.stringify(statement);
  const blob = new Blob([xapiData], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = "datos.xapi";
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
  URL.revokeObjectURL(url);
}
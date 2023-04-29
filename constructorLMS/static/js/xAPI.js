function guardarComoXAPI() {
  // Aquí debes agregar el código para convertir los datos a formato xAPI
  const xapiData = "Datos en formato xAPI"; // Reemplazar por los datos en formato xAPI
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
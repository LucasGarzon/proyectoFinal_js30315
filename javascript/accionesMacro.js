console.log("Simulador de finanzas");

// bienvenida
let nombre = prompt("Por favor introduzca su nombre");
while (nombre == null || nombre === "" || nombre == parseInt) {
  nombre = prompt("Por favor, vuelva a introducir su nombre");
}
let container = document.getElementById("nombreUsuario");
container.innerHTML =
  "<b>" + nombre.charAt(0).toUpperCase() + nombre.slice(1) + "</b>"; // Nombre en mayúscula
let opt = "";
function cargarInfo() {
  let nombreCategoria = [];
  while (confirm("Desea agregar una nueva categoría")) {
    let ingresoCategoria = prompt("Ingrese una categría");
    if (ingresoCategoria != "" && ingresoCategoria != null) {
      nombreCategoria.push(ingresoCategoria);
    }
  }
  console.log(nombreCategoria);
  // loop para crear categorías
  let nuevaCategoria = document.getElementById("sCat");
  for (let i = 0; i < nombreCategoria.length; i++) {
    let opt = document.createElement("option");
    opt.value = nombreCategoria[i];
    opt.innerHTML =
      nombreCategoria[i].charAt(0).toUpperCase() + nombreCategoria[i].slice(1); //Primer letra mayúscula
    nuevaCategoria.appendChild(opt);
  }
}

let sumaPrecios = [];

function cargarGasto() {
  class nuevoGasto {
    constructor(categoria, producto, precio) {
      (this.categoria = document.getElementById("sCat").value),
        (this.producto = document.getElementById("tipoProducto").value),
        (this.precio = parseFloat(
          document.getElementById("precioProducto").value
        ));
    }
  }
  let imprimir = new nuevoGasto();
  const arrayGastos = [];
  arrayGastos.push(imprimir.categoria);
  arrayGastos.push(imprimir.producto);
  arrayGastos.push(imprimir.precio.toFixed(2));
  if (
    imprimir.categoria != "Categoría" &&
    imprimir.producto != "" &&
    imprimir.precio >= 0
  ) {
    let linea = document.createElement("tr");
    let imprimirLinea = document.getElementById("tablaGastos");
    imprimirLinea.appendChild(linea);
    for (let i = 0; i < arrayGastos.length; i++) {
      let nuevaLinea = document.createElement("td");
      nuevaLinea.classList = "col-4 text-center";
      nuevaLinea.innerHTML = arrayGastos[i];
      imprimirLinea.appendChild(nuevaLinea);
    }
    sumaPrecios.push(imprimir.precio);
    let sumaTotal = 0;
    for (let i = 0; i < sumaPrecios.length; i++) {
      sumaTotal += sumaPrecios[i];
    }
    let gastosTotales = document.getElementById("tablaTotal");
    gastosTotales.innerText = sumaTotal.toFixed(2);
    document.getElementById("tipoProducto").value = "";
    document.getElementById("precioProducto").value = "";
  } else {
    alert("Algo salió mal =( \nPor favor, revisa todos los datos");
  }
}

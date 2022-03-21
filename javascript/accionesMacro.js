console.log("Simulador de finanzas");

//Variables globales
const storedElements = localStorage.getItem('memoriaCat')
let nombreCategoria = [];
let sumaPrecios = [];
let opt = "";
let select = document.getElementById("sCat");
const arrayGastos = [];

// Imprimir datos guardados en localStorage
if (storedElements){
  nombreCategoria = JSON.parse(storedElements);
}
renderOptions()

//Sumar categorias --> onclick
function cargarInfo() {
  let ingresoCategoria = document.getElementById("nuevaCategoria").value.trim();
  let checkArray = nombreCategoria.includes(ingresoCategoria);
  if (ingresoCategoria && checkArray !== true) {
    nombreCategoria.push(ingresoCategoria);
    renderOptions()
    document.getElementById("nuevaCategoria").value = "";
    //Guardar en LocalStorage
    localStorage.setItem('memoriaCat', JSON.stringify(nombreCategoria))
  } else if (checkArray == true) {
    alert("Ya existe esa categoria");
  }
}
// Escribir categorías en el DOM
function renderOptions() {
  select.innerHTML = "";
  for (const element of nombreCategoria) {
    let opt = document.createElement("option");
    opt.value = element;
    opt.innerHTML = opt.value;
    select.appendChild(opt);
  }
}

// Sumar categoria con tecla "ENTER"
let nCategoria = document.getElementById("nuevaCategoria");
nCategoria.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    cargarInfo();
  }
});

// eliminar categorias --> addEventListener
let botonBorrar = document.getElementById("btnBorrar");
botonBorrar.addEventListener("click", borrarCategoria);
function borrarCategoria() {
  let borrarArray = select.value;
  nombreCategoria = nombreCategoria.filter((e) => e !== borrarArray);
  select.remove(select.selectedIndex);
  localStorage.setItem('memoriaCat', JSON.stringify(nombreCategoria))
}

// Cargar gastos
function cargarGasto() {
  // class NuevoGasto {
  //   constructor(categoria, producto, precio) {
  //     (this.categoria = categoria),
  //       (this.producto = producto),
  //       (this.precio = precio);
  //   }
  // }
  function NuevoGasto(categoria, producto, precio) {
    this.categoria = categoria;
    this.producto = producto;
    this.precio = precio;
  }
  categoria = document.getElementById("sCat").value
  producto = document.getElementById("tipoProducto").value
  precio = parseFloat(document.getElementById("precioProducto").value)
  let imprimir = new NuevoGasto(categoria, producto, precio);
  // const arrayGastos = [];
  // arrayGastos.push(imprimir.categoria);
  // arrayGastos.push(imprimir.producto);
  // arrayGastos.push(imprimir.precio.toFixed(2));
  arrayGastos.push(imprimir)
  if (
    imprimir.categoria != "Categorías" &&
    imprimir.categoria != "" &&
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

console.log("Simulador de finanzas");

//Variables globales
const storedElements = localStorage.getItem('memoriaCat')
const storedGastos = localStorage.getItem('memoriaGastos')
const storedTotal = localStorage.getItem('memoriaTotal')
let nombreCategoria = [];
let sumaPrecios = [];
let opt = "";
let select = document.getElementById("sCat");
let arrayGastos = [];
// Imprimir datos guardados para las categorias
if (storedElements){
  nombreCategoria = JSON.parse(storedElements);
}
renderOptions()
// Imprimir datos guardados para los gastos
if (storedGastos) {
  arrayGastos = JSON.parse(storedGastos);
}
renderGastos()
// Imprimir datos guardados para el total de los gastos
if (storedTotal) {
  sumaPrecios = JSON.parse(storedTotal)
}
renderTotal()
//Sumar nuevas categorias --> onclick
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
// Funcion para renderizar las categorias
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
  //Guardar en LocalStorage
  localStorage.setItem('memoriaCat', JSON.stringify(nombreCategoria))
}
// Cargar gastos
function cargarGasto() {
  function NuevoGasto(categoria, producto, precio) {
    this.categoria = categoria;
    this.producto = producto;
    this.precio = precio;
  }
  categoria = document.getElementById("sCat").value
  producto = document.getElementById("tipoProducto").value
  precio = parseFloat(document.getElementById("precioProducto").value)
  let imprimir = new NuevoGasto(categoria, producto, precio);
  if (
    imprimir.categoria != "Categorías" &&
    imprimir.categoria != "" &&
    imprimir.producto != "" &&
    imprimir.precio >= 0
    ) {
    arrayGastos.push(imprimir)
    renderGastos()
    //Guardar en LocalStorage
    localStorage.setItem('memoriaGastos', JSON.stringify(arrayGastos))
    sumaPrecios.push(imprimir.precio);
    localStorage.setItem('memoriaTotal', JSON.stringify(sumaPrecios))
    renderTotal()
  } else {
    alert("Algo salió mal =( \nPor favor, revisa todos los datos");
  }
}
// Funcion para renderizar cada gasto en la tabla
function renderGastos() {
  let imprimirLinea = document.getElementById("tablaGastos");
  imprimirLinea.innerHTML = "";
  for (const element of arrayGastos) {
    const linea = document.createElement("tr");
    let lineaCat = document.createElement("td");
    lineaCat.classList = "col-4 text-center";
    lineaCat.innerHTML = element.categoria;
    imprimirLinea.appendChild(lineaCat);
    let lineaProd = document.createElement("td");
    lineaProd.classList = "col-4 text-center";
    lineaProd.innerHTML = element.producto;
    imprimirLinea.appendChild(lineaProd);
    let lineaPrecio = document.createElement("td");
    lineaPrecio.classList = "col-4 text-center";
    lineaPrecio.innerHTML = element.precio.toFixed(2);
    imprimirLinea.appendChild(lineaPrecio);
    imprimirLinea.appendChild(linea);
  }
}
// Funcion para renderizar el total de gatos
function renderTotal() {
    let sumaTotal = 0;
    for (let i = 0; i < sumaPrecios.length; i++) {
      sumaTotal += sumaPrecios[i];
    }
    let gastosTotales = document.getElementById("tablaTotal");
    gastosTotales.innerText = sumaTotal.toFixed(2);
    document.getElementById("tipoProducto").value = "";
    document.getElementById("precioProducto").value = "";
}
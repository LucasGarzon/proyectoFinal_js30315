console.log("Simulador de finanzas");

// Uso de Fetch para cargar categorías sugeridas
const URL =
  "https://lucasgarzon.github.io/proyectoFinal_js30315/javascript/data/data.json";
async function addCats() {
  const res = await fetch(URL);
  const data = await res.json();
  data.forEach((e) => {
    if (!nombreCategoria.includes(e.title)) {
      nombreCategoria.push(e.title);
    }
  });
  renderOptions();
  localStorage.setItem("memoriaCat", JSON.stringify(nombreCategoria));
  Swal.fire({
    icon: "success",
    title: "Las categorías fueron creadas",
    showConfirmButton: false,
    timer: 1500,
  });
}

//Variables globales
let opt = "";
let select = document.getElementById("sCat");
// Crear arrays globales e imprimir datos guardados en localStorage para los mismos
let nombreCategoria = JSON.parse(localStorage.getItem("memoriaCat")) || [];
renderOptions();
let arrayGastos = JSON.parse(localStorage.getItem("memoriaGastos")) || [];
renderGastos();
let sumaPrecios = JSON.parse(localStorage.getItem("memoriaTotal")) || [];
renderTotal();
visualGastos();
//Sumar nuevas categorias --> onclick
function cargarInfo() {
  let ingresoCategoria = document.getElementById("nuevaCategoria").value.trim();
  let checkArray = nombreCategoria.includes(ingresoCategoria);
  if (ingresoCategoria && checkArray !== true) {
    nombreCategoria.push(ingresoCategoria);
    renderOptions();
    document.getElementById("nuevaCategoria").value = "";
    //Guardar en LocalStorage
    localStorage.setItem("memoriaCat", JSON.stringify(nombreCategoria));
    Swal.fire({
      icon: "success",
      title: "La categoría fue creada",
      showConfirmButton: false,
      timer: 1500,
    });
  } else if (checkArray == true) {
    Swal.fire({
      icon: "error",
      title: "La categoría ya existe",
    });
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
  localStorage.setItem("memoriaCat", JSON.stringify(nombreCategoria));
}
// Cargar gastos
function cargarGasto() {
  const typeGasto = document.getElementById("visualGasto");
  typeGasto.selectedIndex = 0;
  function NuevoGasto(fecha, categoria, producto, tGasto, precio) {
    this.fecha = fecha;
    this.categoria = categoria;
    this.producto = producto;
    this.tGasto = tGasto;
    this.precio = precio;
  }
  fecha = document.getElementById("date").value;
  categoria = document.getElementById("sCat").value;
  producto = document.getElementById("tipoProducto").value;
  tGasto = document.getElementById("tipoGasto").value;
  precio = parseFloat(document.getElementById("precioProducto").value);
  let imprimir = new NuevoGasto(fecha, categoria, producto, tGasto, precio);
  if (
    imprimir.fecha != "" &&
    imprimir.categoria != "Categorías" &&
    imprimir.categoria != "" &&
    imprimir.producto != "" &&
    imprimir.precio >= 0
  ) {
    arrayGastos.push(imprimir);
    renderGastos();

    //Guardar en LocalStorage
    localStorage.setItem("memoriaGastos", JSON.stringify(arrayGastos));
    sumaPrecios.push(imprimir.precio);
    localStorage.setItem("memoriaTotal", JSON.stringify(sumaPrecios));
    renderTotal();
    visualGastos() 
    Toastify({
      text: "El gasto ha sido ingresado",
      className: "info",
      duration: 1500,
      style: {
        background: "linear-gradient(to right, #6B847B, #777A66)",
      },
    }).showToast();
  } else {
    Swal.fire({
      icon: "error",
      title: "Algo salió mal!",
      text: "Por favor, revisa todos los datos",
    });
  }
}
// Funcion para renderizar cada gasto en la tabla
function renderGastos() {
  let imprimirLinea = document.getElementById("tablaGastos");
  imprimirLinea.innerHTML = "";
  for (const element of arrayGastos) {
    // Desestructuración
    let { fecha, categoria, producto, tGasto, precio } = element;
    const linea = document.createElement("tr");
    linea.id = "gastoNro" + arrayGastos.indexOf(element)
    let lineaDate = document.createElement("td");
    lineaDate.classList = "col-2 text-center";
    lineaDate.innerHTML = fecha;
    let lineaCat = document.createElement("td");
    lineaCat.classList = "col-2 text-center";
    lineaCat.innerHTML = categoria;
    let lineaProd = document.createElement("td");
    lineaProd.classList = "col-2 text-center";
    lineaProd.innerHTML = producto;
    let lineatGasto = document.createElement("td");
    lineatGasto.classList = "col-3 text-center";
    lineatGasto.innerHTML = tGasto;
    let lineaPrecio = document.createElement("td");
    lineaPrecio.classList = "col-1 text-center";
    lineaPrecio.innerHTML = '<span>$</span>' + precio.toFixed(2);
    linea.append(lineaDate, lineaCat, lineaProd, lineatGasto, lineaPrecio)
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
  gastosTotales.innerText = "$" + sumaTotal.toFixed(2);
  document.getElementById("tipoProducto").value = "";
  document.getElementById("precioProducto").value = "";
}
// Formato de visualización
function visualGastos() {
  arrayGastos = JSON.parse(localStorage.getItem("memoriaGastos"));
  sumaPrecios = JSON.parse(localStorage.getItem("memoriaTotal"));
  const typeGasto = document.getElementById("visualGasto").value;
  const visualGastos = [];
  const nuevoTotal = [];
  if (typeGasto === "Fijo") {
    arrayGastos.forEach((e) => {
      if (e.tGasto === "Fijo") {
        visualGastos.push(e);
        nuevoTotal.push(e.precio);
      }
      sumaPrecios = nuevoTotal;
      arrayGastos = visualGastos;
    });
  } else if (typeGasto === "Variable") {
    arrayGastos.forEach((e) => {
      if (e.tGasto === "Variable") {
        visualGastos.push(e);
        nuevoTotal.push(e.precio);
      }
      sumaPrecios = nuevoTotal;
      arrayGastos = visualGastos;
    });
  } else if (typeGasto === "Menor") {
    arrayGastos.sort((a, b) => {
      return a.precio - b.precio;
    });
  } else if (typeGasto === "Mayor") {
    arrayGastos.sort((a, b) => {
      return a.precio - b.precio;
    });
    arrayGastos.reverse();
  } else if (typeGasto === "antiguos") {
    arrayGastos.sort((a, b) => {
      return new Date(b.fecha) - new Date(a.fecha);
    });
    arrayGastos.reverse();
  } else {
    arrayGastos.sort((a, b) => {
      return new Date(b.fecha) - new Date(a.fecha);
    });
  }
  renderGastos();
  renderTotal();
}

console.log("Simulador de huerta");

// // bienvenida
// let nombre = prompt("Por favor introduzca su nombre")
// while (nombre == null || nombre === "" || nombre == parseInt) {
//     nombre = prompt("Por favor, vuelva a introducir su nombre")
// }
// let container = document.getElementById("nombreUsuario")
// container.innerHTML = "<b>" + nombre.charAt(0).toUpperCase() + nombre.slice(1) + "</b>" // Nombre en mayúscula

let arrayUsuario = [];
let opt = ""

function cargarInfo(){
    let nombreCategoria = []
    while (confirm("Desea agregar una nueva categoría")) {
        let ingresoCategoria = prompt("Ingrese una categría")
        nombreCategoria.push(ingresoCategoria)
    }
    console.log(nombreCategoria);
    // loop para crear categorías
    let nuevaCategoria = document.getElementById("sArea")
    for (let i = 0; i < nombreCategoria.length; i++) {
        let opt = document.createElement('option')
        opt.value = i
        opt.id = "categoria" + i
        opt.innerHTML = nombreCategoria[i].charAt(0).toUpperCase() + nombreCategoria[i].slice(1) //Primer letra mayúscula
        nuevaCategoria.appendChild(opt)       
    }

}








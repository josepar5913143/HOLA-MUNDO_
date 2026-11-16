// SOLUCION DEL LABORATORIO 1
// INVENTARIO DE PRODUCTOS

let productos = [
    {nombre: "Mouse", precio: 40, stock: 25},
    {nombre: "Teclado", precio: 70, stock: 0},
    {nombre: "Monitor", precio: 450, stock: 8},
    {nombre: "Laptop Lenovo", precio: 2000, stock: 5},
    {nombre: "USB", precio: 30, stock: 50},
    {nombre: "Audifonos", precio: 120, stock: 12}    
];

const listaProductos = document.getElementById("lista-productos");
const totalInventario = document.getElementById("total-inventario");
const campoNombreProducto = document.getElementById("nombre-producto");
const btnAumentar = document.getElementById("btn-aumentar");
const mensajeInventario = document.getElementById("mensaje-inventario");

//funcion filtro -> dibuja la lista y calcular un monto total
function mostrarInventario(){
    // filter() --> stock > 0 y precio < 500    
    const disponibles = productos.filter(function (p){
        return p.stock > 0 && p.precio < 500;
    });
    // map() --> convertimos cada producto en un texto
    const filas = disponibles.map(function (p){
        return "<li><span>" + p.nombre + " (S/ " + p.precio + ")</span>" +
                "<span>Stock: " + p.stock + "</span></li>";
    });
    // join --> unimos todos los posibles li que se generen en un solo texto y luego mostrar
    listaProductos.innerHTML = filas.join("");

    //reduce --> sumamos precio  * stock de los productos filtrados
    const total = disponibles.reduce(function (acumulado, p){
        return acumulado + p.precio * p.stock;
    }, 0);
    totalInventario.textContent = "S/ " + total;
}

// Funcion que recibe un nombre y aumenta el stock en +10
function aumentarStock(nombre){
    // find --> buscar el primer producto con el nombre que le daremos
    // toLowerCase --> sirve para ignorar mayusculas y minusculas
    const producto = productos.find(function (p){
        return p.nombre.toLowerCase() === nombre.toLowerCase();
    });

    // si no existe un producto, avisamos y terminamos el programa
    if (producto === undefined){
        mensajeInventario.textContent = "No existe el producto " + nombre;
        mensajeInventario.className = "mensaje error";
        return;
    }

    producto.stock = producto.stock + 10;

    mensajeInventario.textContent =
        producto.nombre + " ahora tiene stock " + producto.stock;
    mensajeInventario.className = "mensaje exito";
    // llamamos la primer funcion que hemos creado
    mostrarInventario();

}

btnAumentar.addEventListener("click", function(){
    aumentarStock(campoNombreProducto.value.trim());
    campoNombreProducto.value = "";
});

mostrarInventario();


// SOLUCION DEL LABORATORIO 2
// EDITOR DE PERFILES

const campoNombre = document.getElementById("nombre");
const campoCorreo = document.getElementById("correo");
const campoEdad = document.getElementById("edad");
const btnGuardar = document.getElementById("btn-guardar");
const mensajePerfil = document.getElementById("mensaje-perfil");
const contenedorPerfiles = document.getElementById("contenedor-perfiles");

// crear una tarjeta visual con los datos del perfil
function crearTarjetaPerfil(nombre, correo, edad){
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    const titulo = document.createElement("h3");
    titulo.textContent = nombre;
    const parrafoCorreo = document.createElement("p");
    parrafoCorreo.textContent = "Correo: " + correo;
    const parrafoEdad = document.createElement("p");
    parrafoEdad.textContent = "Edad: " + edad + " años";

    //a agregar elementos dentro de la tarjeta
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(parrafoCorreo);
    tarjeta.appendChild(parrafoEdad);

    contenedorPerfiles.appendChild(tarjeta);
}

function mostrarError(texto){
    mensajePerfil.textContent = texto;
    mensajePerfil.classList.remove("exito");
    mensajePerfil.classList.add("error");

    // nuestro boton regresa a su estado normal
    btnGuardar.setAttribute("data-estado", "normal");
    btnGuardar.textContent = "Guardar";
}

btnGuardar.addEventListener("click", function(){
    //leer lo que escribio el usuario y le quitamos espacio sobrantes
    const nombre = campoNombre.value.trim();
    const correo = campoCorreo.value.trim();
    const edad = campoEdad.value.trim();

    //Validacion 1: ningun campo deberia quedar vacio
    if (nombre === "" || correo === "" || edad === ""){
        mostrarError("Completa todos los campos antes de guardar...");
        return; //necesitamos salir de la funcion con algo devuelto
    }
    //Validacion 2: el correo debe tener @
    if(!correo.includes("@")){
        mostrarError("El correo debe tener un @");
        return;
    }
    //Validacion 3: la edad debe ser mayor a 0
    if(Number(edad) <= 0){
        mostrarError("La edad debe ser mayor a 0");
        return;
    }

    //Si llegamos hasta aqui es porque todos los datos fueron validados
    crearTarjetaPerfil(nombre, correo, edad);
    mensajePerfil.textContent = "Perfil guardado correctamente";
    mensajePerfil.classList.remove("error");
    mensajePerfil.classList.add("exito");

    btnGuardar.setAttribute("data-estado", "guardado");
    btnGuardar.textContent = "Guardado";

    campoNombre.value = "";
    campoCorreo.value = "";
    campoEdad.value = "";
});

function reiniciarBoton(){
    //leer un estado actual del boton para simular una accion automatica
    if (btnGuardar.getAttribute("data-estado") === "guardado"){
        btnGuardar.setAttribute("data-estado","normal");
        btnGuardar.textContent = "Guardar";
    }
        mensajePerfil.classList.remove("error");
        mensajePerfil.textContent = "";        
    
}
campoNombre.addEventListener("input", reiniciarBoton);
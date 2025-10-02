// Ejercicio 1

const frutas = [
    {id: 1,     nombre: "anana",            precio: 3000,   ruta_img: "../img/anana.jpg"},
    {id: 2,     nombre: "arandano",         precio: 5000,   ruta_img: "../img/arandano.jpg"},
    {id: 3,     nombre: "banana",           precio: 1000,   ruta_img: "../img/banana.jpg"},
    {id: 4,     nombre: "frambuesa",        precio: 3000,   ruta_img: "../img/frambuesa.png"},
    {id: 5,     nombre: "frutilla",         precio: 3000,   ruta_img: "../img/frutilla.jpg"},
    {id: 6,     nombre: "kiwi",             precio: 2000,   ruta_img: "../img/kiwi.jpg"},
    {id: 7,     nombre: "mandarina",        precio: 800,    ruta_img: "../img/mandarina.jpg"},
    {id: 8,     nombre: "manzana",          precio: 1500,   ruta_img: "../img/manzana.jpg"},
    {id: 9,     nombre: "naranja",          precio: 9000,   ruta_img: "../img/naranja.jpg"},
    {id: 10,    nombre: "pera",             precio: 2500,   ruta_img: "../img/pera.jpg"},
    {id: 11,    nombre: "pomelo-amarillo",  precio: 2000,   ruta_img: "../img/pomelo-amarillo.jpg"},
    {id: 12,    nombre: "pomelo-rojo",      precio: 2000,   ruta_img: "../img/pomelo-rojo.jpg"},
    {id: 13,    nombre: "sandia",           precio: 10000,  ruta_img: "../img/sandia.jpg"}
];

let alumno = {dni: 46288586, nombre: 'Alejo', apellido: 'Perez'};

let est_info = document.getElementById("estInfo");

let catalogoFrutas = document.getElementById("catalogoFrutas");

let barraBusqueda = document.getElementById("barraBusqueda");

const carritoFrutas = [];
let productosCarrito = document.getElementById("productosCarrito");

let cantCarrito = document.getElementById("cantCarrito");
let valorTotal = document.getElementById("valorTotal");


// Ejercicio 2


/*
    Obtenemos el div "est-info"
    Le agregamos los datos del alumno
    Lo imprimimos dentro del nav y por consola
*/

function imprimirDatosAlumno(alumno){


    let mensajeDatosAlumno = `
        <p>${alumno.nombre} ${alumno.apellido}</p>
    `;
    console.log(`Nombre completo: ${alumno.nombre} ${alumno.apellido}`);

    est_info.innerHTML = mensajeDatosAlumno;
};

//imprimirDatosAlumno();

// Ejercicio 3


/*
    Recorremos la lista de frutas, le damos formato html y lo imprimimos en el div "catalogoFrutas".
*/

function mostrarCatalogoFrutas(frutas) {
    mensajeCatalogoFrutas = "";


    frutas.forEach(fruta => {
        mensajeCatalogoFrutas += `
            <div class="card-producto">
                <img src="${fruta.ruta_img}" alt="">
                <h3>${fruta.nombre}</h3>
                <p>$${fruta.precio}</p>
                <button onclick="agregarACarrito(${fruta.id})">Agregar al carrito</button>
            </div>
        `;
    });

    catalogoFrutas.innerHTML = mensajeCatalogoFrutas;
}

// Ejercicio 4


/*
    Cada vez que se deja de presionar una tecla se filtra las frutas que contengan esa frase y se imprimen en el catalogo de frutas.
*/

function filtrarProductos() {
    barraBusqueda.addEventListener("keyup", function(){
        let valorBusqueda = barraBusqueda.value;

        let productosFiltrados = frutas.filter(fruta => fruta.nombre.includes(valorBusqueda))
        mostrarCatalogoFrutas(productosFiltrados);
    });
}

// Ejercicio 5


/*
    Se llama cando apretamos el boton Agregar al carrito
    Recibe la id del producto que queremos agregar.
    Busca ese id en la lista de frutas le agrega el atributo cantidad en 1 y lo añade a la lista del carrito, 
    despues llama a la funcion para imprimir la nueva lista del carrito.
    Si el producto ya esta en la lista solo agrega en el campo cantidad.
    Guarda en localStorage los articulos y la cantidad de estos.
*/

function agregarACarrito(id) {
    let frutaSeleccionada = frutas.find(fruta => fruta.id === id);
    
    if (carritoFrutas.includes(frutaSeleccionada)) {
        frutaSeleccionada.cantidad ++;
    } else {

        frutaSeleccionada.cantidad = 1;
        carritoFrutas.push(frutaSeleccionada);
    }
    console.log(frutaSeleccionada);
    
    console.log(carritoFrutas);
    localStorage.setItem("indice", `${guardarCarrito()}`);
    mostrarCarrito();
}

/*
    Es llamada cuando se agrega una fruta al carrito.
    Recorre la lista de las frutas del carrito y les da un formato html.
    Luego imprime la nueva lista del carrito.
*/

function mostrarCarrito() {
    cartaCarrito = "";
    carritoFrutas.forEach((fruta, i) => {
        cartaCarrito += `
        <li class="bloque-item">
        <p class="nombre-item">${fruta.nombre} - $${fruta.precio} - x${fruta.cantidad}</p>
        <button class="boton-eliminar" onclick="eliminarProducto(${i})">Eliminar</button>
        </li>
        `;
    });
    
    productosCarrito.innerHTML = cartaCarrito;
    cantProductosEnCarritoHeader();
    mostrarValorTotal();
}

/*
    Recibe el indice de la lista del carrito
    Se llama cuando se apreta el boton Eliminar.
    Si el producto tiene mas de uno en cantidad solo descuenta uno, si llega a cero lo borra.
    Solo borra ese producto de la lista y vuelve a mostrar la lista del carrito actualizada.
    Guarda en localStorage los articulos y la cantidad de estos.
*/

function eliminarProducto(indice) {
    
    let frutaAEliminar = carritoFrutas[indice];
    if (frutaAEliminar.cantidad -1 > 0) {
        frutaAEliminar.cantidad --;
    } else {

        carritoFrutas.splice(indice, 1);
    }
    localStorage.setItem("indice", `${guardarCarrito()}`);
    mostrarCarrito();
}

// Ejercicio 6

/*
    Inicializa un indice en 0
    Guarda en localStorage los objetos fruta en JSON con un indice
    Retorna el ultimo indice para indicar el tamaño maximo del carrito guardado.
*/

function guardarCarrito() {
    let indice = 0;
    carritoFrutas.forEach(fruta =>{
        localStorage.setItem(`fruta${indice}`, JSON.stringify(fruta));
        indice ++;
    });
    return indice;
    
}

/*
    Con la cantidad de productos guardados hace un bucle donde guarda en la lista del carrito los objetos fruta que habian sido guardados.
    Muestra el carrito al finalizar.
*/

function escribirCarrito() {
    indice = parseInt(localStorage.getItem("indice"));
    for (let i = 0; i < indice; i++) {
        
        carritoFrutas.push(JSON.parse(localStorage.getItem(`fruta${i}`)));
        
    }
    mostrarCarrito();
}

// Ejercicio 7 

/*
    Imprime en el header la cantidad de productos que hay en el carrito.
*/

function cantProductosEnCarritoHeader() {
    cantCarrito.innerHTML = `
        <p>Carrito ${carritoFrutas.length} productos</p>
    `;
    
}

/*
    Recorre toda la lista del carrito sumando los valores y la imprime.
*/

function mostrarValorTotal() {
    valorTotal.innerHTML = `
        <p>Valor total ${carritoFrutas.reduce((acum, fruta) => acum += fruta.precio, 0)}</p>
    `;
}

// Ejercicio 8

function ordenarXPrecio() {
    console.log("Ordenando precio");
    
    const frutasXPrecio = frutas.sort((pri, seg) => pri.precio > seg.precio);
    mostrarCatalogoFrutas(frutasXPrecio);
}
function ordenarXNombre() {
    console.log("Ordenando nombres");
    const frutasXNombre = frutas.sort((pri, seg) => pri.nombre > seg.nombre);
    mostrarCatalogoFrutas(frutasXNombre);
}

// Ejercicio 9
// localStorage.clear()
function vaciarCarrito() {
    console.log("Vaciadno");
    
    carritoFrutas.length = 0;
    localStorage.setItem("indice", `${guardarCarrito()}`);
    mostrarCarrito();
}

// Ejercicio 10

function init() {
    imprimirDatosAlumno(alumno);
    mostrarCatalogoFrutas(frutas);
    filtrarProductos();
    escribirCarrito();
    cantProductosEnCarritoHeader();
}

init();
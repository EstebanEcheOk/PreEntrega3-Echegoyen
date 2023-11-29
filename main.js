const productos = [
    { nombre: "Remera lisa", precio: 10000, cantidad: 10 },
    { nombre: "Remera con estampado de la marca", precio: 12000, cantidad: 15 },
    { nombre: "Remera oversize estampado", precio: 15000, cantidad: 20 },
    { nombre: "Remera premium", precio: 20000, cantidad: 5 },
    { nombre: "Pantalon largo jean básico", precio: 30000, cantidad: 10 },
    { nombre: "Pantalon largo gabardina", precio: 30000, cantidad: 12 },
    { nombre: "Pantalon largo jean premium", precio: 30000, cantidad: 5 },
    { nombre: "Pantalon corto jean", precio: 20000, cantidad: 15 },
    { nombre: "Pantalon corto gabardina", precio: 22000, cantidad: 10 },
    { nombre: "Pantalon corto jean premium", precio: 30000, cantidad: 6 },
    { nombre: "Buzo con capucha liso", precio: 25000, cantidad: 25 },
    { nombre: "Buzo con capucha logo grande de la marca", precio: 30000, cantidad: 15 },
    { nombre: "Buzo premium con estampado y detalles en cuero", precio: 35000, cantidad: 10 },
    { nombre: "Campera jean", precio: 35000, cantidad: 20 },
    { nombre: "Campera gamuza", precio: 40000, cantidad: 15 },
    { nombre: "Campera cuero sintetico", precio: 40000, cantidad: 20 },
    { nombre: "Campera cuero de vaca", precio: 100000, cantidad: 5 },

];


let carritoDeCompras = [];

const outputDiv = document.getElementById('output');

const btnMostrarProductos = document.getElementById('mostrarProductos');
const btnMostrarCarrito = document.getElementById('mostrarCarrito');
const btnAgregarAlCarrito = document.getElementById('agregarAlCarrito');
const btnVaciarCarrito = document.getElementById('vaciarCarrito');
const btnCalcularTotalCarrito = document.getElementById('calcularTotalCarrito');

btnMostrarProductos.addEventListener('click', mostrarProductos);
btnMostrarCarrito.addEventListener('click', mostrarCarrito);
btnAgregarAlCarrito.addEventListener('click', agregarAlCarrito);
btnVaciarCarrito.addEventListener('click', vaciarCarrito);
btnCalcularTotalCarrito.addEventListener('click', calcularTotalCarrito);

function mostrarProductos() {
    let output = "Lista de productos disponibles:<br>";
    productos.forEach((producto, index) => {
        output += `${index + 1}. ${producto.nombre} - Precio: $${producto.precio} - Stock: ${producto.cantidad}<br>`;
    });
    outputDiv.innerHTML = output;
}

function agregarAlCarrito() {
    const productoIndex = parseInt(prompt("Ingrese el número del producto que desea agregar al carrito:")) - 1;

    if (productoIndex >= 0 && productoIndex < productos.length) {
        const producto = productos[productoIndex];
        let cantidad;

        do {
            cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar:"));
            if (isNaN(cantidad) || cantidad <= 0 || cantidad > producto.cantidad) {
                console.clear();
                console.log("La cantidad ingresada no es válida o excede el stock disponible.");
            }
        } while (isNaN(cantidad) || cantidad <= 0 || cantidad > producto.cantidad);

        carritoDeCompras.push({ ...producto, cantidad: cantidad });
        producto.cantidad -= cantidad;

        outputDiv.innerHTML = `Se han agregado ${cantidad} ${producto.nombre} al carrito.`;

        localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));
    } else {
        outputDiv.innerHTML = "El producto seleccionado no es válido.";
    }
}

function mostrarCarrito() {
    let output = "Contenido del carrito de compras:<br>";
    carritoDeCompras.forEach((producto, index) => {
        output += `${index + 1}. ${producto.nombre} - Precio: $${producto.precio} - Cantidad: ${producto.cantidad}<br>`;
    });
    outputDiv.innerHTML = output;
}

function vaciarCarrito() {
    carritoDeCompras = [];
    localStorage.removeItem('carritoDeCompras');
    outputDiv.innerHTML = "El carrito de compras se ha vaciado.";
}

function calcularTotalCarrito() {
    const total = carritoDeCompras.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    let descuento = 0;

    let output = "Resumen del carrito de compras:<br>";

    carritoDeCompras.forEach((producto, index) => {
        output += `${index + 1}. ${producto.nombre} - Precio: $${producto.precio} - Cantidad: ${producto.cantidad}<br>`;
    });

    output += `Total del carrito de compras: $${total}<br>`;

    if (total > 100000) {
        descuento = total * 0.10;
        output += `Descuento del 10% aplicado: $${descuento}<br>`;
    }

    const totalConDescuento = total - descuento;
    output += `Total con descuento: $${totalConDescuento}`;

    outputDiv.innerHTML = output;
}
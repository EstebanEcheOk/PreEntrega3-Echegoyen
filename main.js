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

const carritoDeCompras = [];

function mostrarProductos() {
    console.clear();
    console.log("Lista de productos disponibles:");
    productos.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.nombre} - Precio: $${producto.precio} - Stock: ${producto.cantidad}`);
    });
}

function agregarAlCarrito() {
    const productoIndex = parseInt(prompt("Ingrese el número del producto que desea agregar al carrito:")) - 1;

    if (productoIndex >= 0 && productoIndex < productos.length) {
        const producto = productos[productoIndex];
        let cantidad;

        do {
            cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar:"));
            if (cantidad <= 0) {
                console.clear();
                console.log("La cantidad ingresada no es válida. Debe ser mayor que 0.");
            } else if (producto.cantidad < cantidad) {
                console.clear();
                console.log(`No hay suficiente stock de ${producto.nombre}. Stock disponible: ${producto.cantidad}`);
            }
        } while (cantidad <= 0 || producto.cantidad < cantidad);

        carritoDeCompras.push({ ...producto, cantidad: cantidad });
        producto.cantidad -= cantidad;
        console.clear();
        console.log(`Se han agregado ${cantidad} ${producto.nombre} al carrito.`);
    } else {
        console.clear();
        console.log("El producto seleccionado no es válido.");
    }
}



function mostrarCarrito() {
    console.clear();
    console.log("Contenido del carrito de compras:");
    carritoDeCompras.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.nombre} - Precio: $${producto.precio} - Cantidad: ${producto.cantidad}`);
    });
}

function vaciarCarrito() {
    carritoDeCompras.length = 0; 
    console.clear();
    console.log("El carrito de compras se ha vaciado.");
}

function calcularTotalCarrito() {
    const total = carritoDeCompras.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    console.clear();
    console.log(`Total del carrito de compras: $${total}`);
}
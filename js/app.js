
// Arreglo de carrito de compras inicial
const cart = [];

// Contador de items carrito
let cartCounter = 0; 


const storedLocally = JSON.parse(localStorage.getItem("carrito"));
if (storedLocally != null) {
    for (const local of storedLocally) {
        cart.push(local);
    }
}

// Clase Cart para armar los objetos dentro del carrito de compras
class Cart {
    constructor(cartId, name, description, source, price, amount) {
        this.cartId = cartId
        this.name = name
        this.description = description
        this.source = source
        this.price = price
        this.amount = amount
    }
}

// Recibe un producto como parametro y retorna su equivalente en HTML en formato cadena de texto => listado de productos
const productsHTML = (product) => {
    return `
        <section class="producto">
            <img src="../img/products/${product.source}" alt="foto de producto">
            <div class="productoCard">
                <div class="drow">
                    <div class="productoTitulo">
                        <h3>${product.name}</h3>
                        <h4>$${product.price}</h4>
                    </div>
                    <div>
                        <input type="number" class="contador" name="amount" id="amount-${product.id}" min="1" max="100" step="1">
                    </div>
                </div>
                <hr>
                <p>${product.description}</p>
                <div class="productoBotones">
                    <button id="product-btn-${product.id}" class="botones">Agregar al carrito</button>
                </div>
            </div>
        </section>`
}

// Recibe un producto como parametro y retorna su equivalente en HTML en formato cadena de texto => carrito de compras
const cartHTML = (product) => {
    return `
    <section class="producto">
        <img src="../img/products/${product.source}" alt="foto de producto">
        <div class="productoCard">
            <div class="drow">
                <div class="productoTitulo">
                    <h3>${product.name}</h3>
                    <h4 class="precioCarrito">${product.amount} x <span>$${product.price}</span></h4>
                </div>
                <div>
                    <a class="botones comprar">Comprar</a>
                </div>
            </div>
        </div>
    </section>`
}

// Recorre cada elemento dentro del carrito de compras para asignarle un evento a cada boton de eliminar
const buttonCart = () => {
    const counterSelector = document.getElementById('counter');
    cart.forEach(product => {
        let cartButtonSelector = document.getElementById(`delete-btn-${product.cartId}`);
        cartButtonSelector.addEventListener("click", () => {
            const index = cart.findIndex((el) => el.cartId == product.cartId);
            cart.splice(index, 1);
            cartCounter--;
            counterSelector.innerHTML = cartCounter;
            showCart();
        });
    });
} /* Deshabilitado temporalmente */

// Añade los eventos correspondientes para cada boton, incrementa el contador de productos y los añade al menu lateral
const buttonProducts = () => {

    const counterSelector = document.getElementById('counter'); /* span contador */
    const cartIconSelector = document.getElementById('cartIcon'); /* icono carrito de compras */

    products.forEach(product => {

        let buttonSelector = document.getElementById(`product-btn-${product.id}`);

        buttonSelector.addEventListener("click", () => {

            let productAmountSelector = document.getElementById(`amount-${product.id}`).valueAsNumber;

            if (productAmountSelector > 0) {
                cartIconSelector.classList.add("animate__headShake");
                cart.push(new Cart(
                    cartCounter,
                    product.name,
                    product.description,
                    product.source,
                    product.price,
                    productAmountSelector
                ));
                // console.log(cart);
                localSave("carrito", JSON.stringify(cart));

                cartCounter++; /* incremento de los items del carrito */
                counterSelector.innerHTML = cartCounter; /* Renderiza los items del carrito en un span */

                Swal.fire({
                    /* Modal custom de la libreria sweetalert */
                    title: 'Producto añadido con éxito al carrito',
                    icon: 'success',
                    showCloseButton: true,
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonColor: '#98ab42',
                    cancelButtonColor: '#151D1B',
                    confirmButtonText: '<a href="./carrito-compras.html" class="mostrarCarrito"><i class="fas fa-shopping-cart"></i> Ver carrito</a>',
                    cancelButtonText: 'Seguir comprando',
                });
                showCart();
            } else {

                Swal.fire({
                    /* Modal custom de la libreria sweetalert */
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La cantidad seleccionada no es correcta!'
                });
            }

        });

    });

}

// Recorre el carrito de compras y lo muestra en el menu lateral
const showCart = () => {
    const cartList = document.getElementById('cartList');
    const subTotalSelector = document.getElementById('subTotal');

    // const storedLocally = JSON.parse(localStorage.getItem("carrito"));
    // console.log(storedLocally);

    let cartToHtml = "";
    let priceTotal = 0;
    cart.forEach(product => {

        priceTotal += (product.price * product.amount);
        cartToHtml += cartHTML(product);

    });
    subTotalSelector.innerHTML = `$${priceTotal}`;
    cartList.innerHTML = cartToHtml;
    // buttonCart();
}

// Recorre la lista de productos y los muestra en la lista de cards
const showProducts = () => {
    const productsSelector = document.getElementById('products');
    let productsToHtml = ""

    products.forEach(product => {
        productsToHtml += productsHTML(product);
    });
    productsSelector.innerHTML = productsToHtml;
    buttonProducts();
}

// Guarda en localStorage
const localSave = (key, value) => {
    localStorage.setItem(key, value);
}

// Mostramos la lista de productos en el inicio 
showProducts();
showCart()
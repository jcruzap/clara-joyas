// Arreglo de carrito de compras inicial

// const cart = [];

let cartCounter = 0; /* Contador de items carrito */
const counterSelector = document.getElementById('counter'); /* span contador */

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

    const cart = [];

    const cartIconSelector = document.getElementById('cartIcon'); /* icono carrito de compras */


    products.forEach(product => {

        let buttonSelector = document.getElementById(`product-btn-${product.id}`);

        buttonSelector.addEventListener("click", () => {
            const localGet = JSON.parse(localStorage.getItem('cart'));

            let productAmountSelector = document.getElementById(`amount-${product.id}`).valueAsNumber;
            
            if (localGet != null) {
                // console.log("no esta vacio");
                if (productAmountSelector > 0) {
                    const newCart = new Cart(
                        product.id,
                        product.name,
                        product.description,
                        product.source,
                        product.price,
                        productAmountSelector
                    );

                    const newLocalAdd = localGet.concat(newCart);
                    localSet('cart', newLocalAdd);/* guarda el array completo */
                    
                    cartCounter++; /* incremento de los items del carrito */

                    Swal.fire({
                        /* Modal custom sweetalert */
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
                        icon: 'error',
                        title: 'Oops...',
                        text: 'La cantidad seleccionada no es correcta!'
                    });
                }

            } else if (localGet === null) {
                // console.log("esta vacio");
                if (productAmountSelector > 0) {

                    cartIconSelector.classList.add("animate__headShake");
                    cart.push(new Cart(
                        product.id,
                        product.name,
                        product.description,
                        product.source,
                        product.price,
                        productAmountSelector
                    ));

                    localSet('cart', cart);
                    
                    cartCounter++; /* incremento de los items del carrito */
                    // counterSelector.innerHTML = cartCounter; /* Renderiza contador carrito */

                    Swal.fire({
                        /* Modal custom sweetalert */
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
                        icon: 'error',
                        title: 'Oops...',
                        text: 'La cantidad seleccionada no es correcta!'
                    });
                }
            }


        });

    });
}

// Recorre el carrito de compras y lo muestra en el menu lateral
const showCart = () => {
    const cartList = document.getElementById('cartList'); /* Selector lista lateral */
    const subTotalSelector = document.getElementById('subTotal'); /* Selector span subtotal */

    const ProductStoredLocally = JSON.parse(localStorage.getItem("cart")); /* localStorage parseo */

    let CounterStoredLocally = JSON.parse(localStorage.getItem("cartCounter"));
    counterSelector.innerHTML = CounterStoredLocally;
    let cartToHtml = "";
    let priceTotal = 0;

    if (ProductStoredLocally != null) {
        for (const product of ProductStoredLocally) {
            priceTotal += (product.price * product.amount);
            cartToHtml += cartHTML(product);
        }
    }

    // cart.forEach(product => {
    //     priceTotal += (product.price * product.amount);
    //     cartToHtml += cartHTML(product);
    // });

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

// Mostramos la lista de productos en el inicio 
showProducts();
showCart()
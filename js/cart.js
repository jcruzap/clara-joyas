// definicion arreglo de productos
const products = [{
        id: 1,
        name: "Isla Lustrada",
        description: "Madera maciza guayubira. Detalles de lustrado que la hacen ver unica.",
        price: 15000,
        source: "producto1.jpg"
    },
    {
        id: 2,
        name: "Desayunador c/sillas",
        description: "Pino robusto con uniones espigadas. Incluye banquetas.",
        price: 24950,
        source: "producto2.jpg"
    },
    {
        id: 3,
        name: "Vinoteca",
        description: "Ideal para almacenar esos vinos que tanto deseamos conservar.",
        price: 1000,
        source: "producto3.jpg"
    },
    {
        id: 4,
        name: "Bajo mesada",
        description: "Mueble bajo mesada con tres puertas. No incluye mesada.",
        price: 17600,
        source: "producto4.jpg"
    }
];

// Definicion arreglo correspondiente al carrito de compras
const cart = [];
let cartCounter = 0;

// Haciendo uso de clases y metodo constructor para crear el carrito 
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

// Funcion flecha que recibe como parametro uno de los productos y lo transforma a una cadena
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

// Funcion flecha que recibe como parametro uno de los productos del carrito y lo transforma a una cadena
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

// Añade los eventos a los botones del carrito de compras lateral para poder eliminarlos
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
}

// Recorre el carrito de compras y lo muestra en el menu lateral
const showCart = () => {
    const cartList = document.getElementById('cartList');
    const subTotalSelector = document.getElementById('subTotal');
    let cartToHtml = "";
    let priceTotal = 0;
    cart.forEach(product => {
        priceTotal += (product.price * product.amount);
        
        cartToHtml += cartHTML(product);
    });
    // console.log(priceTotal);
    subTotalSelector.innerHTML = `$${priceTotal}`;
    cartList.innerHTML = cartToHtml;
    // buttonCart();
}

// Añade los eventos correspondientes para cada boton, incrementa el contador de productos y los añade al menu lateral
const buttonProducts = () => {

    const counterSelector = document.getElementById('counter');
    const cartIconSelector = document.getElementById('cartIcon');

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
                console.log(cart);
                cartCounter++;
                counterSelector.innerHTML = cartCounter;
                Swal.fire({
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

        });

    });
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
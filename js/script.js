// Arreglo con productos
const products = [{
        id: 1,
        name: "Isla Lustrada",
        description: "Madera maciza guayubira. Detalles de lustrado que la hacen ver unica.",
        price: 15000,
        img: "producto1.jpg"
    },
    {
        id: 2,
        name: "Desayunador c/sillas",
        description: "Pino robusto con uniones espigadas. Incluye banquetas.",
        price: 24950,
        img: "producto2.jpg"
    },
    {
        id: 3,
        name: "Vinoteca",
        description: "Ideal para almacenar esos vinos que tanto deseamos conservar.",
        price: 1000,
        img: "producto3.jpg"
    },
    {
        id: 4,
        name: "Bajo mesada",
        description: "Mueble bajo mesada con tres puertas. No incluye mesada.",
        price: 17600,
        img: "producto4.jpg"
    }
];

// Selectores y variables globales

let cart = []; /* Arreglo inicial carrito de compras */

// Render html de productos
const productsToHtml = (product) => {
    return `
        <section class="producto">
            <img src="../img/products/${product.img}" alt="foto de producto">
            <div class="productoCard">
                <div class="drow">
                    <div class="productoTitulo">
                        <h3>${product.name}</h3>
                        <h4>$${product.price}</h4>
                    </div>
                </div>
                <hr>
                <p>${product.description}</p>
                <div class="productoBotones">
                    <button id="${product.id}" class="botones">Agregar al carrito</button>
                </div>
            </div>
        </section>`
}

// Muestra todos los productos en pantalla
const showAllProducts = () => {
    const productsContainer = document.getElementById('products'); /* Contenedor de productos */
    productsContainer.innerHTML = "";

    products.forEach(product => {
        productsContainer.innerHTML += productsToHtml(product);
    });
    eventsAddButton();
}

// Añade los EventListeners a los botones de añadir al carrito 
const eventsAddButton = () => {
    products.forEach(product => {
        let addToCartButton = document.getElementById(product.id); /* Boton añadir al carrito */
        addToCartButton.addEventListener("click", addItem);
    });
}

// Selecciona el producto para añdir al carrito
const addItem = (e) => {
    const button = e.target;
    let addButtonId = parseInt(button.getAttribute('id'));
    let cartItem;
    let cartLength = cart.length;
    products.forEach(product => {
        if (product.id === addButtonId) {
            if (cartLength) {
                for (let i = 0; i < cartLength; i++) {
                    if (cart[i].name === product.name) {
                        cart[i].amount++;
                        storageSet('cart', cart);
                        return null;
                    }
                }
            }
            cartItem = {
                cartId: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                img: product.img,
                amount: 1
            }
        }
    });
    cartItem != null ? addItemToCart(cartItem) : false
}

// Añade el producto al carrito
const addItemToCart = (cartItem) => {
    // Sweet alert custom modal
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
    cart.push(cartItem); /* Guarda en arreglo */
    storageSet("cart", cart); /* Guarda en local storage */
}

// Guardar carrito en local storage
const storageSet = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

// Al cargar la pagina obtiene el carrito de local storage y lo guarda en el arreglo
window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('cart'));
    if (storage) {
        cart = storage;
    }
}

// Llamamos a la funcion que muestra los productos en pantalla
showAllProducts();
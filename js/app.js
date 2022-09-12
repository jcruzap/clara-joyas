// Selectores y variables globales
let cart = []; /* Arreglo inicial carrito de compras */
let cartCounter = 0;
const shoppingBag = document.querySelector('.fa-shopping-bag');

// Render html de productos en la pantalla principal
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

// Render html de productos del carrito en la barra lateral
const cartToHtml = (product) => {
    return `
    <section class="producto">
        <img src="../img/products/${product.img}" alt="foto de producto">
        <div class="productoCard">
            <div class="drow">
                <div class="productoTitulo">
                    <h3>${product.name}</h3>
                    <h4 class="precioCarrito">${product.amount} x <span>$${product.price}</span></h4>
                </div>
            </div>
        </div>
    </section>`
}

// Muestra todos los productos en pantalla
const showAllProducts = async () => {
    const productsContainer = document.getElementById('products'); /* Contenedor de productos */
    productsContainer.innerHTML = ""

    /* Obtenemos los datos de los productos desde products.json utilizando fetch */
    const response = await fetch('../js/products.json')
    const data = await response.json();
    data.forEach((product) => {
        productsContainer.innerHTML += productsToHtml(product); /* Render */
    });
    eventsAddButton(data); /* Enviamos los datos por parametro */
}

// Añade los EventListeners a los botones de añadir al carrito 
const eventsAddButton = (data) => {
    data.forEach(product => {
        let addToCartButton = document.getElementById(product.id); /* Boton añadir al carrito */
        let buttonId = parseInt(addToCartButton.getAttribute('id'));
        addToCartButton.addEventListener("click", () => {
            addItem(data, buttonId);
        });
    });
}

// Selecciona el producto para añdir al carrito
const addItem = (data, buttonId) => {
    let cartItem;
    let cartLength = cart.length;
    data.forEach(product => {
        /* Seleccionamos el producto que coincida con el ID obtenido */
        if (product.id === buttonId) {
            /* 
                #Con esta logica evitamos repetir el renderizado
                de un producto en el carrito y solo incrementamos su cantidad.
                *************************************************************
                #Si el producto no se repite entonces lo sumamos al carrito
                como un nuevo item.
            */
            if (cartLength) {
                for (let i = 0; i < cartLength; i++) {
                    if (cart[i].name === product.name) {
                        cart[i].amount++;
                        storageSet('cart', cart);
                        showAllCart();
                        // Toastify custom
                        Toastify({
                            duration: 1000,
                            text: "Genial, añadiste otro producto!",
                            offset: {
                                x: 50,
                                y: 150
                            },
                            style: {
                                background: "#98ab42"
                            },
                        }).showToast();
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
    /* Solo guardamos si el item no es null */
    cartItem != null ? addItemToCart(cartItem) : false
}

// Añade el producto al carrito
const addItemToCart = (cartItem) => {
    /* Animacion del icono con carrito de compras y contador */
    const cartButton = document.querySelector('.nav-bag');
    cartButton.classList.add('animate__shakeX');

    /* Incrementa el contador de items y se guarda en local storage */
    cartCounter++;
    storageSet('cart-counter', cartCounter);
    setTimeout(() => {
        cartButton.classList.remove('animate__shakeX');
        shoppingBag.setAttribute('data-after', cartCounter);
    }, 500)
    
    // Sweet alert custom modal
    Swal.fire({
        title: 'Producto añadido con éxito!',
        html: '<button class="botones" type="button" id="closeSweet" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">Ver carrito <i class="fas fa-shopping-cart"></i></button> <button type="button" id="closeSweet" class="botones seguirComprando">Seguir comprando</button>',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        showConfirmButton: false
    });

    /* 
        #Añadimos escucha de evento click en dos botones que cierran el custom sweet alert.
        #El boton "Ver carrito" lo cierra y muestra el carrito lateral.
        #El boton "Seguir comprando" solo lo cierra para poder seguir comprando.
    */

    const closeSweet = document.querySelectorAll('#closeSweet');
    closeSweet.forEach((sw) => {
        sw.addEventListener("click" , () => {
            Swal.close();
        });
    });
    
    cart.push(cartItem); /* Guarda en arreglo */
    storageSet("cart", cart); /* Guarda en local storage */
    showAllCart();
}

// Renderiza todos los productos en el offcanvas 
const showAllCart = () => {
    const cartList = document.getElementById('cartList');
    const subTotal = document.getElementById('cartSubTotal');
    let total = 0;
    subTotal.innerHTML = "";
    cartList.innerHTML = "";
    cart.forEach(product => {
        total = total + (product.price * product.amount);
        
        cartList.innerHTML += cartToHtml(product);
    });
    subTotal.innerHTML = total;
}
// Guardar carrito en local storage
const storageSet = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

// Al cargar la pagina obtiene el carrito de local storage y lo guarda en el arreglo
window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('cart'));
    const cartCounterLocal = JSON.parse(localStorage.getItem('cart-counter'));
    if (storage) {
        cart = storage;
        cartCounter = cartCounterLocal;
    }
    shoppingBag.setAttribute('data-after', cartCounter);
    // Llamamos a la funcuon que muestra los productos en el carrito lateral
    showAllCart();
}

// Llamamos a la funcion que muestra los productos en pantalla
showAllProducts();
const products = [
    {
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
        price: 9500,
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
const cart = [];
let cartCounter = 0;
class Cart {
    constructor(cartId, name, description, price) {
        this.cartId = cartId
        this.name = name
        this.description = description
        this.price = price
    }

    // calcEndPrice() {
    //     return this.productPrice = this.productPrice * this.amount;
    // }
}

const productsHTML = (product) => {
    return`
        <section class="producto">
            <img src="../img/products/${product.source}" alt="foto de producto">
            <div class="productoCard">
                <div class="drow">
                    <div class="productoTitulo">
                        <h3>${product.name}</h3>
                        <h4>$${product.price}</h4>
                    </div>
                    <div>
                        <button class="botones comprar">Comprar</button>
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

const cartHTML = (product) => {
    return `
        <div class="card" style="width: 18rem;">
            <img src="../img/products/${product.source}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <a href="#" class="btn btn-danger">Eliminar</a>
            </div>
        </div>
    `
}
const showCart = () => {
    const cartIconSelector = document.getElementById('cart');
    const cartMenuSelector = document.getElementById('cartSide');
    const closeMenuSelector = document.getElementById('closeBtn');
    cartIconSelector.addEventListener("click", () => {
        console.log(cartMenuSelector.classList);
        cartMenuSelector.classList.add("menuOpen"); 
    });
    closeMenuSelector.addEventListener("click", () => {
        cartMenuSelector.classList.remove("menuOpen");
    });
}
const buttonProducts = () => {
    const counterSelector = document.getElementById('counter');
    products.forEach(product =>{
        buttonSelector = document.getElementById(`product-btn-${product.id}`);
        buttonSelector.addEventListener("click", () => {
            cart.push (new Cart(cartCounter,product.name,product.description,product.price));
            cartCounter ++;
            counterSelector.innerHTML= cartCounter; 
        });
    });   
}
const showProducts = () => {
    const productsSelector = document.getElementById('products');
    let productsToHtml = ""

    products.forEach(product => {
        productsToHtml += productsHTML(product);
    });
    productsSelector.innerHTML = productsToHtml;
    buttonProducts();
    
}
showCart();
showProducts();





// let option = prompt("¿Desea comprar algun producto? * Si * o * No *").toLowerCase();


// while (option != "si" && option != "no") {
// alert("La opcion ingresada no es valida");
// option = prompt("¿Desea comprar algun producto?")
// }

// if (option == "si") {
// alert("Estos son nuestros productos disponibles:");
// let productList = products.map((product) => "Codigo: " + product.code + " " + product.name + " " + product.price + "$");
// alert(productList.join(' | '));

// } else if (option == "no") {
// alert("Gracias vuelva prontos!");
// }


// while (option != "no") {
// let product = parseInt(prompt("Para agregar un producto al carrito coloque su codigo aqui"));
// let amount = parseInt(prompt("¿Cuantas unidades desea llevar?"));
// if (product >= 0 && amount > 0) {
//     products.forEach((prod) => {
//         if (prod.code == product && amount <= prod.stock) {
//             cart.push(new Cart(prod.code, amount, prod.price, prod.name));
//             prod.stock = prod.stock - amount;
//         }
//     });
// }
// option = prompt("¿Desea añadir otro producto? * Si * o * No *").toLowerCase();
// }
// if (cart != "") {
// alert("*** Este es su carrito de compras ***");
// for (const c of cart) {
//     c.calcEndPrice();
// }
// let cartList = cart.map((cartItem) => `${cartItem.amount} ${cartItem.productName} , El precio final es un total de ${cartItem.productPrice}$`);
// alert(cartList.join('  ---  '));
// }
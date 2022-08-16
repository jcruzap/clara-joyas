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
    constructor(cartId, name, description, source, price) {
        this.cartId = cartId
        this.name = name
        this.description = description
        this.source = source
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
// const buttonCart = () => {

//     cart.forEach(product => {
         
//     });
// }
const cartIconSelector = document.getElementById('cart');
    const cartMenuSelector = document.getElementById('cartSide');
    const closeMenuSelector = document.getElementById('closeBtn');

    cartIconSelector.addEventListener("click", () => {
        cartMenuSelector.classList.add("menuOpen"); 
    });

    closeMenuSelector.addEventListener("click", () => {
        cartMenuSelector.classList.remove("menuOpen");
    });
const showCart = () => {
    const cartList = document.getElementById('cartListSide');

    let cartToHtml = "";
    cart.forEach(product => {
        cartToHtml += cartHTML(product);
    });
    cartList.innerHTML = cartToHtml; 
    
}
const buttonProducts = () => {
    
    const counterSelector = document.getElementById('counter');
    products.forEach(product =>{
        let buttonSelector = document.getElementById(`product-btn-${product.id}`);
        buttonSelector.addEventListener("click", () => {
            cart.push (new Cart(cartCounter,product.name,product.description,product.source,product.price));
            cartCounter ++;
            counterSelector.innerHTML= cartCounter;
            showCart();
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

showProducts();

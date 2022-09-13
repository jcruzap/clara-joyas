// Al cargar la pagina obtiene los items del carrito de local storage y lo renderiza en el nav 
const cartCounterLocal = JSON.parse(localStorage.getItem('cart-counter'));
const shoppingBag = document.querySelector('.fa-shopping-bag');
if (cartCounterLocal) {
    let cartCounter = cartCounterLocal;
    shoppingBag.setAttribute('data-after', cartCounter);
}
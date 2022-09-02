// Consulta a localStorage
const cartStorageGet = JSON.parse(localStorage.getItem("cart"));
let cartCounterLocal = JSON.parse(localStorage.getItem('cart-counter'));


// Render html de productos del carrito de compras
const cartToHtml = (product) => {
    return `
    <tr>
        <td>
            <img src="../img/products/${product.img}" alt="Imagen de producto">
            <div>
                <h5>${product.name}</h5>
                <p>${product.description}</p>
            </div>
        </td>
        <td>
            $${product.price}
        </td>
        <td>
            <input type="number" name="amount" id="amount-${product.cartId}" min="1" max="100" step="1" value="${product.amount}">
            <div class="stepper-input">
                <input type="range" min="0" max="100" value="0">
                <div class="input">
                    <button class="minus-btn">-</button>
                    <div class="range">
                            <div class="list">
                            </div>
                    </div>
                    <button class="plus-btn">+</button>
                </div>
            </div>
        </td>
        <td>
            $${product.price * product.amount}
        </td>
        <td>
            <button class="btn btn-danger" id="${product.cartId}">Eliminar</button>
        </td>
    </tr>
    `
}

// Muestra todos los productos del carrito de compras en pantalla
const showAllCart = () => {
    const shoppingBag = document.querySelector('.fa-shopping-bag');
    shoppingBag.setAttribute('data-after', cartCounterLocal);

    const table = document.getElementById('tableBody'); /* Contenedor de la tabla de productos */

    table.innerHTML = "";

    if (cartStorageGet != null) {
        cartStorageGet.forEach(product => {
            table.innerHTML += cartToHtml(product);
        });
        eventsDeleteButton();
    } else {
        table.innerHTML = "<h5>Su carrito esta vacio</h5>"
    }

}

// Añade los EventListeners a los botones de eliminar del carrito 
const eventsDeleteButton = () => {
    cartStorageGet.forEach(product => {
        let removeButton = document.getElementById(product.cartId);
        removeButton.addEventListener("click", removeItem);
    });
}

// Eliminar el producto del carrito
const removeItem = (e) => {
    const removeButtonId = parseInt(e.target.id); /* Obtengo el id del boton clickeado */
    let dataIndex;

    cartStorageGet.forEach((product, index) => {
        // Sweet Alert custom modal con validacion de resultado
        Swal.fire({
            title: 'Esta seguro?',
            text: "Esta accion eliminar un producto del carrito!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                if (removeButtonId === product.cartId) {
                    dataIndex = index;
                }
                cartStorageGet.splice(dataIndex, 1); /* Elimina del arreglo */
                localStorage.setItem("cart", JSON.stringify(cartStorageGet)); /* Guarda nuevamente en local storage */
                cartCounterLocal--;
                localStorage.setItem("cart-counter", JSON.stringify(cartCounterLocal));
                showAllCart(); /* Muestra el nuevo carrito en pantalla */
            }
        });
    });

}


// Llamamos a la funcion que muestro los productos en pantalla
showAllCart();
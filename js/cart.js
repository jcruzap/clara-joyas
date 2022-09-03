// Consulta a localStorage
const cartStorageGet = JSON.parse(localStorage.getItem("cart"));
let cartCounterLocal = JSON.parse(localStorage.getItem('cart-counter'));
// <input type="number" name="amount" min="1" max="100" step="1" value="${product.amount}">

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
            <div class="stepper-input">
                <input type="range" min="0" max="100" value="${product.amount}" id="stepper-${product.cartId}">
                <div class="input">
                    <button class="minus-btn" id="minus-${product.cartId}">-</button>
                    <div class="range">
                            <div class="list" id="stepper-list-${product.cartId}">   
                            </div>
                    </div>
                    <button class="plus-btn" id="plus-${product.cartId}">+</button>
                </div>
            </div>
        </td>
        <td id="price" class="animate__animated">
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

    if (cartStorageGet) {
        cartStorageGet.forEach(product => {
            table.innerHTML += cartToHtml(product);

        });
        eventsStepper();
        eventsDeleteButton(); /* Eventos para eliminar producto */
    }
    if (cartStorageGet === null || cartStorageGet.length === 0) {
        shoppingBag.setAttribute('data-after', 0);
        table.innerHTML = "<h5>Su carrito esta vacio</h5>";
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
const eventsStepper = () => {
    cartStorageGet.forEach(product => {
        
        /* *********************************************
            Conjunto de atributos del contador stepper
           ********************************************* */

        let stepper = document.getElementById(`stepper-${product.cartId}`);
        let stepperMin = parseInt(stepper.getAttribute("min"));
        let stepperMax = parseInt(stepper.getAttribute("max"));
        let productAmountList = document.getElementById(`stepper-list-${product.cartId}`);
        let minus = document.getElementById(`minus-${product.cartId}`);
        let plus = document.getElementById(`plus-${product.cartId}`);

        /* *********************************************
           ********************************************* */
         
        let price = document.getElementById('price'); /* Columna de precio */

        for (let i = 0; i <= stepperMax; i++) {
            productAmountList.innerHTML += `<span>${i}</span>`
        }
        productAmountList.style.marginTop = `-${stepper.value * 40}px`;
        productAmountList.style.transition = `all 300ms ease-in-out`;

        /* Descuenta 1 al contador */
        /* Actualiza en localstorage */
        minus.addEventListener("click", () => {
            let value = parseInt(stepper.getAttribute("value"));
            if (value != stepperMin) {
                value--;
                stepper.setAttribute("value", value);
                price.innerHTML = ""
                price.innerHTML += `$${product.price * value}`
                price.classList.add('animate__fadeIn');
                setTimeout(() => {
                    price.classList.remove('animate__fadeIn');
                }, 500);
                product.amount = value
                localStorage.setItem("cart", JSON.stringify(cartStorageGet));
                productAmountList.style.marginTop = `-${value * 40}px`;
            }
        });

        /* Incrementa 1 al contador */
        /* Actualiza tambien en localstorage */
        plus.addEventListener("click", () => {
            let value = parseInt(stepper.getAttribute("value"));
            if (value != stepperMax) {
                value++;
                stepper.setAttribute("value", value);
                price.innerHTML = ""
                price.innerHTML += `$${product.price * value}`
                price.classList.add('animate__fadeIn');
                setTimeout(() => {
                    price.classList.remove('animate__fadeIn');
                }, 500);
                product.amount = value
                localStorage.setItem("cart", JSON.stringify(cartStorageGet));
                productAmountList.style.marginTop = `-${value * 40}px`;
            }
        });
    });
}
// Llamamos a la funcion que muestro los productos en pantalla
showAllCart();
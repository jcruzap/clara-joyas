// Consulta a localStorage
const cartStorageGet = JSON.parse(localStorage.getItem("cart"));
let cartCounterLocal = JSON.parse(localStorage.getItem('cart-counter'));

// Retorna el valor de un numero convertido en un formato diferente dependiendo de los parametros que le coloquemos
const digitsConvert = (number) =>{
    return number.toLocaleString('en-US',{maximumFractionDigits:2});
}

// Render html de productos del carrito de compras
const cartToHtml = (product) => {
    return `
    <tr>
        <td>
            <button class="btn btn-danger" id="${product.cartId}"><i class="fas fa-times"></i></i></button>
        </td>
        <td>
            <img src="../img/products/${product.img}" alt="Imagen de producto">
        </td>
        <td>
            <div class="carritoDescripcion">
                <h5>${product.name}</h5>
                <p>${product.description}</p>
            </div>
        </td>
        <td class="precios">
            $${digitsConvert(product.price)}
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
        <td id="price-${product.cartId}" class="precios animate__animated">
            $${digitsConvert(product.price * product.amount)}
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
            // subTotal = subTotal + (product.price * product.amount);
            table.innerHTML += cartToHtml(product);
        });
        // finalTotalCart(subTotal);
        calcSubTotal();
        eventsStepper();
        eventsDeleteButton();
    }
    if (cartStorageGet === null || cartStorageGet.length === 0) {
        shoppingBag.setAttribute('data-after', 0);
        table.innerHTML = `<tr><td style ="width: 15%;"><h5>Su carrito esta vacío</h5></td></tr>`;
    }
}

// Añade los EventListeners a los botones de eliminar del carrito 
const eventsDeleteButton = () => {
    cartStorageGet.forEach(product => {
        let removeButton = document.getElementById(`${product.cartId}`);
        let deleteId = parseInt(removeButton.getAttribute('id'));
        removeButton.addEventListener("click", () => {
            /* Custom modal sweet alert */
            Swal.fire({
                title: 'Esta seguro?',
                text: "Esta accion eliminará un producto del carrito.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    removeItem(deleteId);
                }
            });
            
        });
    });
}

// Eliminar el producto del carrito
const removeItem = (id) => {
    let dataIndex; /* almacena index a eliminar */
    cartStorageGet.forEach((product, index) => {
        // Busca el producto en la lista que corresponda con el id obtenido
        if (id === product.cartId) {
            dataIndex = index;
            cartStorageGet.splice(dataIndex, 1); /* Elimina del arreglo */
            localStorage.setItem("cart", JSON.stringify(cartStorageGet)); /* Guarda nuevamente en local storage */
            cartCounterLocal--;
            localStorage.setItem("cart-counter", JSON.stringify(cartCounterLocal));
        }
    });
    showAllCart(); /* Muestra el nuevo carrito en pantalla */

}

// Contador que aumenta o disminuye la cantidad de productos de 1 en 1
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

        let price = document.getElementById(`price-${product.cartId}`); /* Columna de precio */

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
                price.innerHTML += `$${digitsConvert(product.price * value)}`
                
                price.classList.add('animate__fadeIn');
                setTimeout(() => {
                    price.classList.remove('animate__fadeIn');
                }, 500);
                product.amount = value
                localStorage.setItem("cart", JSON.stringify(cartStorageGet));
                productAmountList.style.marginTop = `-${value * 40}px`;
                calcSubTotal();
            }
            if (value === 0) {
                /* Custom modal sweet alert */
                Swal.fire({
                    title: 'Esta seguro?',
                    text: "Esta accion eliminará un producto del carrito.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, eliminar!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        removeItem(product.cartId);
                    } else {
                        product.amount = 1
                        localStorage.setItem("cart", JSON.stringify(cartStorageGet));
                        showAllCart();
                        calcSubTotal();
                    }
                });

            }
        });

        /* Incrementa 1 al contador */
        /* Actualiza tambien en localstorage */
        plus.addEventListener("click", () => {
            let value = parseInt(stepper.getAttribute("value"));
            if (value != stepperMax) {
                value++;
                stepper.setAttribute("value", value);
                price.classList.add('animate__fadeIn');
                
                setTimeout(() => {
                    price.classList.remove('animate__fadeIn');
                }, 500);
                price.innerHTML = ""
                price.innerHTML += `$${digitsConvert(product.price * value)}`
                product.amount = value
                localStorage.setItem("cart", JSON.stringify(cartStorageGet));
                productAmountList.style.marginTop = `-${value * 40}px`;
                calcSubTotal();
            }
        });
    });
}
const calcSubTotal = () =>{
    let subTotal = 0;
    if (cartStorageGet) {
        cartStorageGet.forEach(product => {
            subTotal = subTotal + (product.price * product.amount);
        });
        finalTotalCart(subTotal);  
    }
}
// Total del carrito
const finalTotalCart = (subtotal) =>{
    const finalSubtotal = document.getElementById('finalSubtotal');
    const finalTotal = document.getElementById('finalTotal');
    finalSubtotal.innerHTML = ""
    finalTotal.innerHTML = ""
    /* Renderizado de subtotal y total */
    finalSubtotal.innerHTML = `$${digitsConvert(subtotal)}`;
    finalTotal.innerHTML = `$${digitsConvert(subtotal)}`;
}

// Llamamos a la funcion que muestro los productos en pantalla
showAllCart();
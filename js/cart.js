// Consulta a localStorage
const cartStorageGet = JSON.parse(localStorage.getItem("cart"));

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
            <input type="number" id="contador" name="amount" id="" min="1" max="100" step="1" value="${product.amount}">
        </td>
        <td>
            $${product.price}
        </td>
        <td>
            <button class="btn btn-danger" id="${product.cartId}">Eliminar</button>
        </td>
    </tr>
    `
}

// Muestra todos los productos del carrito de compras en pantalla
const showAllCart = () => {
    const table = document.getElementById('tableBody'); /* Contenedor de la tabla de productos */

    table.innerHTML = "";

    if (cartStorageGet) {
        cartStorageGet.forEach(product => {
            table.innerHTML += cartToHtml(product);
        });
        eventsDeleteButton();
    }else{
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
                showAllCart(); /* Muestra el nuevo carrito en pantalla */
            }
        });
    });

}

// Llamamos a la funcion que muestro los productos en pantalla
showAllCart();
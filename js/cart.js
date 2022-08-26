// Consulta a localStorage
const cartLocallySaved = JSON.parse(localStorage.getItem("cart"));

// Eliminar productos del carrito
const deleteProduct = () => {
    for (const product of cartLocallySaved) {
        let deleteButton = document.getElementById(`delete-${product.cartId}`);
        deleteButton.addEventListener("click", () => {
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
                    const index = cartLocallySaved.findIndex((el) => el.cartId == product.cartId);
                    console.log(index);
                    // const localAfterDelete =  cartLocallySaved.splice(index, 1);
                    // localSave("cart", JSON.stringify(localAfterDelete));
                    // localStorage.setItem("cart", JSON.stringify(localAfterDelete));
                    // showFinalCart();
                    /* Swal.fire(
                        'Elmininado!',
                        'Su producto fue retirado del carrito.',
                        'success'
                    ) */
                }
            })

        })
    }
}
// Render carrito
const showFinalCart = () => {
    const tableSelector = document.getElementById('tableBody');
    let cartString = "";

    for (const product of cartLocallySaved) {
        cartString += cartToHtml(product);
    }
    tableSelector.innerHTML = cartString
    deleteProduct();
}

// Carrito a html
const cartToHtml = (product) => {
    return `
    <tr>
        <td>
            <img src="../img/products/${product.source}" alt="Imagen de producto">
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
            <button class="btn btn-danger" id="delete-${product.cartId}"><i class="fas fa-trash-alt"></i></button>
        </td>
    </tr>
    `
}

showFinalCart();
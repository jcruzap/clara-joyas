// Consulta a localStorage
const cartLocallySaved = JSON.parse(localStorage.getItem("cart"));

// Render carrito
const showFinalCart = () => {
    const tableSelector = document.getElementById('tableBody');
    let cartString = "";

    for(const product of cartLocallySaved){
        cartString += cartToHtml(product);
    }
    tableSelector.innerHTML = cartString
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
            <button class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
        </td>
    </tr>
    `
}

showFinalCart();
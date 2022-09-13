/* Informacion obtenida de email JS */
const emailjs_data = {
    SERVICE_ID: "service_nzwa1y5",
    TEMPLATE_ID: "template_4xiqyc9",
    PUBLIC_KEY: "PRk_FspI8BLnJ9cwl",
    API_URL: 'https://api.emailjs.com/api/v1.0/email/send'
}
/* Desestructuración de emailjs_data */
const {
    SERVICE_ID: serviceID,
    TEMPLATE_ID: templateID,
    PUBLIC_KEY: userID,
    API_URL: url
} = emailjs_data

/* Form */
const form = document.getElementById('form');
/* Inputs del form */
const firstName = document.getElementById('name');
const lastName = document.getElementById('last_name');
const email = document.getElementById('email');
const message = document.getElementById('message');

/* Añadimos el evento submit */
form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateInputs();
});

/* Seteamos los errores que se muestran en un alert de bootstrap */
const setErrorMessages = (errors) => {
    const errorDisplay = document.getElementById('alert');
    errorDisplay.innerHTML = ""
    errorDisplay.classList.remove('hidden');
    errors.forEach(err => {
        errorDisplay.innerHTML += `<li class="errors"><i class="fas fa-exclamation-circle"></i> ${err}</li>`
    });
}

/* 
    Chequeamos si el email es valido
    utilizando expresiones regulares.
*/
const isInvalidEmail = (email) => {
    const regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    return regExp.test(String(email).toLowerCase());
}

/* Validacion de campos  */
const validateInputs = () => {
    let errors = []
    let firstNameValue = firstName.value.trim();
    let lastNameValue = lastName.value.trim();
    let emailValue = email.value.trim();
    let messageValue = message.value.trim();

    if (firstNameValue === '') {
        errors.push('Tu Nombre es obligatorio');
    } else if (firstNameValue.length < 3) {
        errors.push('Tu Nombre debe contener al menos 3 caracteres');
    }
    if (lastNameValue === '') {
        errors.push('Tu Apellido es obligatorio');
    } else if (lastNameValue.length < 3) {
        errors.push('Tu Apellido debe contener al menos 3 caracteres');
    }
    if (emailValue === '') {
        errors.push('Tu Email es obligatorio');
    } else if (!isInvalidEmail(emailValue)) {
        errors.push('Email invalido');
    }
    if (messageValue === '') {
        errors.push('Debes completar un mensaje');
    } else if (messageValue.length < 25) {
        errors.push('Tu mensaje debe contener al menos 25 caracteres');
    }
    if (errors.length != 0) {
        /* Guarda los errores */
        setErrorMessages(errors);
    } else if (errors.length === 0) {
        /* Si no existen errores envia el mail */
        sendEmail(firstNameValue, lastNameValue, emailValue, messageValue);
        /* Vaciamos los campos */
        firstName.value = ""
        lastName.value = ""
        email.value = ""
        message.value = ""
    }
}


const sendEmail = (name, last, email, message) => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Mensaje enviado con éxito!',
        html: '<p><strong>Su consulta sera respondida a la brevedad</strong></p>',
        showConfirmButton: false,
        timer: 1500
    });
    const sendData = {
        service_id: serviceID,
        template_id: templateID,
        user_id: userID,
        template_params: {
            name: name,
            last: last,
            from_email: email,
            reason: "Motivo de consulta",
            message: message
        },

    }
    fetch(url, {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            }
        })
        .then((response) => response)
        .then((json) => console.log(`Correo enviado... status: ${json.status}`))
        .catch((error) => console.log(`El correo no se pudo enviar. Error: ${error}`));
}

// let select = document.getElementById('reason-select');
// select.addEventListener('change', () => {
//     let value = select.options[select.selectedIndex].textContent;
//     console.log(value);
// });
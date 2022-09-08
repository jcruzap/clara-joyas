const emailjs_data = {
    SERVICE_ID: "service_nzwa1y5",
    TEMPLATE_ID: "template_4xiqyc9",
    PUBLIC_KEY: "PRk_FspI8BLnJ9cwl",
    API_URL: 'https://api.emailjs.com/api/v1.0/email/send'
}
const {
    SERVICE_ID: serviceID,
    TEMPLATE_ID: templateID,
    PUBLIC_KEY: userID,
    API_URL: url
} = emailjs_data

/* Datos ingresados en el formulario */
let firstName = document.getElementById('name');
let last = document.getElementById('last_name');
let email = document.getElementById('email');
let reason = document.getElementById('reason');
let message = document.getElementById('message');

const form = document.getElementById('form'); /* captura del formulario */

let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

/* Añadimos el evento submit */
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (firstName.value == "" || last.value == "" || email.value == "" || message.value == "") {
        
    } else {
        sendEmail(firstName.value, last.value, email.value, message.value);
    }  
})

const sendEmail = (name, last, email, message) => {
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
    fetch(url,{
        method: 'POST',
        body: JSON.stringify(sendData),
        headers: {"Content-type": "application/json;charset=UTF-8"}
    })
    .then((response) => response)
    .then((json) => console.log(json))
    .catch((error) => console.log(error));
}

// let select = document.getElementById('reason-select');
// select.addEventListener('change', () => {
//     let value = select.options[select.selectedIndex].textContent;
//     console.log(value);
// });
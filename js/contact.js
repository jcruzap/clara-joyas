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
    // if (firstName == "" || lastName == "" || email == "" || message == "") {
    //     Swal.fire('Debes completar los campos.');
    // } else {

    // }
});
const setErrorMessages = (errors) => {
   const errorDisplay = document.getElementById('alert');
//    console.log(errors);
   errorDisplay.innerHTML = ""
   errorDisplay.classList.remove('hidden');
   errors.forEach(err => { 
        errorDisplay.innerHTML += `<li class="errors"><i class="fas fa-exclamation-circle"></i> ${err}</li>`
   });
}

const isInvalidEmail = (email) => {
    const regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    return regExp.test(String(email).toLowerCase());
}
const validateInputs = () => {
    let errors = []
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    if(firstNameValue === ''){
        errors.push('Tu Nombre es obligatorio');
    }else if(firstNameValue.length < 3){
        errors.push('Tu Nombre debe contener al menos 3 caracteres');
    }
    if(lastNameValue === ''){
        errors.push('Tu Apellido es obligatorio');
    }else if(lastNameValue.length < 3){
        errors.push('Tu Apellido debe contener al menos 3 caracteres');
    }
    if(emailValue === ''){
        errors.push('Tu Email es obligatorio');
    }else if(!isInvalidEmail(emailValue)) {
        errors.push('Email invalido');
    }
    if(errors.length != 0){
        setErrorMessages(errors);
    }else if(errors.length === 0){
        console.log("sin errores");
    }  
}


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
    fetch(url, {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            }
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
const header = document.querySelector(".header");
const navbar = document.getElementById("navbar");

window.onscroll = () => {
    if(window.scrollY > header.scrollTop){
        navbar.classList.add('sticky');
    }else{
        navbar.classList.remove('sticky');
    }
}
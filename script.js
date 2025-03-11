const header = document.querySelector("header");

window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 0);
});

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
};

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('open');
};

menu.onclick = () =>{
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
}

let index = 0;
const slides = document.querySelectorAll(".slide");
let autoSlideInterval;

function showSlide(i) {
    if (i >= slides.length) index = 0;
    if (i < 0) index = slides.length - 1;

    document.querySelector(".slider").style.transform = `translateX(${-index * 100}%)`;
}

function nextSlide() {
    index++;
    showSlide(index);
}

function prevSlide() {
    index--;
    showSlide(index);
}

// Auto-slide every 3 seconds
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 3000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

document.querySelector(".slider-container").addEventListener("mouseover", stopAutoSlide);
document.querySelector(".slider-container").addEventListener("mouseleave", startAutoSlide);

// Swipe support for mobile users
let touchStartX = 0;
let touchEndX = 0;

document.querySelector(".slider-container").addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector(".slider-container").addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX > touchEndX + 50) nextSlide();
    if (touchStartX < touchEndX - 50) prevSlide();
});

// Start auto-slide initially
startAutoSlide();

let logoIndex = 0;
const logoSlides = document.querySelectorAll(".logo-slide");
const logoSlider = document.querySelector(".logo-slider");

// Logo Slider Functions
function showLogoSlide(i) {
    if (i >= logoSlides.length - 3) logoIndex = 0;
    if (i < 0) logoIndex = logoSlides.length - 3;
    logoSlider.style.transform = `translateX(${-logoIndex * 130}px)`;
}

function nextLogoSlide() {
    logoIndex++;
    showLogoSlide(logoIndex);
}

function prevLogoSlide() {
    logoIndex--;
    showLogoSlide(logoIndex);
}

// Auto-sliding
setInterval(nextLogoSlide, 2000);

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let isValid = true;
    const name = document.getElementById("cname");
    const email = document.getElementById("cemail");
    const message = document.getElementById("cmessage");
    const terms = document.getElementById("cterms");
    
    // Validation
    if (name.value.trim() === "") {
        showError(name, "Name is required");
        isValid = false;
    } else clearError(name);

    if (email.value.trim() === "" || !email.value.includes("@")) {
        showError(email, "Valid email is required");
        isValid = false;
    } else clearError(email);

    if (message.value.trim() === "") {
        showError(message, "Message is required");
        isValid = false;
    } else clearError(message);

    if (!terms.checked) {
        showError(terms, "You must agree to the terms");
        isValid = false;
    } else clearError(terms);

    if (isValid) {
        document.getElementById("cmsgSubmit").innerText = "Message Sent Successfully!";
    }
});

function showError(input, message) {
    input.nextElementSibling.innerText = message;
    input.nextElementSibling.style.display = "block";
}

function clearError(input) {
    input.nextElementSibling.innerText = "";
    input.nextElementSibling.style.display = "none";
}

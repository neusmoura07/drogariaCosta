document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('menu').classList.toggle('open');
}); /* FAZ COM QUE O MENU SEJA ABERTO*/

document.getElementById('menuToggle').addEventListener('click', function() {
    this.classList.toggle('open'); // Adiciona ou remove a classe "open" ao botão de alternância
}); /* FAZ A ANIMAÇÃO DO X FUNCIONAR */

document.getElementById('menuToggle').addEventListener('click', function() {
    var menuContainer = document.querySelector('.menu-container');
    if (menuContainer.classList.contains('open')) {
        menuContainer.classList.remove('open');
    } else {
        menuContainer.classList.add('open');
    }
}); /* FORÇA O MENU ABRIR */

document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('#carouselProducts', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});
// Ajusta a resolução do carrossel
$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        items: $(".owl-carousel").data('items'),
        loop: true,
        margin: [0, 10, 20, 30, 40], // Valores de margem para cada ponto de quebra
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                margin: -20, // Margem zero para dispositivos com menos de 576 pixels de largura
            },
            576: {
                items: 2,
                margin: 20, // Margem de 10 pixels para dispositivos com largura entre 576px e 767px
            },
            768: {
                items: 3,
                margin: 40, // Margem de 20 pixels para dispositivos com largura entre 768px e 991px
            },
            992: {
                items: 4,
                margin: 60, // Margem de 30 pixels para dispositivos com largura entre 992px e 1199px
            },
            1200: {
                items: 5,
                margin: 100, // Margem de 40 pixels para dispositivos com largura maior ou igual a 1200px
            }
        }
    });
});
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


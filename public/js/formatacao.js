document.getElementById('cpf').addEventListener('input', function (e) {
    var value = e.target.value;
    var cpfPattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
        .replace(/(\d{3})(\d)/, '$1-$2') // Adiciona traço após o nono dígito
        .replace(/(-\d{2})\d+?$/, '$1'); // Impede entrada de mais de 11 dígitos
    e.target.value = cpfPattern;
});

document.getElementById('dataNascimento').addEventListener('input', function (e) {
    var value = e.target.value;
    var formattedDate = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
        .replace(/(\d{2})(\d)/, '$1/$2') // Adiciona barra após o segundo dígito
        .replace(/(\d{2})(\d)/, '$1/$2') // Adiciona barra após o quarto dígito
        .replace(/(\d{4})\d+?$/, '$1');  // Limita a 8 dígitos (DD/MM/YYYY)
    e.target.value = formattedDate;
});

// Adicionar um listener para o evento de input no campo de número da casa
document.getElementById('numeroCasa').addEventListener('input', function(e) {
    // Obter o valor atual do campo
    var value = e.target.value;

    // Remover todos os caracteres que não são números
    var numericValue = value.replace(/\D/g, '');

    // Atualizar o valor do campo para incluir apenas números
    e.target.value = numericValue;
});
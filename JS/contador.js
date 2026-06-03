// Função para o campo NOME
function contarLetras() {
    var textoNome = document.getElementById("nome").value;
    var totalNome = textoNome.length;
    document.getElementById("contador").textContent = totalNome + " caracteres";
}

// Função para o campo E-MAIL
function contarLetrasEmail() {
    var textoEmail = document.getElementById("email_usuario").value;
    var totalEmail = textoEmail.length;
    document.getElementById("contador").textContent = totalEmail + " caracteres";
}
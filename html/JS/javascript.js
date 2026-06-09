// =========================================================================
// 1. CONTADORES DE CARACTERES (Suas funções originais salvas e protegidas)
// =========================================================================

// Função para contar os caracteres do Nome
function contarLetras() {
    const inputNome = document.getElementById('nome');
    const contador = document.getElementById('contador');
    const quantidade = inputNome.value.length;

    contador.textContent = `${quantidade} caracteres`;
}

// Função para contar os caracteres do E-mail
function contarLetrasEmail() {
    const inputEmail = document.getElementById('email_usuario');
    const contadorEmail = document.getElementById('contadorEmail');
    const quantidade = inputEmail.value.length;

    contadorEmail.textContent = `${quantidade} caracteres`;
}


// =========================================================================
// 2. MÁSCARAS DE DIGITAÇÃO (Novos recursos de usabilidade - UX)
// =========================================================================

// Aplica formato automático no Telefone enquanto o usuário digita: (XX) XXXXX-XXXX
document.getElementById('telefone').addEventListener('input', function (e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});

// Aplica formato automático no CPF enquanto o usuário digita: XXX.XXX.XXX-XX
document.getElementById('cpf').addEventListener('input', function (e) {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length <= 11) {
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    e.target.value = v;
});


// =========================================================================
// 3. INTERCEPTAÇÃO, VALIDAÇÃO E ENVIO DO FORMULÁRIO
// =========================================================================
const formulario = document.getElementById('meuFormulario');
const mensagemSucesso = document.getElementById('mensagemSucesso');

formulario.addEventListener('submit', function(event) {
    // Impede o recarregamento da página
    event.preventDefault();

    // Remove marcações de erro anteriores
    limparEstilosErro();

    // Captura dos campos principais para validação
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email_usuario');
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('confirmarSenha');
    const termosInput = document.getElementById('termos');

    let formularioValido = true;

    // Validação básica: Nome preenchido
    if (nomeInput.value.trim() === "") {
        marcarErro(nomeInput);
        formularioValido = false;
    }

    // Validação básica: Email preenchido
    if (emailInput.value.trim() === "") {
        marcarErro(emailInput);
        formularioValido = false;
    }

    // Validação: Verificação de Senhas idênticas
    if (senhaInput.value !== confirmarSenhaInput.value || senhaInput.value === "") {
        marcarErro(senhaInput);
        marcarErro(confirmarSenhaInput);
        alert("Atenção: As senhas digitadas não são iguais!");
        formularioValido = false;
    }

    // Validação: Aceitar os termos de uso
    if (!termosInput.checked) {
        alert("Você precisa aceitar os termos de uso e privacidade.");
        formularioValido = false;
    }

    // Se houver algum erro oculto, interrompe o envio aqui
    if (!formularioValido) {
        return; 
    }

    // Lógica de Sucesso (Seu bloco original expandido)
    const nomeExibicao = nomeInput.value ? nomeInput.value : "visitante";

    mensagemSucesso.textContent = `Obrigado por testar o site, ${nomeExibicao}! Seus dados foram enviados com sucesso.`;
    mensagemSucesso.style.display = 'block';

    // Limpa os campos do formulário
    formulario.reset();

    // Reseta os contadores visuais para zero
    document.getElementById('contador').textContent = '0 caracteres';
    document.getElementById('contadorEmail').textContent = '0 caracteres';

    // Esconde a mensagem de sucesso automaticamente após 7 segundos
    setTimeout(function() {
        mensagemSucesso.style.display = 'none';
    }, 7000);
});


// =========================================================================
// 4. FUNÇÕES AUXILIARES DE SUPORTE
// =========================================================================

// Destaca o campo com uma borda vermelha em caso de erro
function marcarErro(elemento) {
    elemento.style.borderColor = "#ff6b6b";
    elemento.style.backgroundColor = "#fff5f5";
}

// Remove os destaques vermelhos ao reiniciar a validação
function limparEstilosErro() {
    const campos = formulario.querySelectorAll('input, select, textarea');
    campos.forEach(function(campo) {
        // Se for o input do tipo color, range ou checkbox não altera a cor de fundo padrão
        if (campo.type !== 'color' && campo.type !== 'range' && campo.type !== 'checkbox' && campo.type !== 'radio') {
            campo.style.borderColor = "gray";
            campo.style.backgroundColor = "#fff";
        }
    });
}
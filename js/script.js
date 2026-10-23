

var botaoMenu = document.querySelector('.menu-toggle');
var menu = document.getElementById('menu-principal');

if (botaoMenu && menu) {
    botaoMenu.addEventListener('click', function () {
        var aberto = menu.classList.toggle('is-open');
        botaoMenu.setAttribute('aria-expanded', String(aberto));
        botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });
}

var botoesSubmenu = document.querySelectorAll('.submenu-toggle');

botoesSubmenu.forEach(function (botao) {
    botao.addEventListener('click', function () {
        var item = botao.closest('.menu__item--dropdown');
        var aberto = item.classList.toggle('is-open');
        botao.setAttribute('aria-expanded', String(aberto));
    });
});

var toast = document.getElementById('toast');
var tempoToast;

function mostrarToast(mensagem) {
    if (!toast) {
        return;
    }
    clearTimeout(tempoToast);
    toast.textContent = mensagem;
    toast.hidden = false;
    toast.classList.add('is-visible');

    tempoToast = setTimeout(function () {
        toast.classList.remove('is-visible');
        toast.hidden = true;
    }, 4000);
}

var formDoacao = document.getElementById('form-doacao');

if (formDoacao) {
    var botoesValor = formDoacao.querySelectorAll('[data-valor]');
    var botaoOutroValor = document.getElementById('btn-outro-valor');
    var campoValor = document.getElementById('outro-valor');
    var botaoDoar = document.getElementById('btn-doar');
    var alertaDoacao = document.getElementById('alerta-doacao');

    function limparSelecao() {
        botoesValor.forEach(function (botao) {
            botao.classList.remove('is-selected');
        });
    }

    function atualizarFormulario() {
        var valor = parseFloat(campoValor.value);
        var valido = valor > 0;
        botaoDoar.disabled = !valido;
        alertaDoacao.hidden = campoValor.value === '' || valido;
    }

    botoesValor.forEach(function (botao) {
        botao.addEventListener('click', function () {
            limparSelecao();
            botao.classList.add('is-selected');
            campoValor.value = botao.getAttribute('data-valor');
            atualizarFormulario();
        });
    });

    botaoOutroValor.addEventListener('click', function () {
        limparSelecao();
        campoValor.focus();
    });

    campoValor.addEventListener('input', function () {
        limparSelecao();
        atualizarFormulario();
    });

    formDoacao.addEventListener('submit', function (evento) {
        evento.preventDefault();
        var valor = parseFloat(campoValor.value).toFixed(2).replace('.', ',');
        mostrarToast('Obrigado pela sua doação de R$ ' + valor + '!');
        formDoacao.reset();
        limparSelecao();
        atualizarFormulario();
    });
}

var formRelatorio = document.getElementById('form-relatorio');
var modalRelatorio = document.getElementById('modal-relatorio');

if (formRelatorio && modalRelatorio) {

    formRelatorio.addEventListener('submit', function (evento) {
        evento.preventDefault();
        modalRelatorio.showModal();
        formRelatorio.reset();
    });
}

document.querySelectorAll('[data-fechar-modal]').forEach(function (botao) {
    botao.addEventListener('click', function () {
        botao.closest('dialog').close();
    });
});
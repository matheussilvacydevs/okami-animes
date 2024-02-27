// Obtém a referência para o botão de login
const login = document.getElementById('btn-login');

// Adiciona um evento de clique ao botão de login
login.addEventListener('click', function() {
    // Redireciona o usuário para outra página ao clicar no botão de login
    window.location.href = 'login/login_page.html';

    // Ou exibe um modal com mais detalhes sobre o botão de login
    // Exemplo:
    // abrirModalComDetalhes();
});

// Obtém a referência para o botão de login
const login = document.getElementById('btn-login');
const animes = document.getElementById('animes');
const mangas = document.getElementById('mangas');
const filmes = document.getElementById('filmes');

// Adiciona um evento de clique ao botão de login
login.addEventListener('click', function() {
    // Redireciona o usuário para outra página ao clicar no botão de login
    window.location.href = 'login/login_page.html';

    // Ou exibe um modal com mais detalhes sobre o botão de login
    // Exemplo:
    // abrirModalComDetalhes();
});

animes.addEventListener('click', function() {
    window.location.href = 'login/login_page.html';
});

mangas.addEventListener('click', function() {
    window.location.href = 'login/login_page.html';
});

filmes.addEventListener('click', function() {
    window.location.href = 'login/login_page.html';
});
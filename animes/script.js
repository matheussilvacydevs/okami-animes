function searchAnime() {
    var searchInput = document.getElementById('searchInput').value;
    
    var query = `
    query ($search: String) {
        Page {
            media (search: $search, type: ANIME) {
                id
                title {
                    romaji
                }
            }
        }
    }
    `;

    var variables = {
        search: searchInput
    };

    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            displayResults(data.data.Page.media);
        })
        .catch(error => {
            console.error('Erro ao obter resultados da pesquisa:', error);
        });
}

function displayResults(animes) {
    var resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (animes.length === 0) {
        resultsContainer.textContent = 'Nenhum resultado encontrado.';
        return;
    }

    animes.forEach(anime => {
        var animeElement = document.createElement('div');
        animeElement.textContent = anime.title.romaji;
        resultsContainer.appendChild(animeElement);
    });
}

// SIDE BAR LEFT

const body = document.querySelector('body');
const sidebar = body.querySelector('.sidebar');
const toggle = body.querySelector('.toggle');

toggle.addEventListener('click', () => {
    sidebar.classList.toggle('close');
});

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(navLink => {
    navLink.addEventListener('click', () => {
        if (sidebar.classList.contains('close')) {
            sidebar.classList.remove('close');
        }
        // Adicione aqui a lógica para ativar o ícone clicado
        // Por exemplo, você pode adicionar uma classe para indicar que o ícone está ativo
        // icon.classList.add('active');
    });
});


// api dos filmes

async function searchAnime() {
    const searchInput = document.getElementById('searchInput').value;
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchInput}&sfw`);
    const data = await response.json();
    
    const animeResultsSection = document.getElementById('animeResults');
    animeResultsSection.innerHTML = ''; // Limpa qualquer conteúdo anterior
    
    if (data.data.length > 0) {
        data.data.forEach(anime => {
            const animeDiv = document.createElement('div');
            animeDiv.classList.add('anime');
            animeDiv.innerHTML = `
                <h2>${anime.title}</h2>
                <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
            `;
            animeResultsSection.appendChild(animeDiv);
        });
    } else {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No results found.';
        animeResultsSection.appendChild(noResultsMessage);
    }
}



document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function updateSlider() {
        const slideWidth = slides[0].offsetWidth;
        const newPosition = -currentSlide * slideWidth;
        document.querySelector('.slider-content').style.transform = `translateX(${newPosition}px)`;
        
        // Verifica se o slider chegou ao último slide
        if (currentSlide === totalSlides - 1) {
            // Se chegou ao último, avança para o primeiro slide
            setTimeout(() => {
                currentSlide = 0;
                updateSlider();
            }, 3000); // Altere o valor 3000 para ajustar o intervalo de troca de slides (em milissegundos)
        }
    }

    setInterval(nextSlide, 3000); // Altere o valor 3000 para ajustar o intervalo de troca de slides (em milissegundos)
});


 // Função para fazer uma solicitação à API do AnimeDB
 function fetchAnimeData() {
    // URL da API do AnimeDB para buscar informações de anime
    var apiUrl = 'https://api.animedb.com/anime';

    // Realiza uma solicitação GET para a API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Quando os dados forem recebidos com sucesso, chama a função para exibir os cards
            displayAnimeCards(data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados do AnimeDB:', error);
        });
}

// Função para exibir os cards de anime com os dados recebidos da API
function displayAnimeCards(animeData) {
    var animeContainer = document.getElementById('anime-container');

    // Limpa qualquer conteúdo existente no contêiner
    animeContainer.innerHTML = '';

    // Itera sobre os dados de anime e cria um card para cada um
    animeData.forEach(anime => {
        var card = document.createElement('div');
        card.classList.add('anime-card');
        card.innerHTML = `
            <h2>${anime.title}</h2>
            <img src="${anime.image}" alt="${anime.title}">
            <p>${anime.description}</p>
        `;
        animeContainer.appendChild(card);
    });
}

// Chama a função para buscar e exibir os dados de anime ao carregar a página
fetchAnimeData();

$(document).ready(function(){
    // Fazer requisição para a API Jikan (substitua pela sua URL real)
    $.ajax({
        url: 'https://api.jikan.moe/v3/top/anime/1',
        method: 'GET',
        success: function(data) {
            // Puxar o nome do primeiro anime retornado pela API
            var animeTitle = data.top[0].title;
            // Puxar a URL da imagem do primeiro anime retornado pela API
            var animeImage = data.top[0].image_url;
            
            // Atualizar o nome do anime no HTML
            $('#animeTitle').text(animeTitle);
            // Atualizar a imagem do anime no HTML
            $('#animeImage').attr('src', animeImage);
        },
        error: function() {
            console.error('Erro ao obter dados da API.');
        }
    });
});
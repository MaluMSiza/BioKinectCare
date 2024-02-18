// ListGames.js
var ListGames = [
    {
        "image": "css/imgs/jogos/img1.jpg",
        "title": "The Legend of Zelda: Breath of the Wild",
        "description": "Explore um vasto mundo aberto repleto de aventuras épicas e mistérios. Encare desafios, descubra segredos e mergulhe em uma jornada emocionante pela terra de Hyrule.",
        "price": "$19.99"
    },
    {
        "image": "css/imgs/jogos/img2.jpg",
        "title": "Grand Theft Auto V",
        "description": "Entre no mundo do crime e da intriga, onde escolhas influenciam seu destino. Viva histórias entrelaçadas, explore uma cidade vibrante e mergulhe na ação sem limites.",
        "price": "$29.99"
    },
    {
        "image": "css/imgs/jogos/img3.jpg",
        "title": "Fortnite",
        "description": "Prepare-se para batalhas intensas em um campo de combate em constante mudança. Construa, lute e adapte-se para se tornar o último sobrevivente neste jogo de estratégia e habilidade.",
        "price": "$29.99"
    },
    {
        "image": "css/imgs/jogos/img4.jpg",
        "title": "Overwatch",
        "description": "Una-se a um time de heróis e mergulhe em batalhas frenéticas e estratégicas. Domine habilidades únicas, trabalhe em equipe e lute pela vitória em cenários incríveis.",
        "price": "$29.99"
    },
    {
        "image": "css/imgs/jogos/img5.jpg",
        "title": "Minecraft",
        "description": "Crie seu próprio mundo, construa, explore e sobreviva em um ambiente pixelizado. Liberte sua criatividade e embarque em aventuras infindáveis neste universo sandbox.",
        "price": "$29.99"
    },
    {
        "image": "css/imgs/jogos/img6.jpg",
        "title": "PUBG",
        "description": "Junte-se a um campo de batalha online e lute para ser o último sobrevivente neste jogo de sobrevivência intenso e cheio de ação.",
        "price": "$29.99"
    },
    {
        "image": "css/imgs/jogos/img7.jpg",
        "title": "VERNAL EDGE",
        "description": "Entre em um mundo futurista cheio de desafios e mistérios. Descubra segredos, lute contra inimigos e torne-se um mestre das lâminas neste jogo de ação e aventura.",
        "price": "$29.99"
    },
    {
        "image": "css/imgs/jogos/img8.jpg",
        "title": "DESTINY2",
        "description": "Explore vastos planetas, descubra poderes incríveis e defenda a última cidade segura da Terra contra ameaças alienígenas neste jogo de tiro em primeira pessoa emocionante.",
        "price": "$29.99"
    },
    {
        "image": "css/imgs/jogos/img9.jpg",
        "title": "LETHAL COMPANY",
        "description": "Entre no submundo do crime e torne-se um mestre dos negócios escuros. Engane seus rivais, construa seu império e torne-se uma lenda neste jogo de estratégia e simulação.",
        "price": "$29.99"
    },
    {
        "image": "css/imgs/jogos/img10.jpg",
        "title": "WARFRAME",
        "description": "Equipe seu Warframe e entre em batalhas épicas contra inimigos intergalácticos. Domine habilidades poderosas, explore um vasto universo e lute pela paz no sistema solar.",
        "price": "$29.99"
    }
];

// Verifique se ListGames está definido
$(document).ready(function() {
    if (typeof ListGames !== 'undefined') {
        // Percorra a lista de jogos
        for (var i = 0; i < ListGames.length; i++) {
            var game = ListGames[i];

            // Crie uma div para cada jogo
            var gameContainer = $('<div class="game-container"></div>');

            // Adicione a imagem do jogo
            var gameImage = $('<img src="' + game.image + '" alt="' + game.title + '">');
            gameContainer.append(gameImage);

            // Adicione o título do jogo
            var gameTitle = $('<h2>' + game.title + '</h2>');
            gameContainer.append(gameTitle);

            var gameDesc = $('<h1>' + game.description + '</h1>');
            gameContainer.append(gameDesc);

            // Adicione o botão "Jogar"
            var playButton = $('<button class="primary-button">ACESSAR</button>');
            gameContainer.append(playButton);

            // Adicione a div do jogo à lista de jogos
            $('#game-list').append(gameContainer);
        }
    } else {
        console.error('ListGames não está definido. Verifique o conteúdo do arquivo ListGames.js.');
    }
});

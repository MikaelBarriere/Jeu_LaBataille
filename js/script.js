$(document).ready(function () {

// TABLEAU DE MON PAQUET DE CARTES
    const deck = [
        'SeptCarreau', 'HuitCarreau', 'NeufCarreau', 'DixCarreau', 'ValetCarreau', 'DameCarreau', 'RoiCarreau', 'AsCarreau',
        'SeptTrefle', 'HuitTrefle', 'NeufTrefle', 'DixTrefle', 'ValetTrefle', 'DameTrefle', 'RoiTrefle', 'AsTrefle',
        'SeptCoeur', 'HuitCoeur', 'NeufCoeur', 'DixCoeur', 'ValetCoeur', 'DameCoeur', 'RoiCoeur', 'AsCoeur',
        'SeptPique', 'HuitPique', 'NeufPique', 'DixPique', 'ValetPique', 'DamePique', 'RoiPique', 'AsPique'
    ];
// VALEURS DE MES CARTES
    const values = {
        'SeptCarreau': 0, 'HuitCarreau': 1, 'NeufCarreau': 2, 'DixCarreau': 3, 'ValetCarreau': 4, 'DameCarreau': 5, 'RoiCarreau': 6, 'AsCarreau': 7,
        'SeptTrefle': 0, 'HuitTrefle': 1, 'NeufTrefle': 2, 'DixTrefle': 3, 'ValetTrefle': 4, 'DameTrefle': 5, 'RoiTrefle': 6, 'AsTrefle': 7,
        'SeptCoeur': 0, 'HuitCoeur': 1, 'NeufCoeur': 2, 'DixCoeur': 3, 'ValetCoeur': 4, 'DameCoeur': 5, 'RoiCoeur': 6, 'AsCoeur': 7,
        'SeptPique': 0, 'HuitPique': 1, 'NeufPique': 2, 'DixPique': 3, 'ValetPique': 4, 'DamePique': 5, 'RoiPique': 6, 'AsPique': 7
    };
// OBJET DE MES JOUEURS & FONCTIONS DE JEUX
    class Player {
        constructor(name) {
            this.name = name;
            this.score = 0;
            this.deck = [];
        }

        drawCard() {
            return this.deck.pop();
        }

        addCards(cards) {
            this.deck = cards.concat(this.deck);
        }

        addScore(points) {
            this.score += points;
        }
    }

    let player = new Player("Joueur"); 
    let computer = new Player("Ordinateur");
    var newTab = []; // Déclarer newTab en dehors de la fonction playRound

// FONCTION DE MELANGE DE CARTE
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
// FONCTION DE DISTRIBUTION DE CARTE
    function dealCards() {
        shuffle(deck);
        player.deck = deck.slice(0, 16);
        computer.deck = deck.slice(16);
        updateCardCount();
    }
// AFFICHAGE DU NOMBRE DE CARTE
    function updateCardCount() {
        $("#nombrecartejoueur").text(player.deck.length);
        $("#nombrecarteordinateur").text(computer.deck.length);
    }
// AFFICHAGE DU SCORE
    function updateScore() {
        $("#scorevaleurjoueur").text(player.score);
        $("#scorevaleurordinateur").text(computer.score);
    }
// FONCTION DU TOUR DE JEU AVEC UN TABLEAU TEMPORAIRE

    function playRound(cardsInPlay = []) {
        if (player.deck.length === 0) { 
            alert("Vous avez perdu la partie!");
            $("#computerVictory img").attr("src", `img/CoupeGagnant50-44.png`);
            return;
        }

        if (player.deck.length === 0) {
            alert("Vous avez gagné la partie!");
            $("#playerVictory img").attr("src", `img/CoupeGagnant50-44.png`);
            return;
        }

        let playerCard = player.drawCard();
        let computerCard = computer.drawCard();
        cardsInPlay.push(playerCard, computerCard); // Les joueurs poussent leurs cartes dans le tableau temporaire

        // Mise à jour des images des cartes
        $("#joueurcarte img").attr("src", `img/${playerCard}.png`);
        $("#ordinateurcarte img").attr("src", `img/${computerCard}.png`);
        $("#playerBataille").empty(); // 
        $("#computerBataille").empty(); // 

        if (values[playerCard] > values[computerCard]) {
            player.addCards(cardsInPlay);
            player.score = player.score + values[playerCard] + values[computerCard];
            if (newTab.length > 0) {
                
                $.each(newTab, function (index, card) {
                    var img = $('<img>').attr('src', `img/${card}.png`).addClass('tailleminicarte','inline-block');
                    $("#playerBataille").append(img);
                });
                player.addCards(newTab);
                newTab = []; // Réinitialiser newTab après avoir ajouté les cartes
            }

            $("#joueurdos img").attr("src", `img/backcartegrande.png`);
            $("#ordinateurdos img").attr("src", `img/backcartebleuegrande.png`);

        } else if (values[playerCard] < values[computerCard]) {
            computer.addCards(cardsInPlay);
            computer.score = computer.score + values[playerCard] + values[computerCard];
            if (newTab.length > 0) {
                $.each(newTab, function (index, card) {
                    var img = $('<img>').attr('src', `img/${card}.png`).addClass('tailleminicarte','d-flex', 'inline-block');
                    $("#computerBataille").append(img);
                });
                computer.addCards(newTab);
                newTab = []; // Réinitialiser newTab après avoir ajouté les cartes
            }

            $("#joueurdos img").attr("src", `img/backcartegrande.png`);
            $("#ordinateurdos img").attr("src", `img/backcartebleuegrande.png`);
        } else {
            // Bataille : chaque joueur met une carte face cachée et tire une nouvelle carte
            if (player.deck.length < 2) {
                // Si le joueur n'a pas assez de cartes pour continuer la bataille, il perd
                alert("L'ordinateur gagne !");
                $("#computerVictory img").attr("src", `img/CoupeGagnant50-44.png`);
                return;
            }
            if (computer.deck.length < 2) {
                // Si l'ordinateur n'a pas assez de cartes pour continuer la bataille, il gagne
                alert("Vous avez gagné!");
                $("#playerVictory img").attr("src", `img/CoupeGagnant50-44.png`);
                return;
            }

            $("#joueurdos img").attr("src", `img/backcartegrandebatrect.png`);
            $("#ordinateurdos img").attr("src", `img/backcartebleuegrandebatrect.png`);
            cardsInPlay.push(player.drawCard(), computer.drawCard());

            // Ajout des cartes en bataille à newTab
            while (cardsInPlay.length > 0) {
                newTab.push(cardsInPlay.splice(0, 1)[0]);
            }
        }

        updateScore();
        updateCardCount();
        console.log(values[computerCard]);
        console.log(values[playerCard]);
        console.log(computer.deck);
        console.log(player.deck);
        console.log(cardsInPlay);
        console.log(newTab);
    }

    $("#joueurdos").click(function () {
        playRound();
    });

    dealCards();

});
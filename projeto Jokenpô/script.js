const result = document.querySelector(".result");
const humanscore = document.querySelector("#human-score");
const computerScore = document.querySelector("#computer-score");
const restartButton = document.querySelector("#restart-button");


let humanScoreNumber = 0;
let machineScoreNumber = 0;
let roundsDrawsNumber = 0; //deu emdraws

const GAME_OPTIONS = {
    ROCK: "rock",
    PAPER: "paper",
    SCISSORS: "scissors"

}



/*const playhuman = (humanchoice) => {

    playgame(humanchoice, playmachine());
}*/
const playhuman = (humanchoice) => {

    const totalRounds =
        humanScoreNumber +
        machineScoreNumber +
        roundsDrawsNumber;

    // BLOQUEIA O JOGO APÓS 25 RODADAS
    if (totalRounds >= 25) {
        return;
    }

    playgame(humanchoice, playmachine());
}
const checkWinner = () => {

    const totalRounds =
        humanScoreNumber +
        machineScoreNumber +
        roundsDrawsNumber;

    if (totalRounds === 25) {

        if (humanScoreNumber > machineScoreNumber) {

            result.innerHTML = "🏆 Você venceu o jogo!";

        } else if (machineScoreNumber > humanScoreNumber) {

            result.innerHTML = "🤖 Alexa venceu o jogo!";

        } else {

            result.innerHTML = "😅 O jogo terminou empatado!";
        }
    }
}

const playmachine = () => {
    const choice = [GAME_OPTIONS.ROCK, GAME_OPTIONS.PAPER, GAME_OPTIONS.SCISSORS];
    const randomNumber = Math.floor(Math.random() * 3);


    return choice[randomNumber];

}

const playgame = (human, machine) => {

    console.log("Humano: " + human + " Maquina: " + machine);

    if (human === machine) {
        roundsDrawsNumber++;
        document.querySelector("#rounds-draws").innerHTML = roundsDrawsNumber;
        result.innerHTML = " Deu Empate!";
    } else if (
        human === GAME_OPTIONS.ROCK && machine === GAME_OPTIONS.SCISSORS ||
        human === GAME_OPTIONS.PAPER && machine === GAME_OPTIONS.ROCK ||
        human === GAME_OPTIONS.SCISSORS && machine === GAME_OPTIONS.PAPER
    ) {
        humanScoreNumber++;
        humanscore.innerHTML = humanScoreNumber;
        result.innerHTML = " Você Venceu!";
    } else {
        machineScoreNumber++;
        computerScore.innerHTML = machineScoreNumber;
        result.innerHTML = " Vocês Perdeu para a Alexa!";

    }

    // VERIFICA O CAMPEÃO
    checkWinner();



}

const restartGame = () => {

    humanScoreNumber = 0;
    machineScoreNumber = 0;
    roundsDrawsNumber = 0;

    humanscore.innerHTML = 0;
    computerScore.innerHTML = 0;
    document.querySelector("#rounds-draws").innerHTML = 0;

    result.innerHTML = "Jogo Reiniciado!";
}
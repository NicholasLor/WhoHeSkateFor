import './style.css'

const randPlayer = document.getElementById('random-player');

const randPlayerImage = document.getElementById('random-player-photo');
randPlayerImage.classList.add('randPlayerImage');

const playerContainer = document.createElement('div');
playerContainer.classList.add('player-container');

const container = document.createElement('div');
container.classList.add('container');

const parentDiv = document.createElement('div');
parentDiv.classList.add('parent-div');

const buttonGrid = document.createElement('div');
buttonGrid.classList.add('button-grid');

const guess = document.createElement('p');
guess.classList.add('guess');

const score = document.createElement('p');
score.classList.add('score');

const guessesHistory = document.createElement('p');
guessesHistory.classList.add('guesses-history');

const resultsGrid = document.createElement('div');
resultsGrid.classList.add('results-grid');



const teamLogoArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16,
17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 29, 30, 52, 53, 54, 55];

for (let i = 0; i <= teamLogoArr.length-1; i++) {
  const button = document.createElement('button');
  button.classList.add('grid-button');
  button.id = `${teamLogoArr[i]}`;
  button.innerHTML = `<img src="https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${teamLogoArr[i]}.svg" height=50 id=${teamLogoArr[i]}>`;
  buttonGrid.appendChild(button);
}

// function createResultsGrid(){
//   for(let i = 0; i<=4;i++){
//     const 
//   }


let correctGuesses= 0;
let totalGuesses = 0;

score.innerHTML = "Score: " + correctGuesses + "/"  + totalGuesses;
document.body.appendChild(score);
document.body.appendChild(guessesHistory);
document.body.appendChild(guess);
addClickEventsToButtonGrid(buttonGrid);
container.appendChild(buttonGrid);
document.body.appendChild(container);


var data;


async function getRandomPlayer() {
  try {
    let response = await fetch('http://localhost:8080/api/v1/player/random');
    let data = await response.json();
    randPlayer.innerHTML = data.player_fullName;
    randPlayerImage.src = 'http://nhl.bamcontent.com/images/headshots/current/168x168/' + data.player_id + '.jpg';
    return data;
  } catch (error) {
    console.error(error);
  }
}

var playerdata = "";

async function main() {
  playerdata = await getRandomPlayer();q
}

main();

const teamguessarray = [];
const actualTeamArray = [];


function addClickEventsToButtonGrid(buttonGrid) {
  // get all the buttons in the grid
  const buttons = buttonGrid.querySelectorAll('button');

  // add a click event listener to each button
  buttons.forEach(button => {
    button.addEventListener('click', event => {
      // log the button ID when the button is clicked
      
      let teamguess = `${event.target.getAttribute('id')}`;
      var correctBool;

      console.log(`Button clicked:`+teamguess);
      // console.log(playerdata);


      if(teamguess == playerdata.team_id){
        console.log("Correct Guess!");
        correctBool = String.fromCodePoint(0x2705) + "  ";
        teamguessarray.push("https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/" + teamguess + ".svg");
        actualTeamArray.push("https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/" + playerdata.team_id + ".svg");
        console.log(actualTeamArray)
        console.log(teamguessarray)
        // + ' ' + playerdata.player_fullName;

        main();
        
        correctGuesses++;
        totalGuesses++;

        console.log(correctGuesses+"/"+totalGuesses);
        score.innerHTML = "Score: " + correctGuesses + "/"  + totalGuesses;

        addToGuessesHistory(correctBool);

        if (totalGuesses == 5){
          endOfGame();
          resetScores();
          main();
        } 


      } else {
        console.log("Incorrect Guess");
        teamguessarray.push("https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/" + teamguess + ".svg");
        actualTeamArray.push("https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/" + playerdata.team_id + ".svg");
        console.log(teamguessarray)
        console.log(actualTeamArray)
        main();

        totalGuesses++;
        correctBool = String.fromCodePoint(0x274C) + "  "
        //+ ' ' + playerdata.player_fullName;


        console.log(correctGuesses+"/"+totalGuesses);
        score.innerHTML = "Score: " + correctGuesses + "/"  + totalGuesses;

        addToGuessesHistory(correctBool);

        if (totalGuesses ==5){
          $(".modal").modal("show");
          resetScores();
          main();
        }
      }

      

    });
  });
}

function addToGuessesHistory(guessBool){
  guessesHistory.textContent += guessBool;
}

function resetScores(){
  correctGuesses = 0;
  totalGuesses = 0;
  guessesHistory.textContent = "";
  score.innerHTML = "Score: " + correctGuesses + "/"  + totalGuesses;
}


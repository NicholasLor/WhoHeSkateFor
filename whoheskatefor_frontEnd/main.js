import './style.css'

const randPlayer = document.getElementById('random-player');

const randPlayerImage = document.getElementById('random-player-photo');
randPlayerImage.classList.add('randPlayerImage');

const container = document.createElement('div');
container.classList.add('container');

const buttonGrid = document.createElement('div');
buttonGrid.classList.add('button-grid');

const guess = document.createElement('p');
guess.classList.add('guess');

const score = document.createElement('p');
score.classList.add('score');

for (let i = 1; i <= 32; i++) {
  const button = document.createElement('button');
  button.classList.add('grid-button');
  button.id = `${i}`;
  button.innerHTML = `<img src="https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${i}.svg" height=50 id=${i}>`;
  buttonGrid.appendChild(button);
}

let correctGuesses= 0;
let totalGuesses = 0;

score.innerHTML = "Score: " + correctGuesses + "/"  + totalGuesses;
document.body.appendChild(score);

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
  playerdata = await getRandomPlayer();
}

main();



function addClickEventsToButtonGrid(buttonGrid) {
  // get all the buttons in the grid
  const buttons = buttonGrid.querySelectorAll('button');

  // add a click event listener to each button
  buttons.forEach(button => {
    button.addEventListener('click', event => {
      // log the button ID when the button is clicked
      
      let teamguess = `${event.target.getAttribute('id')}`;

      console.log(`Button clicked:`+teamguess);
      // console.log(playerdata);


      if(teamguess == playerdata.team_id){
        console.log("Correct Guess!");
        main();
        
        correctGuesses++;
        totalGuesses++;

        console.log(correctGuesses+"/"+totalGuesses);
        score.innerHTML = "Score: " + correctGuesses + "/"  + totalGuesses;


      } else {
        console.log("Incorrect Guess");
        main();

        totalGuesses++;

        console.log(correctGuesses+"/"+totalGuesses);
        score.innerHTML = "Score: " + correctGuesses + "/"  + totalGuesses;
      }

      

    });
  });
}


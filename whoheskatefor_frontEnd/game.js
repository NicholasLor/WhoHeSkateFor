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
let correctGuesses= 0;
let totalGuesses = 0;
var playerdata;
var data;
var textToShare = "Score - Player - Guessed/Actual\n\n";
score.innerHTML = "Score: " + correctGuesses + "/"  + totalGuesses;

document.body.appendChild(score);
document.body.appendChild(guessesHistory);
document.body.appendChild(guess);

addbuttons();
addClickEventsToButtonGrid(buttonGrid);

container.appendChild(buttonGrid);
document.body.appendChild(container);

main();
playAgain();

function addbuttons(){
  for (let i = 0; i <= teamLogoArr.length-1; i++) {
    const button = document.createElement('button');
    button.classList.add('grid-button');
    button.id = `${teamLogoArr[i]}`;
    button.innerHTML = `<img src="https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${teamLogoArr[i]}.svg" height=50 id=${teamLogoArr[i]}>`;
    buttonGrid.appendChild(button);
  }
}

function addResultRow(correctBool, playerdata, teamguess){
  var tbodyRef = document.getElementById('results-table').getElementsByTagName('tbody')[0];

  // Insert a row at the end of table
  var newRow = tbodyRef.insertRow();

  // Image of player
  var playerCell = newRow.insertCell();

  // get playername
  var playerdiv = document.createElement('div');
  playerdiv.className = "table-cell";
  var playername = document.createElement('p');
  playername = document.createTextNode(randPlayer.innerHTML);

  // get image
  var img = document.createElement('img');
  img.src = randPlayerImage.src;
  img.style.display = "block";
  img.width = 50;

  // append player name and image
  playerdiv.appendChild(img);
  playerdiv.appendChild(playername);
  playerCell.appendChild(playerdiv);

  // Score Emoji
  var scoreCell = newRow.insertCell();
  scoreCell.className = "table-cell"
  var div = document.createElement('div'), // create DIV element
  txt = document.createTextNode(correctBool); // create text node
  div.appendChild(txt); // append text node to the DIV
  scoreCell.appendChild(div);    

  // Image of Guessed Team
  var guessedTeamCell = newRow.insertCell();
  guessedTeamCell.className = "table-cell";
  var img = document.createElement('img');
  img.src = "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/" + teamguess + ".svg"
  img.width = 50;
  guessedTeamCell.appendChild(img);

  // Image of Actual Team
  var actualTeamCell = newRow.insertCell();
  var img = document.createElement('img');
  img.src = playerdata.getplayerTeamLogoURL();
  img.width = 50;
  actualTeamCell.appendChild(img);

}

class Player{
  // Player class

  constructor(data){
    
    // get total number of teams (32)
    this.numTeams = JSON.stringify(Object.keys(data.teams).length);

    // generate random team number
    this.randTeamNumber = Math.floor(Math.random() * (this.numTeams - 0 + 1)) + 0;
    
    // get roster length of random team
    this.teamRosterLength = JSON.stringify(data['teams'][this.randTeamNumber]['roster']['roster'].length);
    
    // get random player on roster
    this.randomteamRosterNumber = Math.floor(Math.random() * (this.teamRosterLength - 0 + 1)) + 0;

    this.randomPlayerHTML = JSON.stringify(data['teams'][this.randTeamNumber]['roster']['roster'][this.randomteamRosterNumber]);
    this.playerTeamId = JSON.stringify(data['teams'][this.randTeamNumber]['id']);
    this.playerId = JSON.stringify(data['teams'][this.randTeamNumber]['roster']['roster'][this.randomteamRosterNumber]['person']['id']);
    this.playerName = JSON.stringify(data['teams'][this.randTeamNumber]['roster']['roster'][this.randomteamRosterNumber]['person']['fullName']);
    this.teamName = JSON.stringify(data['teams'][this.randTeamNumber]['abbreviation']);
  }

  getplayerTeamId(){
    return this.playerTeamId;
  }

  getplayerId(){
    return this.playerId;
  }

  getplayerName(){
    return this.playerName;
  }

  getplayerPhotoURL(){
    return 'http://nhl.bamcontent.com/images/headshots/current/168x168/' + this.getplayerId() + '.jpg';
  }

  getplayerTeamLogoURL(){
    return 'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/' + this.getplayerTeamId() + '.svg'
  }

}

async function getRandomPlayer() {
  try {
    let response = await fetch('https://statsapi.web.nhl.com/api/v1/teams/?expand=team.roster');
    let data = await response.json();

    let player = new Player(data);
    
    randPlayer.innerHTML = player.getplayerName();
    randPlayerImage.src = player.getplayerPhotoURL();

    return player;
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  playerdata = await getRandomPlayer();
}

function playAgain(){
  const playagainButton = document.getElementById('play-again');
  playagainButton.addEventListener('click',event => {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = "";

  })
}

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


      if(teamguess == playerdata.playerTeamId){
        console.log("Correct Guess!");
        correctBool = String.fromCodePoint(0x2705);


        addResultRow(correctBool, playerdata, teamguess);
        // addTextShareRow(correctBool, playerdata.team_id, teamguess);

        main();
        

        correctGuesses++;
        totalGuesses++;

        console.log(correctGuesses+"/"+totalGuesses);
        score.innerHTML = "Score: " + correctGuesses + "/"  + totalGuesses;

        addToGuessesHistory(correctBool);

        if (totalGuesses == 5){
          $(".modal").modal("show");
          // endOfGame();
          resetScores();
          main();
          console.log(textToShare);
        } 


      } else {
        console.log("Incorrect Guess");

        correctBool = String.fromCodePoint(0x274C)
        addResultRow(correctBool, playerdata, teamguess);
        // addTextShareRow(correctBool, playerdata.team_id, teamguess);
        
        main();


        totalGuesses++;

        //+ ' ' + playerdata.player_fullName;


        console.log(correctGuesses+"/"+totalGuesses);
        score.innerHTML = "Score: " + correctGuesses + "/"  + totalGuesses;

        addToGuessesHistory(correctBool);

        if (totalGuesses ==5){
          $(".modal").modal("show");
          resetScores();
          main();
          console.log(textToShare);
          
          
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
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
var playerdata = "";
var maxPlayerNameLength = 0;

var scoreArray = [];
var playerNameArray = [];
var teamGuessArray = [];
var playerGuessArray = [];

var textToShare = "";
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
shareTextResults();

function addbuttons(){
  for (let i = 0; i <= teamLogoArr.length-1; i++) {
    const button = document.createElement('button');
    button.classList.add('grid-button');
    button.id = `${teamLogoArr[i]}`;
    button.innerHTML = `<img src="https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${teamLogoArr[i]}.svg" height=50 id=${teamLogoArr[i]}>`;
    buttonGrid.appendChild(button);
  }
}

function addResultRow(correctBool, playerdata, teamguess, teamguessName){
  var tbodyRef = document.getElementById('results-table').getElementsByTagName('tbody')[0];

  // Insert a row at the end of table
  var newRow = tbodyRef.insertRow();

  // COLUMN: Image of player
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

  // COLUMN: Score Emoji
  var scoreCell = newRow.insertCell();
  scoreCell.className = "table-cell"
  var div = document.createElement('div'), // create DIV element
  txt = document.createTextNode(correctBool); // create text node
  div.appendChild(txt); // append text node to the DIV
  scoreCell.appendChild(div);    

  // COLUMN: Image of Guessed Team
  var guessedTeamCell = newRow.insertCell();

      // get guessed team name of player
      var teamNamediv = document.createElement('div');
      teamNamediv.className = "table-cell";
      var teamNameText = document.createElement('p');
      teamNameText = document.createTextNode(teamguessName);

      // get guessed team logo
      var guessedTeamLogoImg = document.createElement('img');
      guessedTeamLogoImg.src = "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/" + teamguess + ".svg"
      guessedTeamLogoImg.style.display = "block";
      guessedTeamLogoImg.width = 50;

      // append guessed team logo and name to cell
      teamNamediv.appendChild(guessedTeamLogoImg);
      teamNamediv.appendChild(teamNameText);
      guessedTeamCell.appendChild(teamNamediv);


  // COLUMN: Image of Actual Team
  var actualTeamCell = newRow.insertCell();

      // get actual team name of player
      var actualteamNamediv = document.createElement('div');
      actualteamNamediv.className = "table-cell";
      var actualteamNameText = document.createElement('p');
      actualteamNameText = document.createTextNode(playerdata.getteamName());

      // get actual team logo
      var actualTeamLogoimg = document.createElement('img');
      actualTeamLogoimg.src = playerdata.getplayerTeamLogoURL();
      actualTeamLogoimg.style.display = "block";
      actualTeamLogoimg.width = 50;

      // append actual team logo and name to cell
      actualteamNamediv.appendChild(actualTeamLogoimg);
      actualteamNamediv.appendChild(actualteamNameText);
      actualTeamCell.appendChild(actualteamNamediv);

}

function addTextShareRow(correctBool, playerdata, teamguessName){

  var playerNameLength = playerdata.getplayerName().length;

  if(playerNameLength > maxPlayerNameLength){
    maxPlayerNameLength = playerNameLength;
  } 

  scoreArray.push(correctBool);
  playerNameArray.push(playerdata.getplayerName());
  teamGuessArray.push(teamguessName);
  playerGuessArray.push(playerdata.getteamName());

  // console.log(scoreArray);

}

function formatTextShareRow(){

  textToShare += "WhoHeSkateFor.com - " + "Score: " + correctGuesses + "/" + totalGuesses+ "\n\n";

  textToShare += "Score | " + "Player".padEnd(maxPlayerNameLength," ") + " | " + "Guess/Actual\n\n";

  for(var i = 0; i<scoreArray.length; i++){
    textToShare += "  " + scoreArray.at(i) + "  | " + playerNameArray.at(i).padEnd(maxPlayerNameLength," ") + " | " + teamGuessArray.at(i) + "/" + playerGuessArray.at(i) + "\n";
  }

  console.log(textToShare);

}

class Player{
  // Player class, to keep track of players shown to end user and tracked for scoring purposes and result print at the end

  constructor(data){
    
    // get total number of teams (32)
    this.numTeams = JSON.stringify(Object.keys(data.teams).length)-1;

    // generate random team number
    this.randTeamNumber = Math.floor(Math.random() * (this.numTeams - 0 + 1));


    // debug log pt. 1
    console.log("----------------")
    console.log(data)
    console.log("numTeams: "+typeof(this.numTeams)+" "+this.numTeams);
    console.log("randTeamNumber: "+typeof(this.randTeamNumber)+" "+this.randTeamNumber);

    // get roster length of random team
    this.teamRosterLength = JSON.stringify(data['teams'][this.randTeamNumber]['roster']['roster'].length)-1;
    
    // get random player on roster
    this.randomteamRosterNumber = Math.floor(Math.random() * (this.teamRosterLength - 0 + 1)) + 0;

    // set player attributes: id, team id, name, team name
    this.randomPlayerHTML = JSON.stringify(data['teams'][this.randTeamNumber]['roster']['roster'][this.randomteamRosterNumber]);
    this.playerTeamId = JSON.stringify(data['teams'][this.randTeamNumber]['id']);

    // debug log pt. 2
    console.log("this.teamRosterLength: "+typeof(this.teamRosterLength)+" "+this.teamRosterLength);
    console.log("this.randomteamRosterNumber: "+typeof(this.randomteamRosterNumber)+" "+this.randomteamRosterNumber);


    console.log(data['teams'][this.randTeamNumber]);

    this.playerId = JSON.stringify(data['teams'][this.randTeamNumber]['roster']['roster'][this.randomteamRosterNumber]['person']['id']);
    this.playerName = JSON.stringify(data['teams'][this.randTeamNumber]['roster']['roster'][this.randomteamRosterNumber]['person']['fullName']).replace(/"/g, '');
    this.teamName = JSON.stringify(data['teams'][this.randTeamNumber]['abbreviation']).replace(/"/g, '');

    console.log("playerId: " + typeof(playerId)+" "+this.playerId);
    console.log("playerteamId: " + typeof(playerTeamId)+" "+this.playerTeamId);


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

  // get their headshot image
  getplayerPhotoURL(){
    return 'http://nhl.bamcontent.com/images/headshots/current/168x168/' + this.getplayerId() + '.jpg';
  }

  // get logo of team they play for
  getplayerTeamLogoURL(){
    return 'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/' + this.getplayerTeamId() + '.svg'
  }

  getteamName(){
    return this.teamName;
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

async function copyContent(){

  try {
    await navigator.clipboard.writeText(textToShare);
    // console.log('Content copied to clipboard');
    /* Resolved - text copied to clipboard successfully */
  } catch (err) {
    console.log('Failed to copy: ', err);
    /* Rejected - text failed to copy to the clipboard */
  }

}

function shareTextResults(){
  const shareButton = document.getElementById('share');
  shareButton.addEventListener('click',event => {

    // format text with spaces based on player name
    formatTextShareRow(textToShare);
    copyContent();

    // alert user
    // alert("Results copied to clipboard");

  })
}

async function getGuessedTeamName(teamId) {
  try {
    let response = await fetch('https://statsapi.web.nhl.com/api/v1/teams/?expand=team.roster');
    let data = await response.json();

    var teamName;

    for(var i =0; i < data['teams'].length; i++){
      if(teamId == data['teams'][i]['id']){
        teamName = JSON.stringify(data['teams'][i]['abbreviation']).replace(/"/g, '');
      }
    }

    return teamName

  } catch (error) {
    console.error(error);
  }
}


function addClickEventsToButtonGrid(buttonGrid) {
  // get all the buttons in the grid
  const buttons = buttonGrid.querySelectorAll('button');

  // add a click event listener to each button
  buttons.forEach(button => {
    button.addEventListener('click', async event => {
      // log the button ID when the button is clicked
      
      let teamguess = `${event.target.getAttribute('id')}`;
      var teamguessName;
      teamguessName = await getGuessedTeamName(teamguess);
      var correctBool;

      console.log(`Button clicked:`+teamguess);
      // console.log(playerdata);


        if(teamguess == playerdata.getplayerTeamId()){
        console.log("Correct Guess!");
        correctBool = String.fromCodePoint(0x2705);


        addResultRow(correctBool, playerdata, teamguess, teamguessName);
        addTextShareRow(correctBool, playerdata, teamguessName);
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
          // console.log(textToShare);
        } 


      } else {

        console.log("Incorrect Guess");
        correctBool = String.fromCodePoint(0x274C)

        addResultRow(correctBool, playerdata, teamguess, teamguessName);
        addTextShareRow(correctBool, playerdata, teamguessName);
  

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
          // console.log(textToShare);
          
          
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
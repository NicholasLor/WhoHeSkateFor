var cropPlayerJerseysCheckBox = document.getElementById('gridCheck1');
var startGameButton = document.getElementById('startGameButton');

RedirectWithSettingsApplied();

function RedirectWithSettingsApplied(){
    startGameButton.addEventListener('click',event => {
  
        if (cropPlayerJerseysCheckBox.checked){
            window.location.replace("game.html?cropPlayerJerseys=true");
        } else{
            window.location.replace("game.html");
        }

  
    })
}


function updatePlayerStatus(money){
  $('#player_status').html('You have $'+money);
}

function checkBetAmount(bet){
  return bet < 5 || bet > 10;
}

function checkNegativeAmount(money, bet){
  var betCheck = money - bet;
  
  return betCheck < 0;
}

function updateGameMessage(msg){
  $('#game_message').html(msg);
}

$( document ).ready(function() {
    
    //player 1 has $100
    var playerMoney = 100;
    updatePlayerStatus(playerMoney);

    $( "#game_form" ).submit(function( event ) {
      event.preventDefault();

      //lock down game
      if(playerMoney < 5){
        return
      }
      
      var guess = +$('#guess').val();
      var bet = +$('#bet').val();
      var error_msg = "";

      if(!$.isNumeric(guess)){
        error_msg += 'Your guess isn\'t a number. ';
      }

      if(checkBetAmount(bet)) {
        error_msg += 'Bets must be between 5 to 10 dollars. ';
      }

      if(checkNegativeAmount(playerMoney, bet)){
        error_msg += 'You don\'t have enough money to bet that amount. ';
      }

      //no errors means normal play
      if(error_msg === ""){

        //number to be guessed
        randomNum = Math.floor((Math.random() * 10) + 1);

        //console.log(randomNum, guess);
        
        switch(guess){
          case randomNum:
            playerMoney += bet
            break;
          case randomNum + 1:
          case randomNum - 1:
            break;
          default:
            playerMoney -= bet
        }

        updatePlayerStatus(playerMoney);

        //let the player know it's over
        if(playerMoney < 5){
          updateGameMessage("Game Over")
        }

      }else{

        updateGameMessage(error_msg);

      }

    });
});

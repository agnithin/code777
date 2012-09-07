
/** @fileOverview functions used my the menu page.

    @author <a href='mailto:nxa1884@g.rit.edu'> Nithin Anand Gangadharan </a>
    @version 1.0
*/

/** Functions used by the menu page
*/

/**
 * function called on clicking start game
 * checks to see the game mode
 * if single player, generates a random player ID and goes to game
 * if multiplayer get a player id from server do one of the below 1.Start a game 2.Join a game (Not yet implemented)
 */
function goToGame(){
	var gameModeElement  = document.getElementById('game_mode');
	var playerId = 0;
	var gameMode = 0;
	
	
	if(gameModeElement.value > 1 ){// multiplayer mode
		//get a unique Player ID
		//$.getJSON("http://www.nithinag.com/services/code777/getnewplayer.php?callback=?", setPlayerId);		
		$.ajax({
	 		type: "GET",
	 		async: true,
	  		cache: false,
	  		url: "http://www.nithinag.com/services/code777/controller.php?method=getNewPlayer",
	  		dataType: "json",
	  		success: setPlayerId
		});
	
		function setPlayerId(data, status){
			playerId = data.playerId;
			gameMode = 1; //multiplayer mode
		}
	}else{
		playerId = Math.floor(Math.random()*994) + 5; //5->999
	}
	
	window.localStorage.setItem("player_id", playerId);
	window.localStorage.setItem("game_mode", gameMode);	

	//$('#go_to_game').click();
	window.location = "game.html";
}
/** @fileOverview Implements <tt>class GameView</tt>.

    @author <a href='mailto:nxa1884@g.rit.edu'> Nithin Anand Gangadharan </a>
    @version 1.0
*/

/** Creates an view for Game
    @class Represents a board in Code 777 Game
      
    @property {Game} game the model game.
    @property {HTMLElement} element generated HTML element.
*/

function GameView(_game){
	this.game = _game;
	this.element = document.createElement('div');
	
	for(var i in this.game.players){
		if(i != this.game.playerId){
			this.element.appendChild(this.drawPlayerRack(this.game.players[i]));
		}
	}
}

/**
 * create a div element for rack. place the cards inside the rack
 * @param _player details of the player
 * @return the HTML element with player details
 */
GameView.prototype.drawPlayerRack = function(_player){
	
	var element = document.createElement("div");
	element.setAttribute("class", "player");
	
	var playerLabel = document.createElement("div");
	playerLabel.setAttribute("class", "player_label");
	var playerLabelText = document.createTextNode(_player.playerName);
	playerLabel.appendChild(playerLabelText);
	
	element.appendChild(playerLabel);
	var playerRack = document.createElement("div");
	playerRack.setAttribute("class", "player_rack");
	
	
	for(var i=0; i<_player.rack.length; i++){
		playerRack.appendChild(this.drawCard(_player.rack[i]));
	}
	element.appendChild(playerRack);
	return element;
};

/**
 * create a new div element for a card
 * @param _card details of the card
 * @returns the HTML element with card details
 */
GameView.prototype.drawCard = function(_card){
	var element = document.createElement('div');
	element.setAttribute('class', 'card');
	element.style.backgroundColor = _card.color;
	var cardText = document.createTextNode(_card.number);
	element.appendChild(cardText);
	return element;
};

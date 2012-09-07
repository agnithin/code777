/** @fileOverview Implements <tt>class Card</tt>.

    @author <a href='mailto:nxa1884@g.rit.edu'> Nithin Anand Gangadharan </a>
    @version 1.0
*/

/** Creates an model for Card
    @class Represents a card in Code 777 Game
      
    @property {Number} number Number on the card.
    @property {String} color Color of the card.
    @property {Number} player if the card is dealt, it contains player id of the player.
    @property {Bool} used if the card has been used.
*/
function Card(_number, _color){
	this.number = _number;
	this.color = _color;
	this.player = 0;
	this.used = false;
	
	//console.log("initialize card: " + this.color + " " + this.number);
}
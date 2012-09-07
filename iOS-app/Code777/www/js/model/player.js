/** @fileOverview Implements <tt>class Player</tt>.

    @author <a href='mailto:nxa1884@g.rit.edu'> Nithin Anand Gangadharan </a>
    @version 1.0
*/

/** Creates an model for Player
    @class Represents a player in Code 777 Game
      
    @property {Number} playerId player id of the player.
    @property {String} playerName Player name f the player.
    @property {Cards[]} rack set of cards that the player holds 
    @property {Number} gamesWon Number of games won my the player; if the count becomes 3 the game is over
*/
function Player(_playerId, _playerName){
	this.playerId = _playerId;
	this.playerName = _playerName;
	this.rack = new Array();
	this.gamesWon = 0;
}

/**
 * find the number of occurrences of a particular card in the deck
 * @param _number number value of the card
 * @param _color color value of the card
 * @return numCards number of occurances of the card
 */
Player.prototype.findCard = function(_number, _color){
	var numCards = 0;
	
	for(var i=0; i<this.rack.length; i++){
		if((this.rack[i].number == _number) && (this.rack[i].color == _color)){
			numCards++
		}
	}
	return numCards;
};

/**
 * find the sum  of all the numbers in the rack
 * @return the sum of all the cards
 */
Player.prototype.sumOfrack = function(){
	var sum = 0;
	for(var i=0; i<this.rack.length; i++){
		sum += this.rack[i].number;
	}
	return sum;
};

/**
 * Calculate the number of different colors in the rack
 * @return the number of different colors in the rack
 */
Player.prototype.numberOfColors = function(){
	var colors = new Array();
	var colorExists = false;
	
	for(var i=0; i<this.rack.length; i++){
		var color = this.rack[i].color;
		if(colors.indexOf(color) == -1){
			colors.push(color);
		}
	}
	return colors.length;
};

/**
 * Calculate the count of different numbers in the rack
 * @return the count of different numbers in the rack
 */
Player.prototype.numberOfDifferentNumbers = function(){
	var numbers = new Array();
	
	for(var i=0; i<this.rack.length; i++){
		var num = this.rack[i].number;
		if(numbers.indexOf(num) == -1){
			numbers.push(num);
		}
	}
	return numbers.length;
};

/**
 * Check if all the numbers in the deck is even
 * @return if all even or not
 */
Player.prototype.isAllNumbersEven = function(){
	var allEven = true;
	for(var i=0; i<this.rack.length; i++){
		if(this.rack[i].number % 2 != 0){
			allEven = false;
		}
	}
	return allEven;
};

/**
 * Check if all the numbers in the deck is odd
 * @return if all odd or not
 */
Player.prototype.isAllNumbersOdd = function(){
	var allOdd = true;
	for(var i=0; i<this.rack.length; i++){
		if(this.rack[i].number % 2 != 1){
			allOdd = false;
		}
	}
	return allOdd;
};

/**
 * Calculate the number of identical cards
 * @return count of identical cards
 */
Player.prototype.numberOfIdenticalCards = function(){
	var identicalCards = 1;
	for(var i=0; i<this.rack.length; i++){
		for(var j=(i+1); j<this.rack.length; j++)
			//console.log(i+":"+j+"|" + this.rack[i].number+this.rack[i].color + "| c2=" + this.rack[j].number + this.rack[j].color);
			if((this.rack[i].number == this.rack[j].number) && (this.rack[i].color == this.rack[j].color)){
				identicalCards++
			}
	}
	return identicalCards;
};

/**
 * check if the all the cards in the deck are consecutive numbers
 * @return if consicutive numbers or not
 */
Player.prototype.isAllNumbersConsecutive = function(){
	var allConsecutive = true;
	var numberArray = new Array();
	
	for(var i=0; i<this.rack.length; i++){
		numberArray.push(this.rack[i].number);
	}
	
	numberArray.sort();
	
	for(var i=0; i<(numberArray.length-1); i++){
		if((numberArray[i]+1) != numberArray[i+1] ){
			allConsecutive = false;
		}
	}
	return allConsecutive;
};
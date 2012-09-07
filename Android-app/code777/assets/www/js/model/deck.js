/** @fileOverview Implements <tt>class Deck</tt>.


    @author <a href='mailto:nxa1884@g.rit.edu'> Nithin Anand Gangadharan </a>
    @version 1.0
*/

/** Creates an model for Deck of cards
    @class Represents a deck in Code 777 Game
      
    @property {Card[]} cards set of cards
*/

function Deck(){
	this.cards = new Array();
	
	for(var i=0; i<defaultDeck.length; i++){
		this.cards.push(new Card(defaultDeck[i].number, defaultDeck[i].color));
	}
}

/**
 * deals a random card to a particular player
 * @param _playerId is the id of the player to deal cards to
 * @return the card that was dealt
 */
Deck.prototype.dealCardToPlayer = function(_playerId){
	do{
		var random = Math.floor(Math.random() * this.cards.length);
	}while(this.cards[random].player != 0);
	
	this.cards[random].player = _playerId;
	console.log("deal card : " + this.cards[random].color + " " + this.cards[random].number + " to player " +_playerId);
	return this.cards[random];
};
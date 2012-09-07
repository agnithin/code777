/** @fileOverview Implements <tt>class DeckView</tt>.

    @author <a href='mailto:nxa1884@g.rit.edu'> Nithin Anand Gangadharan </a>
    @version 1.0
*/

/** Creates an View for the deck of cards; used as a rough sketch of cards that can be used by the player
    @class Represents a view of deck
      
    @property {Deck} deck the model deck.
    @property {HTMLElement} element generated HTML element.
*/

function DeckView(_deck){
	this.deck = _deck;
	this.element = document.createElement('div');
	
	this.draw();
	
}

/**
 * function generates an HTML element with the deck information
 */
DeckView.prototype.draw = function(){
	
	var k=0, t;
	for(var i=1; i<=7 ;i++){
		t = document.createElement("div");
		t.setAttribute("class", "player");
		for(var j=0; j<4; j++){
			var sCard = this.drawCard(this.deck.cards[k++]);
			sCard.onclick = //function(number){ return function a(){alert(number);}}(sCard.number);
			function (sCard){ 
				return function(){$(this).simpledialog({
			    'mode' : 'bool',
			    'prompt' : 'Card ?',
			    'useModal': true,
			    'buttons' : {
			      'Yes': {
			        click: function () {
			          console.log('card selected');
			          sCard.style.fontWeight = 'bold';
			          sCard.style.textDecoration = 'underline';			          
			          sCard.onclick = '';
			        }
			      },
			      'No': {
				        click: function () {
				          console.log('card crossed');
				          sCard.innerHTML= 'X';
				          sCard.style.color = '#000';
				          sCard.style.backgroundColor = '#FFF';
				          sCard.onclick = '';
				        }
				   },
			      'Cancel': {
			        click: function () {
			          console.log('cancelled');
			        },
			        icon: "delete",
			        theme: "b"
			      }
			    }
			  })}
			}(sCard);
			t.appendChild(sCard);				
		}
		this.element.appendChild(t);
	}
}

/**
 * create a new div for a card
 * @param _card the details of the card
 * @return the HTML element with the details of teh card
 */
DeckView.prototype.drawCard = function(_card){
	var element = document.createElement('div');
	element.setAttribute('class', 'card');
	element.style.backgroundColor = _card.color;
	var cardText = document.createTextNode(_card.number);
	element.appendChild(cardText);
	return element;
};

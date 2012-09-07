/** @fileOverview Implements <tt>class Game</tt>.

    @author <a href='mailto:nxa1884@g.rit.edu'> Nithin Anand Gangadharan </a>
    @version 1.0
*/

/** Creates an model for Game
    @class Represents a Code 777 Game
      
    @property {Deck} deck Deck of cards for the game.
    @property {Number} currentPlayer player id of the player whose turn it is.
    @property {Number} playerId player id of the player whose is playing the game.
    @property {Object} players associative array of players of the game.
    @property {Number[]} questionOrder shuffled order of questions to ask.
    @property {AnsweredQuestion[]} answeredQuestion array of AnsweredQuestion objects; contains information of the answered questions.
*/
function Game(){
	this.deck = new Deck();
	this.currentPlayer;// player id of the player whose turn it is;
	this.playerId; //id of the 
	this.players = new Object();
	this.questionOrder = new Array();
	this.answeredQuestion = new Array();
}

/**
 * create a new game
 * @param multiPlayer if the game is sngle player or multiplayer
 */
Game.prototype.createNewGame = function(_multiPlayer){

	if(! _multiPlayer){
		for(var i=1; i<4; i++ ){
			this.players[i]= new Player(i, playerNames[i]);
		}		
		this.playerId = Math.floor(Math.random()*994) + 5; //5->999
		this.players[this.playerId] = new Player(this.playerId, "You");
		this.currentPlayer = this.playerId;
	}
};

/**
 * deal cards to all the players
 */
Game.prototype.dealCards = function(){
	for(var i in this.players){
		this.dealCardsToPlayer(i);
	}	
};

/**
 * deal 3 cards to each player
 * @param _playerId Id of the player to deal cards to
 */
Game.prototype.dealCardsToPlayer = function(_playerId){
	for(var j=0; j<3; j++){ // 3 cards per player
		this.players[_playerId].rack.push(this.deck.dealCardToPlayer(_playerId));
	}
};

/**
 * calculate the number of each color
 * @return colorsSet Array of count of colors
 */
Game.prototype.calculateColors = function(){
	var colorsSet = new Object();
	for(var i in Color){
		colorsSet[i] = 0;
	}		
	for(var i in this.players){
		if(i != this.currentPlayer){
			for(var j=0; j<this.players[i].rack.length; j++){
				colorsSet[this.players[i].rack[j].color] ++;
			}
		}
	}
	return colorsSet; 
}

/**
 * Calculate the distribution of numbers
 *  @return numberSet Array of count of numbers
 */
Game.prototype.calculateNumbers = function(){
	var numberSet = new Object();
	for(var i=1; i<=7; i++){
		numberSet[i] = 0;
	}		
	for(var i in this.players){
		if(i != this.currentPlayer){
			for(var j=0; j<this.players[i].rack.length; j++){
				numberSet[this.players[i].rack[j].number] ++;
			}
		}
	}
	return numberSet; 
}

/**
 * find the number of occurrences of a particular card
 * @return numCards number of occurrences of the card
 */
Game.prototype.findNumberOfOccurances = function(_number, _color){
	var numCards = 0;
			
	for(var i in this.players){
		if(i != this.currentPlayer){
			numCards += this.players[i].findCard(_number, _color)
		}
	}
	return numCards; 
}

/**
 * return id of the next player
 * @return the next player
 */
Game.prototype.getNextPlayer = function(){
	
	var playerIds = new Array();
	var k = 0;
	for(var i in this.players){
		if(i != this.playerId){
			playerIds[k++] = parseInt(i);
		}	
	}
	return playerIds[(playerIds.indexOf(this.currentPlayer) + 1) % playerIds.length];	
}


/**
 * Initialize a new question set
 */
Game.prototype.initializeQuestionSet = function(){
	for(var i=0; i<questionsData.length; i++){
		this.questionOrder[i] = i;
	}
	arrayShuffle(this.questionOrder);
};

/**
 * move to next player and answer the question
 * @return the question that is answered
 */
Game.prototype.answerNextQuestion = function(){
	this.currentPlayer = this.getNextPlayer();
	
	var aQuestion = this.answerQuestion(this.answeredQuestion.length % 23);
	console.log("player:" + this.currentPlayer + "| question:" + aQuestion.question.questionText + "| answered:" + aQuestion.answer);
	this.answeredQuestion.push(aQuestion);
	
	return aQuestion;
};

/**
 * answer a particular question
 * @param _questionId is the question id of the question to be answered
 * @return the question that is answered
 */
Game.prototype.answerQuestion = function(_questionId){	
	var answer;
	
	//Caluclating questions is divided into 4 sets
	if(_questionId < 7){
		answer = this.countRackQuestion(_questionId);
	}else if(_questionId < 11){
		answer = this.countColorsQuestion(_questionId)
	}else if(_questionId < 16){
		answer = this.checkCardQuestion(_questionId);
	}else{
		answer = this.checkColorsQuestion(_questionId);
	}
	
	return new AnsweredQuestion(this.players[this.currentPlayer], new Question(_questionId), answer)
	
};

/**
 * questions 1 - 7
 * @param _questionId is the question id of the question to be answered
 * @return the answer
 */
Game.prototype.countRackQuestion = function(_questionId){
	var numOfRacks = 0;
	
	switch(_questionId){
		case 0: //1.how many racks have sum above 18
		
			for(var i in this.players){
				if(i != this.currentPlayer){
					if(this.players[i].sumOfrack() >= 18){
						numOfRacks++;
					}
				}
			}		
			break;
			
		case 1: //2.how many racks have sum below 12
			for(var i in this.players){
				if(i != this.currentPlayer){
					if(this.players[i].sumOfrack() <= 12){
						numOfRacks++;
					}
				}
			}		
			break;
			
		case 2://3.On how many racks is there the same number in different colors
			for(var i in this.players){
				if(i != this.currentPlayer){
					//fix logic
					if(((3-this.players[i].numberOfDifferentNumbers()) - (this.players[i].numberOfIdenticalCards()-1)) > 1){
						numOfRacks++;
					}
				}
			}		
			break;
			
		case 3: //4.On how many racks are there three different colors?
			for(var i in this.players){
				if(i != this.currentPlayer){
					if(this.players[i].numberOfColors() == 3){
						numOfRacks++;
					}
				}
			}
			break;
			
		case 4: //On how many racks are the numbers either all even or all uneven?
			for(var i in this.players){
				if(i != this.currentPlayer){
					if(this.players[i].isAllNumbersEven() || this.players[i].isAllNumbersOdd()){
						numOfRacks++;
					}
				}
			}		
			break;
			
		case 5: //On how many racks are there at least two identical cards (same number and same color)?
			for(var i in this.players){
				if(i != this.currentPlayer){
					if(this.players[i].numberOfIdenticalCards() > 1){
						numOfRacks++;
					}
				}
			}		
			break;
			
		case 6: //On how many racks do you see three consecutive numbers?
			for(var i in this.players){
				if(i != this.currentPlayer){
					if(this.players[i].isAllNumbersConsecutive()){
						numOfRacks++;
					}
				}
			}
		
			break;
	}
	return numOfRacks;

};

/**
 * Questions 8 - 11
 * @param _questionId is the question id of the question to be answered
 * @return the answer
 */
Game.prototype.countColorsQuestion = function(_questionId){
	var numOfCol = 0;
	switch(_questionId){
		case 7: //How many colors do you see?
		
			var colorSet = this.calculateColors();
			for(var i in colorSet){
				if(colorSet[i] != 0){
					numOfCol ++;
				}
			}
			break;
		case 8: //How many colors appear at least three times?
			var colorSet = this.calculateColors();
			for(var i in colorSet){
				if(colorSet[i] >=3){ 
					numOfCol ++;
				}
			}
		
			break;
		case 9: //How many numbers are missing
			var numberSet = this.calculateNumbers();
			for(var i in numberSet){
				if(numberSet[i] == 0){ 
					numOfCol ++;
				}
			}
		
			break;
		case 10: //How many of the following cards do you see: green 1, black 5, pink 7?
			numOfCol += this.findNumberOfOccurances(1, Color.green);
			numOfCol += this.findNumberOfOccurances(5, Color.black);
			numOfCol += this.findNumberOfOccurances(7, Color.pink);
			
			break;		
	}
	return numOfCol;

};

/**
 * Questions 12 - 16
 * @param _questionId is the question id of the question to be answered
 * @return the answer 
 */
Game.prototype.checkCardQuestion = function(_questionId){
	var leftValue = 0;
	var rightValue = 0;
	
	switch(_questionId){
		case 11: //12. Do you see more 3s or more pink 6s?		
			var numSet = this.calculateNumbers();
			leftValue = numSet[3];
			rightValue = this.findNumberOfOccurances(6, Color.pink);
			break;
			
		case 12: //13. Do you see more green 6s or more yellow 7s? 
			leftValue = this.findNumberOfOccurances(6, Color.green);
			rightValue = this.findNumberOfOccurances(6, Color.yellow);		
			break;
			
		case 13: //14. Do you see more 2s or more yellow 7s?
			var numSet = this.calculateNumbers();
			leftValue = numSet[2];
			rightValue = this.findNumberOfOccurances(7, Color.yellow);		
			break;
			
		case 14: //15. Do you see more pink 6s or more green 6s?
			leftValue = this.findNumberOfOccurances(6, Color.pink);
			rightValue = this.findNumberOfOccurances(6, Color.green);
			break;
			
		case 15: //16. Do you see more blue 7s or more 7s of other colors?
			leftValue = this.findNumberOfOccurances(7, Color.blue);
			var numSet = this.calculateNumbers();
			rightValue = numSet[7] - leftValue;
			break;	
	}
	
	if(leftValue == rightValue){
		return '=';
	}else if(leftValue < rightValue){
		return '<';
	}else{
		return '>';
	}
};

/**
 * Questions 17 - 23
 * @param _questionId is the question id of the question to be answered
 * @return the answer 
 */
Game.prototype.checkColorsQuestion = function(_questionId){
	var leftValue = 0;
	var rightValue = 0;
	var colorSet = this.calculateColors();
	
	switch(_questionId){
		case 16: //17. Do you see more brown or more blue numbers?			
			leftValue = colorSet[Color.brown];
			rightValue = colorSet[Color.blue];;
			break;
			
		case 17: //18. Do you see more red or more pink numbers?
			leftValue = colorSet[Color.red];
			rightValue = colorSet[Color.pink];;
			break;
			
		case 18: //19. Do you see more green or more blue numbers?
			leftValue = colorSet[Color.green];
			rightValue = colorSet[Color.blue];;
			break;
			
		case 19: //20. Do you see more yellow or more pink numbers?
			leftValue = colorSet[Color.yellow];
			rightValue = colorSet[Color.pink];;			
			break;
			
		case 20: //21. Do you see more black or more brown numbers?
			leftValue = colorSet[Color.black];
			rightValue = colorSet[Color.brown];;
			break;
			
		case 21: //22. Do you see more black or more red numbers?
			leftValue = colorSet[Color.black];
			rightValue = colorSet[Color.red];;
			break;
			
		case 22: //23. Do you see more green or more yellow numbers?
			leftValue = colorSet[Color.green];
			rightValue = colorSet[Color.yellow];;
			break;
	}

	if(leftValue == rightValue){
		return '=';
	}else if(leftValue < rightValue){
		return '<';
	}else{
		return '>';
	}
};

/**
 * Check if the players guess is correct
 * @param _number1 is the number on the first card
 * @param _color1 is the color on the first card
 * @param _number2 is the number on the second card
 * @param _color2 is the color on the second card
 * @param _number3 is the number on the third card
 * @param _color3 is the color on the third card
 * @return if the guess is right
 */
Game.prototype.checkGuess = function(_number1, _color1, _number2, _color2, _number3, _color3){
	var isGuessRight = false;
	console.log(_number1+","+ _color1+","+ _number2+","+ _color2+","+ _number3+","+ _color3);
	if((this.players[this.playerId].findCard(_number1, _color1) > 0) && 
			(this.players[this.playerId].findCard(_number2, _color2) > 0) &&
			(this.players[this.playerId].findCard(_number3, _color3) > 0) ){
		
		this.players[this.playerId].gamesWon++;
		isGuessRight = true;
	}
	this.players[this.playerId].rack = new Array();
	this.dealCardsToPlayer(this.playerId);
	
	return isGuessRight;
}

/**
 * check if the player has won 3 games
 * @return if the game is over
 */
Game.prototype.isGameOver = function(){
	if(this.players[this.playerId].gamesWon == 3 ){
		return true;
	}else{
		return false;
	}
}
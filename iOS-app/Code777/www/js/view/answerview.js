/** @fileOverview Implements <tt>class AnswerView</tt>.

    @author <a href='mailto:nxa1884@g.rit.edu'> Nithin Anand Gangadharan </a>
    @version 1.0
*/

/** Creates an View for Answers
    @class Represents a player in Code 777 Game
      
    @property {Game} game the model game.
    @property {HTMLElement} element generated HTML element.
*/

function AnswerView(_game){
	this.game = _game;
	this.element = document.createElement('table');
	
	this.draw(this.game.answeredQuestion)
}

/**
 * generate HTML element for the list of answers
 * @param _aQuestionList list of questions
 */
AnswerView.prototype.draw = function(_aQuestionList){
	for(var i=0; i<_aQuestionList.length; i++){
		this.drawQuestion(_aQuestionList[i]);
	}
	
}

/**
 * adds a row with the question information
 * @param _aQuestion details of the answered question
 */
AnswerView.prototype.drawQuestion = function(_aQuestion){	
	
	var answerElement = document.createElement('tr');
	answerElement.setAttribute('class', 'player_answer');
	
	var aPlayerNameElement = document.createElement('td');
	aPlayerNameElement.setAttribute('class', 'a_player_name');
	aPlayerNameElement.appendChild(document.createTextNode(_aQuestion.player.playerName));
	answerElement.appendChild(aPlayerNameElement);
	
	var aQuestionElement = document.createElement('td');
	aQuestionElement.setAttribute('class', 'a_question');
	aQuestionElement.appendChild(document.createTextNode(_aQuestion.question.questionText));
	answerElement.appendChild(aQuestionElement);
	
	var aAnswerElement = document.createElement('td');
	aAnswerElement.setAttribute('class', 'a_answer');
	aAnswerElement.appendChild(document.createTextNode(_aQuestion.answer));
	answerElement.appendChild(aAnswerElement);
	
	this.element.appendChild(answerElement);
}
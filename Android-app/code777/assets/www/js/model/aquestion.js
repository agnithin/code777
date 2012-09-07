/** @fileOverview Implements <tt>class AnsweredQuestion</tt>.

    @author <a href='mailto:nxa1884@g.rit.edu'> Nithin Anand Gangadharan </a>
    @version 1.0
*/

/** Creates an model for the question that is answered
    @class Represents an answered question in Code 777 Game
      
    @property {Question} question question that has been answered
    @property {Player} player Player who has answered the question.
    @property {String} answer of the question.
    
*/

function AnsweredQuestion( _player, _question, _answer){
	this.question = _question;
	this.player = _player;
	this.answer = _answer;
}
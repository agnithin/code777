/** @fileOverview Implements <tt>class Question</tt>.

    @author <a href='mailto:nxa1884@g.rit.edu'> Nithin Anand Gangadharan </a>
    @version 1.0
*/

/** Creates an model for Question
    @class Represents a question in Code 777 Game
      
    @property {Number} questioId id of the question
    @property {String} questionText the question text
*/

function Question(_questionId){
	this.questioId = _questionId;
	this.questionText = questionsData[_questionId];		
}
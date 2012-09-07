/** @fileOverview <tt>Controller</tt>.

    @author <a href='mailto:nxa1884@g.rit.edu'> Nithin Anand Gangadharan </a>
    @version 1.0
*/

/** Creates an Controller
    @class Represents a Controller in Code 777 Game
*/

//$(document).bind("deviceready", function(){
	$( document ).delegate("#game", "pagecreate", function() {
	
		var playerId = parseInt(window.localStorage.getItem("player_id"));
		
		initializeGestures();
		gameInit();
	});
//});
	
	/**
	 * Functions initializes swipe guestures to swipe through pages
	 * Page Order: Answers, Main Game, Rough, Notes
	 */
	function initializeGestures(){
		$('#answers').bind('swipeleft', function(){			
			$.mobile.changePage($('#game'), {transition: "slide", reverse: false}, false, true);
		});
		
		$('#game').bind('swiperight', function(){			
			$.mobile.changePage($('#answers'), {transition: "slide", reverse: true}, false, true);
		});
		$('#game').bind('swipeleft', function(){			
			$.mobile.changePage($('#rough'), {transition: "slide", reverse: false}, false, true);
		});
		
		$('#rough').bind('swiperight', function(){			
			$.mobile.changePage($('#game'), {transition: "slide", reverse: true}, false, true);
		});
		$('#rough').bind('swipeleft', function(){			
			$.mobile.changePage($('#notes'), {transition: "slide", reverse: false}, false, true);
		});
		
		$('#notes').bind('swiperight', function(){			
			$.mobile.changePage($('#rough'), {transition: "slide", reverse: true}, false, true);
		});			
	}
	
	/**
	 * Initialize and start the game
	 */
	function gameInit(){
		game = new Game();
		game.createNewGame();
		game.dealCards();
		game.initializeQuestionSet();
		
		gameBoard = new GameView(game);	
		var cardTable = document.getElementById('card_table');
		cardTable.appendChild(gameBoard.element);
		
		guessBoard = new DeckView(new Deck());
		var roughGuess = document.getElementById('rough_guess');
		roughGuess.appendChild(guessBoard.element);
		
		var answerList = document.getElementById('answers_list')
		qList = new AnswerView(game);
		answerList.appendChild(qList.element);				
	}
	
	/**
	 * function called when next move button is called
	 */
	function nextMove(){
		var aQuestion = game.answerNextQuestion();
		Dialog(aQuestion);
		qList.drawQuestion(aQuestion);		
	}
	
	/**
	 * called when the check Guess button is pressed
	 */
	function checkGuess(){
		var cardOneNumber = document.getElementById('card_one_number');
		var cardOneColor = document.getElementById('card_one_color');
		
		var cardTwoNumber = document.getElementById('card_two_number');
		var cardTwoColor = document.getElementById('card_two_color');
		
		var cardThreeNumber = document.getElementById('card_three_number');
		var cardThreeColor = document.getElementById('card_three_color');
		
		if (game.checkGuess(cardOneNumber.value, cardOneColor.value, cardTwoNumber.value, cardTwoColor.value, cardThreeNumber.value, cardThreeColor.value)){
			if(game.isGameOver()){
				$("#check_guess_button").simpledialog({
				    'mode' : 'bool',
				    'prompt' : 'Congrats! Your Won the Game',
				    'useModal': true,
				    'buttons' : {
				      'OK': {
				        click: function () {
				         window.location = "index.html";
				        }
				      }
				    }
				  });
			}else{
				$("#check_guess_button").simpledialog({
				    'mode' : 'bool',
				    'prompt' : "Correct Guess",
				    'useModal': true,
				    'buttons' : {
				      'OK': {
				        click: function () {
				        	$.mobile.changePage($('#game'), 'slidedown', false, true);
				        }
				      }
				    }
				  });
			}
		}else{
			$("#check_guess_button").simpledialog({
			    'mode' : 'bool',
			    'prompt' : "Wrong Guess",
			    'useModal': true,
			    'buttons' : {
			      'OK': {
			        click: function () {
			        	$.mobile.changePage($('#game'), 'slidedown', false, true);
			        }
			      }
			    }
			  });
		}
	}
	
	
	
	$( document ).delegate("#make_guess", "pagecreate", function() {	
		initializeForm();		
	});

	/**
	 * populate the guess cards form with values of all colors and numbers
	 */
	function initializeForm(){
		var cardOneNumber = document.getElementById('card_one_number');
		var cardOneColor = document.getElementById('card_one_color');
		
		var cardTwoNumber = document.getElementById('card_two_number');
		var cardTwoColor = document.getElementById('card_two_color');
		
		var cardThreeNumber = document.getElementById('card_three_number');
		var cardThreeColor = document.getElementById('card_three_color');		
		
		for(var i in Color){
			cardOneColor.appendChild(createOption(i));
			cardTwoColor.appendChild(createOption(i));
			cardThreeColor.appendChild(createOption(i));
		}
		
		for(var i=1; i<8; i++){
			cardOneNumber.appendChild(createOption(i));
			cardTwoNumber.appendChild(createOption(i));
			cardThreeNumber.appendChild(createOption(i));
		}
	}
	
	/**
	 * creates an option element for the form
	 * @param _val
	 * @return HTMLElement of the created option
	 */
	function createOption(_val){
		var tNum = document.createElement('option');
		tNum.setAttribute('value', _val);
		tNum.appendChild(document.createTextNode(_val));
		return tNum;
	}
	
	
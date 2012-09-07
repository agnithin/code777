/** @fileOverview Holds all the hard coded data in the game.

    @author <a href='mailto:nxa1884@g.rit.edu'> Nithin Anand Gangadharan </a>
    @version 1.0
*/

/**
 * set of questions
 */
var questionsData = new Array( 
							"On how many racks is the sum of the numbers 18 or more?", 
							"On how many racks is the sum of the numbers 12 or less?", 
							"On how many racks is there the same number in different colors, e.g., a blue 7 and a yellow 7?",  
							"On how many racks are there three different colors?",  
							"On how many racks are the numbers either all even or all uneven?",  
							"On how many racks are there at least two identical cards (same number and same color)?",  
							"On how many racks do you see three consecutive numbers?", 
							
							"How many colors do you see?",  
							"How many colors appear at least three times?",  
							"How many numbers are missing?",  
							"How many of the following cards do you see: green 1, black 5, pink 7?",
 
							"Do you see more 3s or more pink 6s?",  
							"Do you see more green 6s or more yellow 7s?",  
							"Do you see more 2s or more yellow 7s?",  
							"Do you see more pink 6s or more green 6s?",  
							"Do you see more blue 7s or more 7s of other colors?", 
							
							"Do you see more brown or more blue numbers?",  
							"Do you see more red or more pink numbers?",  
							"Do you see more green or more blue numbers?",  
							"Do you see more yellow or more pink numbers?",  
							"Do you see more black or more brown numbers?",  
							"Do you see more black or more red numbers?",  
							"Do you see more green or more yellow numbers?"
							);

/**
 * colors for the cards
 */
var Color = {
		green : 'green',
		yellow : 'yellow',
		black : 'black',
		brown : 'brown',
		red : 'red',
		pink : 'pink',
		blue : 'blue',
		yellow : 'yellow'
	};

/**
 * default deck of cards
 */
var defaultDeck = [
                {number:1, color:Color.green},
                
                {number:2, color:Color.yellow}, 
                {number:2, color:Color.yellow},
                
                {number:3, color:Color.black},
                {number:3, color:Color.black},
                {number:3, color:Color.black},
                
                {number:4, color:Color.brown},
                {number:4, color:Color.brown},
                {number:4, color:Color.brown},
                {number:4, color:Color.brown},
                
                {number:5, color:Color.red},
                {number:5, color:Color.red},
                {number:5, color:Color.red},
                {number:5, color:Color.red},
                {number:5, color:Color.black},
                
                {number:6, color:Color.pink},
                {number:6, color:Color.pink},
                {number:6, color:Color.pink},
                {number:6, color:Color.green},
                {number:6, color:Color.green},
                {number:6, color:Color.green},
                
                {number:7, color:Color.pink},
                {number:7, color:Color.yellow},
                {number:7, color:Color.yellow},
                {number:7, color:Color.blue},
                {number:7, color:Color.blue},
                {number:7, color:Color.blue},
                {number:7, color:Color.blue},
                ];

/**
 * array of default player names
 */
var playerNames = new Array(
					"North", 
					"East", 
					"West", 
					"South"
					);

/**
 * function to shuffle an array
 * @param theArray array to be shuffled
 */
function arrayShuffle(theArray) {
 	var len = theArray.length;
	var i = len;
	 while (i--) {
	 	var p = parseInt(Math.random()*len);
		var t = theArray[i];
  		theArray[i] = theArray[p];
	  	theArray[p] = t;
 	}
};

/*
Array.prototype.shuffle = function() {
 	var len = this.length;
	var i = len;
	 while (i--) {
	 	var p = parseInt(Math.random()*len);
		var t = this[i];
  	this[i] = this[p];
  	this[p] = t;
 	}
}; 
*/
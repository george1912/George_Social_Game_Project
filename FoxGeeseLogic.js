/*jslint devel: true, indent: 2 */
/*global console */

/*Gameboard repersentation
fox = x = 1
geese = o = 13
  0  1   2  3  4  5  6
0		  [g] [g] [g]
1		  [g] [g] [g]
2 [g] [g] [g] [g] [g] [g] [g]
3 [ ] [ ] [ ] [x] [ ] [ ] [ ]
4 [ ] [ ] [ ] [ ] [ ] [ ] [ ]
5 		  [ ] [ ] [ ] 
6  		  [ ] [ ] [ ] 
*/

/*fox wins if there are less than 6 geese "o" on the board
/* fox can eat a piece of 
/* geese win if the fox is unable to move two spaces in any direction */

/*
 * We need a function to create the board preset with items Fox geese empty spaces and blank unused spaces
 */

var horz= 6; //rows
var vert= 6; // columns



function createBoard (board) {
var board = [
			  [B,B,B,g,g,g,B,B,B],
			  [B,B,B,g,g,g,B,B,B],
			  [B,B,B,g,g,g,B,B,B],
			  [g,g,g,g,g,g,g,g,g],
			  [E,E,E,E,E,E,E,E,E],
			  [E,E,E,E,f,E,E,E,E]
			  [B,B,B,E,E,E,B,B,B],
			  [B,B,B,E,E,E,B,B,B]
			  [B,B,B,E,E,E,B,B,B]
			];

	}
	
			

var isMoveOk = (function () {
  'use strict';

  function isEqual(object1, object2) {
    return JSON.stringify(object1) === JSON.stringify(object2);
  }

  function copyObject(object) {
    return JSON.parse(JSON.stringify(object));
  }
   
   
   
   
  /* We return a winner for the fox to see if there are less than 6 geese in the board*/
  /*for this we need to check how many geese there are on the board they do not need to be in 
  any specific positions so we just run through the array and count the 'g' items on the list*/

function FoxIsTheWinner(board) {
    var boardString = '';
    var i;
    var j;
    for (i = 0; i <= board.length; i++)
    {
    		j = 0;
    		if  (board.length = 'g', j++)  
    		
    		if (j <=6)
    		return "Fox is the winner";
    		
    		};
    };
    
    
    
/*This is where things become more complicated we need to check the winners for geese
 in or to check whether there are geese on the side of the fox
 two in front, two in back, two side to side, and two diagonal to it
 or course there are situations where the fox can be cornered so you don't need them in back of them
 They I see it is check to see where the fix item is check is there can be a place on the arrays for a geese
 if the fox is in the center of the board, lets say row 3, column 4 we need to fill the row 2,1 in the column 4 with 
 geese
 now since the board is a cross and we need to keep the arrays similar I have but dummy values in the array known as
 b which means blank and cannot be move to or used 
 E means values that are Empty I kept it as char values for consitencey 
 */
    
    
   
    
    
    function GeeseIsTheWinner(board) {
    	    var boardString = '';
    	    var count=0;
/*i = row 
 *j= col
 */
    	    for ( var i = 0; i <=6; i++) 
    	    {

    	      for ( var j = 0; j <= 6; j++) {
    	       if ( board['f']=board[['g'],['g']][['g'],['g']] )
    	    	   return "Geese wins";
    	      }
 /*essentially we see where the fox is and check if the there are two geese in the [][] arrays on the same line
  * and top and bottom we need to see if there are to geese I still need to check the corners and find a better way
  * than constantly checking a filled board
  * its not a perfect implimentation and I plan to improve this with more tests
  */    	      
    	      }
    	    }
       }
    	    

function createMove(board, row, col, turnIndexBeforeMove) {
    var boardAfterMove = copyObject(board);
boardAfterMove[row][col] = turnIndexBeforeMove === 0 ? 'f' : 'g';
    var winner = FoxIsTheWinner(boardAfterMove);
    var winner = GeeseIsTheWinner(boardAfterMove);
    
    var firstOperation;
    if (winner !== '' || (board)) {
      /*there has to be a winner while the geese can die the fox will eventually win so we do not have a tie
       * state and have to continue the game
       */
    } else {
      //here we are setting the turns 
      firstOperation = {setTurn: {turnIndex: 1 - turnIndexBeforeMove}};
    }
    return [firstOperation,
            {set: {key: 'board', value: boardAfterMove}},
            {set: {key: 'delta', value: {row: row, col: col}}}];



    function isMoveOk(params) {
     var move = params.move; 
     var turnIndexBeforeMove = params.turnIndexBeforeMove; 
     var stateBeforeMove = params.stateBeforeMove; 
    	
    
    var deltaValue = move[2].set.value;
    var row = deltaValue.row;
    var col = deltaValue.col;
    var board = stateBeforeMove.board;
    if (board === undefined) {
    	
    	
    	
    	        /*here lets create the initial it will */
    	        board = [
    	   			  [B,B,B,g,g,g,B,B,B],
    				  [B,B,B,g,g,g,B,B,B],
    				  [B,B,B,g,g,g,B,B,B],
    				  [g,g,g,g,g,g,g,g,g],
    				  [E,E,E,E,E,E,E,E,E],
    				  [E,E,E,E,f,E,E,E,E]
    				  [B,B,B,E,E,E,B,B,B],
    				  [B,B,B,E,E,E,B,B,B],
    				  [B,B,B,E,E,E,B,B,B]
    				];
    	      }
          // One can only make a move in an empty position 
    	      if (board[row][col] !== 'E') {
    	        return false;
    	      }
    	      
    	      var expectedMove = createMove(board, row, col, turnIndexBeforeMove);
    	      if (!isEqual(move, expectedMove)) {
    	        return false;
    	      }
    	    } catch (e) {
    	      // YOU CAN'T DO THAT BUT IF YOU CAN'T BUT YOU SHOULD THEN I NEED TO DOUBLE CHECK MY CODE
    	      return false;
    	    }
    	    return true;
    	  }
    	
    	  // "Manual testing" --- expected result is [true, true, true, false].
		//Here I will be doing some manual testing remember we must move the F or G piece, fox moves first
    	  console.log(
    	    [ // Check if placing 'f' in 2x5 from initial state.
    	      isMoveOk({turnIndexBeforeMove: 0, stateBeforeMove: {}, 
    	        move: [{setTurn: {turnIndex : 1}},
    	          {set: {key: 'board', value: 
    	        	  [
    	        	  [B,B,B,g,g,g,B,B,B],
    				  [B,B,B,g,g,g,B,B,B],
    				  [B,B,B,g,g,g,B,B,B],
    				  [g,g,g,g,g,g,g,g,g],
    				  [E,E,E,E,E,E,E,E,E],
    				  [E,E,E,E,f,E,E,E,E]
    				  [B,B,B,E,E,E,B,B,B],
    				  [B,B,B,E,E,E,B,B,B],
    				  [B,B,B,E,E,E,B,B,B]
    	        	  ]
    	        }},
    	          {set: {key: 'delta', value: {row: 2, col: 6}}}]}),
    	      // Check placing f in 2x5 from previous state.   
    	      isMoveOk({turnIndexBeforeMove: 1, 
    	        stateBeforeMove: {board: [
    	                                  [B,B,B,g,g,g,B,B,B],
    	                                  [B,B,B,g,g,g,B,B,B],
    	                                  [B,B,B,g,g,g,B,B,B],
    	                                  [g,g,g,g,g,g,g,g,g],
    	                                  [E,E,E,E,E,E,E,E,E],
    	                                  [E,E,E,E,E,E,E,E,E]
    	                                  [B,B,B,E,f,E,B,B,B],
    	                                  [B,B,B,E,E,E,B,B,B],
    	                                  [B,B,B,E,E,E,B,B,B]
    	                                  
    	                                  ],
    	                                  delta: {row: 2, col: 6}}, 
    	    /* here things get a little different we need to move our g into an empty space it can be any g
    	     * 
    	     */                              
            move: [{setTurn: {turnIndex : 0}},
    	          {set: {key: 'board', value: [
    	                                       
    	                                  [B,B,B,g,g,g,B,B,B],
    	                                  [B,B,B,g,g,g,B,B,B],
    	                                  [B,B,B,g,g,g,B,B,B],
    	                                  [g,g,E,g,g,g,g,g,g],
    	                                  [E,E,g,E,E,E,E,E,E],
    	                                  [E,E,E,E,E,E,E,E,E]
    	                                  [B,B,B,E,f,E,B,B,B],
    	                                  [B,B,B,E,E,E,B,B,B],
    	                                  [B,B,B,E,E,E,B,B,B]
    	                                       
    	                                       ]
            
            
            
            }},
            //Delta changes for our goose 
    	          {set: {key: 'delta', value: {row: 4, col: 2}}}]}),
    	      // Check end game where geese wins. Remember  
    	      isMoveOk({turnIndexBeforeMove: 0, 
    	        stateBeforeMove: {board: [
    	                                  
											[B,B,B,E,g,E,B,B,B],
											[B,B,B,g,g,E,B,B,B],
											[B,B,B,g,E,E,B,B,B],
											[e,E,E,g,E,g,g,E,E],
											[E,E,E,E,g,E,g,E,E],
											[E,E,E,g,g,g,E,E,E]
											[B,B,B,g,f,g,B,B,B],
											[B,B,B,g,g,g,B,B,B],
											[B,B,B,E,g,E,B,B,B]
											    	                                  
    	                                  
    	                                  ], 
    	                                  delta: {row: [4,5,6],  col:[ 3,4,5 ]}}, 
            move: [{endMatch: {endMatchScores: [1, 0]}},
    	          {set: {key: 'board', value: [
    	                                       
											[B,B,B,E,g,E,B,B,B],
											[B,B,B,g,g,E,B,B,B],
											[B,B,B,g,E,E,B,B,B],
											[e,E,E,g,E,g,g,E,E],
											[E,E,E,E,g,E,g,E,E],
											[E,E,E,g,g,g,E,E,E]
											[B,B,B,g,f,g,B,B,B],
											[B,B,B,g,g,g,B,B,B],
											[B,B,B,E,g,E,B,B,B]
    	                                       
    	                                       
    	                                       ]}},
    	          {set: {key: 'delta', value: {row: [4,5,6],  col:[ 3,4,5 ]  }};
    	          ]);
                        	   
    	      return isMoveOk;
    	       
    	  
    
    	 
    	      
/**
   * This is the logic for Fox and Hounds. The game board is represented as a
   * two dimensional array (8*8). All elements are listed below:
   *
   * For empty squares of the board:
   * 'RS': red square (Can not hold any piece)
   * BS: black square (Can hold a piece)
   *
   * There are 2 kinds of piece of the game:
   * F: FOX
   * H: HOUND
   *There are 4 HOUND Pieces
   *They start at the top of board filling 4 BLACK SQUARES
   *The HOUND can only move forward to a black square
   *There is one FOX Piece
   *The Fox start at the first black square at the bottom of the board
   *The Fox wins if he can make it into any of the hounds original starting squares
   *The Hound wins if the hound can trap the fox in a position it cannot escape
   *
   * Example - The initial state:
   *
   *             0     1     2     3     4     5     6     7
   * 0:even  [['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
   * 1:odd    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
   * 2:even   ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
   * 3:odd    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
   * 4:even   ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
   * 5:odd    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
   * 6:even   ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
   * 7:odd    ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']]
   *
   * The number of row and col are both zero based, so the first row
   *       and column are both even.
   *
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *



/*jslint devel: true, indent: 2 */
/*global console */
var isMoveOk = (function () {
  'use strict';

  function isEqual(object1, object2) {
    return JSON.stringify(object1) === JSON.stringify(object2);
  }

  function copyObject(object) {
    return JSON.parse(JSON.stringify(object));
  }

  var turnIndex = 0;
  // turn index is at 0 this means that the FOX plays first
  // when turn index changes to 1 that means its the HOUNDS term

  var board = [['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
              ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
              ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
              ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
              ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
              ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
              ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
              ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
  ];

  //we need to organize this via rows and columns so I will make variables for them and set them to zero
  var row = 0;
  var col = 0;

 // so in order to manage everything I will be having 5 deltas
 //H1-4, which represent where the hounds are
 //F which is the fox piece
 // we will have to and from which we will set as the first moves you can make for any piece which is forward movement

// starting place of where the hounds are
var DeltaFromH1 = board [0][1];
var DeltaFromH2 = board [0][3];
var DeltaFromH3 = board [0][5];
var DeltaFromH4 = board [0][7];

//Movement place of the Hound Pieces for now they are zero because they are not set

var DeltaToH1 = 0;
var DeltaToH2 = 0;
var DeltaToH3 = 0;
var DeltaToH4 = 0;

//starting place of the Fox
var DeltaFromF1 = board [7][0];

// The only place the Fox can move to since he can't skip a turn and stay in the same place is our DeltaTo

var DeltaToF1 = 0;

//We have to understand which moves are legal to do
//Hound can only move forward
//Fox can move in any direction
//No pieces are eaten

//Function hound can only move to one BS square that is a row below him and one space to either left or the right of Hound
//we will need to take in the board, row, col, and a DeltaFrom, and a DeltaTo it is set to 0 so it doesnt matter
//Its a place holder



function isHoundMoveLegal(board, row, col, DeltaFromH, DeltaToH)
{
	//DeltaTo is the place where we want to go select my row and col

	DeltaToH= board[row][col];

	//deltaFrom will be where we choose our hound


	//We create a Legal move token that will be the starting position
	//+1, -1, and +1,-1


    //LegalDeltaTowardsLeftH = DeltaFromH+1-1;

    //LegalDeltaTowardsRightH= DeltaFromH [+1][+1];

    // have to first check is the position regardless of whether legal or not is a BS or F since
    //that is on a BS part of the board


 if (DeltaToH='BS' || 'F'){

	 	DeltaFromH = DeltaToH;
    	return "Move is going to correct color";
 }

 // now we check if it is legal
    //else if (DeltaToH = LegalDeltaTowardsLeftH){

    	//Update or deltaFrom since we have 4 deltaFroms this is a good solution

    	//DeltaFromH=DeltaToH;
    	//"Move Left move is legal";

    //} else if (DeltaToH=LegalDeltaTowardsRightH){
    	//Update or deltaFrom since we have 4 deltaFroms this is a good solution this refers to the right
    	//DeltaFromH=DeltaToH;
    	//"Move right is legal";
    //}

    else{
    	//Anything else, RS or out of bounds is simply not legal
    	return "Move is illegal";
    }




        }


//Now we have to do the same thing for our Fox, Similar to the hound we will be using the same logic
//The only difference is that he can move forwards and backwards so we need to have different situations


function isFoxMoveLegal(board, row, col, DeltaFromF, DeltaToF)
{

	DeltaToF= board[row][col];



 if (DeltaToF='BS' || 'H'){

	 	DeltaFromF = DeltaToF;
    	return "Move is going to correct color";
 }



    else{
    	//Anything else, RS or out of bounds is simply not legal
    	return "Move is illegal";
    }




        }


//Need help adding logic to find which moves are legal other than colored squares

//GET WINNER
//Here we will be looking at getting win conditions for the game, there are two types of win conditions, Fox and Hounds
//The Foxes win conditions are easy we find his position using a for loop to search through the entire board
//find his position and check if he is in one of 4 hound places I can use a switch statement for this can this returns the winner


// Here we can see the row and col of an Char value we input
	function getposForFoxOrHound(board, char) {
	    var i, j, collection = [];
	    for (i = 0; i < board.length; i++) {
	      for (j = 0; j < board[i].length; j++) {
	        if(board[i][j] == char) {
	            collection.push({row:i, col:j});
	        }
	      }
	    }
	    return collection;
	  }


	function getChar(board, c) {
	    var i, j, collection = [];
	    for (i = 0; i < board.length; i++) {
	      for (j = 0; j < board[i].length; j++) {
	        if(board[i][j] == c)
	            collection.push({row:i, col:j});
	      }
	    }
	    return collection;
	}


	// to see the winner we need to check where all of our elements are
	function getWinner(board, DeltaFromF, DeltaFromHA, DeltaFromHB, DeltaFromHC, DeltaFromHD)

	{

		getChar(board, 'F');
		getChar(board, 'H');

	//fox is the winner if his delta from matches any H position on the board

	if (DeltaFromF= 'H'){
		return "Fox is the Winner";
	}

	//Fox wins if the hounds delta from
	else if ((DeltaFromHA = board[7][0])
			&& (DeltaFromHB = board[7][2])
			&& (DeltaFromHC = board[7][4])
			&& (DeltaFromHD = board[7][6]))
	{

		return "Fox is the Winner because the hounds are stuck";
	}

	else return "The fox is not the winner...yet!";


	}


	 function createMove(board, row, col, turnIndexBeforeMove) {
		    var boardAfterMove = copyObject(board);
		    boardAfterMove[row][col] = turnIndexBeforeMove === 0 ? 'F' : 'H';
		    var winner = getWinner(boardAfterMove);
		    var firstOperation;


		      // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
		      firstOperation = {setTurn: {turnIndex: 1 - turnIndexBeforeMove}};



		    return [firstOperation,
		            {set: {key: 'board', value: boardAfterMove}},
		            {set: {key: 'delta', value: {row: row, col: col}}}];
		  }






})();

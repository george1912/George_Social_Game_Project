<!DOCTYPE html>
<html>
<body>
<script type= "text/javascript">

/*
 *Grind representation 
 *	0 1 2 3 4 5 6 
 *0     x x x    
 *1     x x x   
 *2 x x x x x x x 
 *3 x x x x x x x
 *4 x x x x x x x 
 *5     x x x 
 *6     x x x   
 */
 
 //in this game we have a plater with 15 geese and one player has 1 fox
 //the geese will fill up 13 spaces on the board but only on a single side
 // the fox will stay at the center of the board at the position 3,3
 // each player gets a single turn rotating each time
 // a goose can only move one space forward and to the right
 // a fox can move in any direction even including backwards and forwards
 // a fox can eat the geese if there is one space after the geese it can eat multiple geese
 
// Fox: Winning conditions: the fix wins if there are less than 6 geese in play
// Geese: Geese win if the fox is in a position where it can not move 

//number of geese to win the game
 var GeeseToWin=5 // anywhere on the board
 // the place where the fox can be trapped is in the middle of the corners
 
 //[col,row]
 var TrappedLocations= [[0,3], [3,0], [3,6], 6,3]];
 
 //we need to check if the geese are in these locations depending on the corner
 
 var NorthGeesePlacements = [ [2,0],[2,1],[4,0], [4,1], [3,1], [3,2] 
 var SouthGeesePlacements = [ [2,6],[5,2],[5,3], [6,4], [5,4], [4,3] 
 var EastGeesePlacements = [ [6,2],[6,4],[5,2], [5,3], [5,4], [4,3] 
 var WestGeesePlacements = [ [0,2],[0,4],[1,2], [1,4], [1,2], [2,3]
  
 var board:= [
 	[3,4,5,],
 	[3,4,5,],
 	[0,1,2,3,4,5,6,],
 	[0,1,2,3,4,5,6,],
 	[0,1,2,3,4,5,6,],
 	[3,4,5],
 	[3,4,5,]];
 	
 	var playerNum = 2;
 	var 
 	
 	var isMoveOk = (function()
 {
   'use strict';
   
 	
 	function isEqual(object1, object2) {
        console.log(JSON.stringify(object1));
        console.log(JSON.stringify(object2));
        return JSON.stringify(object1) === JSON.stringify(object2);
    }
 
  function copyObject(object) {
        return JSON.parse(JSON.stringify(object));
    }
 function setboard(board){
 
 
 
 
 
 
  

 
 
 
 
 
 
 
 
 
 
 
 </script>
 </body>
 </html>
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
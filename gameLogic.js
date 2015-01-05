'use strict';

angular.module('myApp.gameLogic',[]).service('gameLogic',function(){

    function isEqual(object1, object2) {
        return angular.equals(object1, object2);
    }

    function copyObject(object) {
        return angular.copy(object);
    }


    function getWinner(board){
        var winStringH = JSON.stringify(
                board[7][0]
                + board[7][2] + board[7][4]
                + board[7][6]
        );

        //I create a winning string that will check if H the winner if all pieces are in the bottom row
        if (winStringH === JSON.stringify("HHHH")){
            return "H";
        }

        //fox wins if he is located in any of the to right strings this will create a win condition for the fox
        var winStringF = JSON.stringify(
                board[0][1]
                || board[0][3] || board[0][5]
                || board[0][7]
        );
        if (winStringF === JSON.stringify("F")){
            return "F";
        }
        return '';
    }

    //there is another way for the hound to win than just reaching the end. The hound can box in the fox
    //this was code made from an earlier attempt I was looking at checking where the hound was in relation to the fox.
    //should I add them as extra string win conditionals? For example winStringLeftUp,winStringRighttUp
    /*
     var checkLeftUp = function (board, row, col) {
     var r = row - 1;
     var c = col - 1;
     if (r >= 0 && c >= 0) {
     if (board[r][c] == 'hound') {
     return true;
     } else {
     return false;
     }
     } else {
     return true;
     }
     }
     var checkRightUp = function (board, row, col) {
     var r = row - 1;
     var c = col + 1;
     if (r >= 0 && c < 8) {
     if (board[r][c] == 'hound') {
     return true;
     } else {
     return false;
     }
     } else {
     return true;
     }
     }

     var checkLeftDown = function (board, row, col) {
     var r = row + 1;
     var c = col - 1;
     if (r < 8 && c >= 0) {
     if (board[r][c] == 'hound') {
     return true;
     } else {
     return false;
     }
     } else {
     return true;
     }
     }

     var checkRightDown = function (board, row, col) {
     var r = row + 1;
     var c = col + 1;
     if (r < 8 && c < 8) {
     if (board[r][c] == 'hound') {
     return true;
     } else {
     return false;
     }
     } else {
     return true;
     }
     }
     }
     */




    //function to check if objects are equal
    /*
    function isEqual(object1, object2) {
        return JSON.stringify(object1) === JSON.stringify(object2);
    }
     */


    //check if a move is legal and doesnt go outside the confines of the board
    function checkPosition(row,col,board){
        if(board[row][col] === '' || board[row][col] === undefined){
            console.log("The position of row: " + row + "and col: " + col + "is outside of the board!");
            return false;
        }else{
            return true;
        }
    }


    //movement functions:
    //Fox and hounds can only move to black squares
    //Hound can move only forward but either left or right
    //Fox can move in any direction but I am having trouble putting this in practice this is what I have going now

    function isFoxMove(oldrow,oldcol,row,col){
        //this is for the fox moving backwards
        if( (row==oldrow+1 && col==oldcol+1) || (row==oldrow+1 && col==oldcol-1)){
            console.log("Fox is moving backwards");
            return true;
        }
        else if( (row==oldrow-1 && col==oldcol+1) || (row==oldrow-1 && col==oldcol-1) ){
            console.log("Fox is moving forwards");
            return true;
        }else{
            console.log("You cannot make this move fox can only go forwards of backwards on black squares");
            return false;
        }
    }

    //this is my modified hound move
    function isHoundMove(oldrow,oldcol,row,col){
        //this is for the fox moving backwards
        if( (row==oldrow+1 && col==oldcol+1) || (row==oldrow+1 && col==oldcol-1)){
            console.log("Hound is moving forwards");
            return true;

        }else{
            console.log("You cannot make this move Hound can only go forwards on black squares");
            return false;
        }
    }



    //check what the cell contains I didn't end up using it for my game
    //function isContain(arr,value) {
    //for(var i=0; i<arr.length; i++){
    //if(arr[i][0] == value[0] && arr[i][1] == value[1]){
    //return true;
    //}
    //}
    //return false;
    //}




    function createMove(oldrow,oldcol,row,col,turnIndexBeforeMove,boardBeforeMove,turnIndex){

        if(boardBeforeMove === undefined) {
            boardBeforeMove = [
                ['','','','','','','',''],
                ['H','','H','','H','','H',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','F','','','','','',''],
                ['','','','','','','','']

            ];
        }

        //check the correctness of movement
        if (checkPosition(row,col,boardBeforeMove) === false){  // checkPosition 01 - boundary
            throw new Error("You cannot make a move outside of the board!");
        }
        if(boardBeforeMove[row][col] !== ''){
            throw new Error("One can only make a move in an empty position!");
        }
        //var boardAfterMove = JSON.parse(JSON.stringify(boardBeforeMove));
        var boardAfterMove = copyObject(boardBeforeMove);

        boardAfterMove[row][col] = turnIndexBeforeMove===0?'F' : 'H';	    //Index => 0 than 'F', turnIndex => 1 than 'H'
        if(boardAfterMove[oldrow][oldcol]===boardAfterMove[row][col]){
            boardAfterMove[oldrow][oldcol] = '';
        }else{
            throw new Error("Thats not right!");
        }

        var winner = getWinner(boardAfterMove);
        var firstOperation;

        if(winner !== ''){
            firstOperation = {endMatch: {endMatchScores:
                (winner === 'O' ? [1, 0] : (winner === 'X' ? [0, 1] : [0, 0]))}};

            console.log("player: "+ winner + " WIN!");
        }else{
            firstOperation = {setTurn: {turnIndex: 1 - turnIndexBeforeMove}};
            if(turnIndex !== 1 - turnIndexBeforeMove){
                throw new Error("current Index doesn't match!");
            }
        }

        if (isFoxMove(oldrow,oldcol,row,col)===true){
            console.log("single fox movement");
            return [firstOperation,
                {set: {key: 'board', value: boardAfterMove}},
                {set: {key: 'delta', value: {oldrow: oldrow, oldcol: oldcol, row: row, col: col}}}];
        }
        if (isHoundMove(oldrow,oldcol,row,col)===true){
            console.log("single hound movement");
            return [firstOperation,
                {set: {key: 'board', value: boardAfterMove}},
                {set: {key: 'delta', value: {oldrow: oldrow, oldcol: oldcol, row: row, col: col}}}];
        }
        else{
            console.log("illegal move!");
            throw new Error("Illegal move!");
        }
    }

    //adding in board:
    function getInitialBoard() {
        return [
            ['','','','','','','',''],
            ['H','','H','','H','','H',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','F','','','','','',''],
            ['','','','','','','','']
        ];
    }



    function getExampleMoves(initialTurnIndex, initialState, arrayOfRowColSets){
        var exampleMove = [];
        var state = initialState;
        var turnIndex = initialTurnIndex;
        for(var i=0; i<arrayOfRowColSets.length; i++){
            var rowColSets = arrayOfRowColSets[i];
            var move = createMove(rowColSets.oldrow,rowColSets.oldcol,rowColSets.row, rowColSets.col,turnIndex,state.board,1-turnIndex);
            var stateAfterMove = {board : move[1].set.value, delta : move[2].set.value};
            exampleMove.push({
                stateBeforeMove: state,
                stateAfterMove: stateAfterMove,
                turnIndexBeforeMove: turnIndex,
                turnIndexAfterMove: 1 - turnIndex,
                move: move,
                comment: {en: rowColSets.comment}
            });
            state = stateAfterMove;
            turnIndex = 1 - turnIndex;
        }
        return exampleMove;
    }


    function getExampleGame(){
        return getExampleMoves(0, {}, [
            {oldrow: 6, oldcol: 1, row: 5, col: 0, comment: "Fox makes the first move going forward and too the left"},
            {oldrow: 1, oldcol: 0, row: 2, col: 1, comment: "Hound1 makes the 2nd move going forward and too the right"},
            {oldrow: 5, oldcol: 0, row: 4, col: 1, comment: "Fox makes the 3rd move going forward and too the right"},
            {oldrow: 1, oldcol: 2, row: 2, col: 3, comment: "Hound2 makes the 4th move going forward and too the right"},
            {oldrow: 4, oldcol: 1, row: 3, col: 0, comment: "Fox makes the 5th move going forward and too the left"},
            {oldrow: 2, oldcol: 1, row: 3, col: 2, comment: "Hound1 makes the 6th move going forward and too the left"},
            {oldrow: 3, oldcol: 0, row: 2, col: 1, comment: "Fox makes the 7thth move going forward and too the left"},
            {oldrow: 1, oldcol: 4, row: 2, col: 5, comment: "Hound3 makes the 8th move going forward and too the right"},
            {oldrow: 2, oldcol: 1, row: 1, col: 0, comment: "Fox makes the 9th move going forward and too the right"},
            {oldrow: 1, oldcol: 6, row: 2, col: 7, comment: "Hound4 makes the 10th move going forward and too the right"},
            {oldrow: 1, oldcol: 0, row: 1, col: 0, comment: "Fox makes the 9th move going forward and too the right winning the game"}
        ]);
    }




    function isMoveOk(params){
        try{
            var move = params.move;
            var winflag = move[0].endMatch === undefined? false : true;
            var turnIndexBeforeMove = params.turnIndexBeforeMove;
            var stateBeforeMove = params.stateBeforeMove;
            var turnIndex = winflag === false? move[0].setTurn.turnIndex : 1-turnIndexBeforeMove;

            var deltaValue = move[2].set.value;
            var oldrow = deltaValue.oldrow;
            var oldcol = deltaValue.oldcol;
            var row = deltaValue.row;
            var col = deltaValue.col;
            var boardBeforeMove = stateBeforeMove.board;
            var boardAfterMove = move[1].set.value;

            var expectedMove = createMove(oldrow,oldcol,row,col,turnIndexBeforeMove,boardBeforeMove,turnIndex);
            if(!isEqual(move[1], expectedMove[1]) || !isEqual(move[2], expectedMove[2])){
                return false;
            }
        } catch(e) {
            return false;
        }
        return true;
    }


//return isMoveOk;
    //return {isMoveOk: isMoveOk, getExampleGame: getExampleGame};

    this.getInitialBoard = getInitialBoard;
    this.createMove = createMove;
    this.isMoveOk = isMoveOk;
    this.getExampleGame = getExampleGame;

});

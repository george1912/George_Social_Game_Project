'use strict';

angular.module('myApp.gameLogic',[]).service('gameLogic',function(){

    function isEqual(object1, object2) {
        return angular.equals(object1, object2);
    }

    function copyObject(object) {
        return angular.copy(object);
    }

    function getWinner(row,col,board){

        //fox wins if he is located in any of the to right strings this will create a win condition for the fox
        if (board[row][col] === 'F')
        {
            if (board[0][1] === 'F' || board[0][3] === 'F' || board[0][5] === 'F' || board[0][7] === 'F')
            {
                return 'F';
            }
        }
        else if (board[row][col] === 'H')
        {
            if (board[7][0] === 'H' && board[7][2] === 'H' && board[7][4] === 'H' && board[7][6] === 'H')
            {
                return 'H';
            }
        }
        if (board[7][0] === 'F' && board[6][1] === 'H')
        {
            return 'H';
        }
        else if (board[1][0] === 'F')
        {
            if (board[0][1] === 'H' && board[2][1] === 'H')
                return 'H';
        }
        else if (board[3][0] === 'F')
        {
            if (board[2][1] === 'H' && board[4][1] === 'H')
                return 'H';
        }
        else if (board[5][0] === 'F')
        {
            if (board[4][1] === 'H' && board[6][1] === 'H')
                return 'H';
        }
        else if (board[2][7] === 'F')
        {
            if (board[1][6] === 'H' && board[3][6] === 'H')
            {
                return 'H';
            }
        }
        else if (board[4][7] === 'F')
        {
            if (board[3][6] === 'H' && board[5][6] === 'H')
            {
                return 'H';
            }
        }
        else if (board[6][7] === 'F')
        {
            if (board[5][6] === 'H' && board[7][6] === 'H')
            {
                return 'H';
            }
        }
        else
        {
            for (var i=1; i<6; i++)
            {
                for (var j=1; j<6; j++)
                {
                    if (board[i][j] === 'F' && board[i+1][j+1] === 'H' && board[i-1][j-1] === 'H' && board[i+1][j-1] === 'H' && board[i-1][j+1] === 'H' )
                        return 'H';
                }
            }
        }
        return '';
    }



    /*
     function isEqual(object1, object2) {
     return JSON.stringify(object1) === JSON.stringify(object2);
     }
     */



    //check if a move is legal and doesnt go outside the confines of the board
    //this needs to be changed as well because we can have a blank space in the col

    function checkPosition(row,col,board){
        if(board[row][col] === undefined){
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
        if( (row===oldrow+1 && col===oldcol+1) || (row===oldrow+1 && col===oldcol-1)){
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




    function createMove(oldrow,oldcol,row,col,turnIndexBeforeMove,boardBeforeMove,turnIndex){

        if(boardBeforeMove === undefined) {
            boardBeforeMove = [
                ['','H','','H','','H','','H'],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['F','','','','','','','']

            ];
        }

        //check the correctness of movement
        if (checkPosition(row,col,boardBeforeMove) === false){  // checkPosition 01 - boundary
            throw new Error("You cannot make a move outside of the board!");
        }
        //if(boardBeforeMove[oldrow][oldcol] === ''){
        //throw new Error("One cannot make a move from an empty position!");
        //}

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

        var winner = getWinner(row,col,boardAfterMove);

        var firstOperation;
        var score =[0,1];
        if(winner !== ''){
            if(winner === 'F'){
                score = [1, 0];
            }
            firstOperation = {endMatch: {endMatchScores: score}};




            console.log("player: "+ winner + " WINS!");
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

        if (isHoundMove(oldrow,oldcol,row,col)===true) {
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

    function getInitialBoard() {
        return [
            ['','H','','H','','H','','H'],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['F','','','','','','','']
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
            {oldrow: 7, oldcol: 0, row: 6, col: 1, comment: "Fox makes first move and moves forward to the right"},

            {oldrow: 0, oldcol: 1, row: 1, col: 0, comment: "Hound moves down"},

            {oldrow: 6, oldcol: 1, row: 5, col: 0, comment: "Fox moves forward and to the left"},

            {oldrow: 0, oldcol: 3, row: 1, col: 2, comment: "Hound moves down and to the left"},

            {oldrow: 5, oldcol: 0, row: 4, col: 1, comment: "Fox moves forward and to the right"},

            {oldrow: 0, oldcol: 5, row: 1, col: 4, comment: "Hound moves down and to right"},

            {oldrow: 4, oldcol: 1, row: 3, col: 2, comment: "Fox moves up to the right"},

            {oldrow: 1, oldcol: 2, row: 2, col: 3, comment: "Hound moves down to the right"},

            {oldrow: 3, oldcol: 2, row: 2, col: 1, comment:"Fox moves up to the right"},

            {oldrow: 0, oldcol: 7, row: 1, col: 6, comment:"Hound Moves down"},

            {oldrow: 2, oldcol: 1, row: 1, col: 2, comment:"Fox moves up and to the right"},

            {oldrow: 1, oldcol: 0, row: 2, col: 1, comment:"Hound moves down"},

            {oldrow: 1, oldcol: 2, row: 0, col: 1, comment:"Fox wins"}

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




    this.getInitialBoard = getInitialBoard;
    this.createMove = createMove;
    this.isMoveOk = isMoveOk;
    this.getExampleGame = getExampleGame;

});

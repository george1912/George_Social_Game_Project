'use strict';

//set angular controllers
angular.module('myApp',['ngDraggable'])
    .controller('Ctrl', function (
        $window, $scope, $log, $timeout,
        gameService, gameLogic) {



        //changed the oldrow to row
        //first Click on a piece give us the old row old column
        //variables for setting the old row and col

        var oldrow= {oldrow:''};
        var oldcol= {oldcol:''};

        //The second click will then be used to get to where the pieces will be moving
        //these vars are for setting
        var row = {row:''};
        var col = {col:''};

        //To remember what moves to make
        var lastSelected = {row:'', col:''};

        var movCtr = 2;
        var moveType = 2;



        //fixed sound move
        //fix!!!!
        var sound = new Audio('audio/move.mp3');
        sound.load();

        /*
        //fix computer move this needs to be improved
        function sendComputerMove() {
            gameService.makeMove(
                gameLogic.createComputerMove($scope.jsonState,$scope.turnIndex));

                oldrow, oldcol, turnIndexBeforeMove,boardBeforeMove,turnIndex

        }
        */


        //Useful for checking out where things are going
        $scope.onDropComplete = function (data, event, rowData, colData) {
            $log.info("onDropComplete happened!", arguments);
            $scope.notifications = "Dropped piece " + data + " in " + rowData + "x" + colData;
            $scope.cellClicked(rowData, colData);
        };

        $scope.onDrag = function (data, event, rowData, colData) {
            $log.info("drag happened!", arguments);
            $scope.notifications = "Dragged " + data + " in " + rowData + "x" + colData;
            $scope.cellClicked(rowData, colData);
        };

//adding piece
        $scope.isPiece = function(row,col,piece){
            if($scope.board[row][col]===piece){
                return true;}
        }


        //this is for checking what is what!
        //Checking if a space that is fox
        $scope.isFox=function(row, col){
            if($scope.board[row][col]==='F'){
                return true;}

        }

        //Checking if a space is hound
        $scope.isHound=function(row, col){
            if($scope.board[row][col]==='H'){
                return true;}

        }

        //checking if space on board is Blank
        $scope.isBlank=function(row, col){
            if($scope.board[row][col]===''){
                return true;}

        }

        /*
        //now we needs to update the old positions as well
        $scope.wasFox=function(oldrow, oldcol){
            if($scope.board[oldrow][oldcol]==='F'){
                return true;}

        }

        $scope.wasHound=function(oldrow, oldcol){
            if($scope.board[oldrow][oldcol]==='H'){
                return true;}

        }
        */



        //functions for setting the proper turn
        //is Function for Fox Turn
        $scope.isFoxTurn = function(){
            if($scope.turnIndex===0){
                return true;
            }
            else{
                return false;
            }
        }

        //is Function for Hound Turn
        $scope.isHoundTurn = function(){
            if($scope.turnIndex===1){
                return true;
            }
            else{
                return false;
            }
        }






        //see what has been selected
        $scope.isSelected = function(row,col){
            if(row===lastSelected.row && col===lastSelected.col){
//     		console.log('Found true');
                return true;
            }
            else{
//     		console.log('Found false');
                return false;
            }
        }




        //UPDATING BOARD
        function updateUI(params) {
            $scope.jsonState = angular.toJson(params.stateAfterMove, true);
            $scope.board = params.stateAfterMove.board;
            if ($scope.board === undefined) {
                $scope.board = gameLogic.getInitialBoard();
            }
            else
            {
                sound.play();
            }

            $scope.isYourTurn = params.turnIndexAfterMove >= 0 && // game is ongoing
                params.yourPlayerIndex === params.turnIndexAfterMove; // it's my turn
            $scope.turnIndex = params.turnIndexAfterMove;

            // Is it the computer's turn?
            if ($scope.isYourTurn
                && params.playersInfo[params.yourPlayerIndex].playerId === '') {
                // Wait 500 milliseconds until animation ends.
                $timeout(sendComputerMove, 1000);
            }
        }

        //initialise the game using this function call to updateUI
        updateUI({stateAfterMove: {}, turnIndexAfterMove: 0, yourPlayerIndex: -2});












        //the way the click should work is that we make a click on a cell
        //then we check what value is in that cell by checking row and col




        $scope.cellClicked = function (row, col) {
            $log.info(["Clicked on cell:", row, col]);
            if (!$scope.isYourTurn) {
                return;
            }

            if ((($scope.board[row][col]==='F' && $scope.turnIndex===0) ||
                ($scope.board[row][col]==='H' && $scope.turnIndex===1)) &&
                (movCtr===2)){

                oldrow.row = row;
                oldcol.col = col;


                movCtr-=1;
            }



            //removed scoped.board from FoxHound/moves
            else if ($scope.board[row][col]==='' && oldrow.row !== '' ){
                row.row = row;
                col.col = col;

                if(gameLogic.isFoxMove(oldrow,oldcol,row, col)||
                    gameLogic.isHoundMove(oldrow,oldcol,row, col)){
                    movCtr-=1;
                }
                else
                {
                    row.row = '';col.col = '';
                    if(moveType%2===0)
                    {
                        oldrow.row= '';oldcol.col = '';
                        movCtr=2;
                    }
                }
            }






            //added in scope turn index, and scope turnindexbeforemove
            if(movCtr===0)
            {
                try
                {
                    var move = gameLogic.createMove(oldrow, oldcol, row, col, $scope.turnIndex,$scope.turnIndexBeforeMove,
                        $scope.jsonState);
                    moveType +=1;
                    $scope.isYourTurn = false; // to prevent making another move

                    lastSelected = {row:row.row,col:row.col};

                    if(moveType%2!==0 ){
                        oldrow = {row:row.row};
                        oldcol = {col:col.col};
                        movCtr=1;
                    }else
                    {oldrow = {row:''};
                        oldcol = {col:''};
                        movCtr=2
                    }
                    row = {row:''};
                    col = {col:''};
                    gameService.makeMove(move);
                }
                catch (e)
                {
                    $log.info(["False move", row, col]);
                    return;
                }
            }
        };


























































        $scope.cellClicked = function (row, col) {
            $log.info(["Clicked on cell:", row, col]);
            if (!$scope.isYourTurn) {
                return;
            }

            if ((($scope.board[row][col]==='F' && $scope.turnIndex===0) ||
                ($scope.board[row][col]==='H' && $scope.turnIndex===1)) &&
                (movCtr===2)){
                oldrow.row = row;
                oldcol.col = col;
                movCtr-=1;
            }






            else if ($scope.board[row][col]==='' && row.row !== '' && col.col !== '' ){
                row.row = row;
                col.col = col;

                if(gameLogic.isFoxMove(oldrow,oldcol,row, col, $scope.board)||
                    gameLogic.isHoundMove(oldrow,oldcol,row, col,$scope.board)){
                    movCtr-=1;
                }
                else
                {
                    row.row = '';col.col = '';
                    if(moveType%2===0)
                    {
                        oldrow.row= '';oldcol.col = '';
                        movCtr=2;
                    }
                }
            }







            if(movCtr===0)
            {
                try
                {
                    var move = gameLogic.createMove(oldrow, oldcol, row, col, $scope.turnIndex,
                        $scope.jsonState);
                    moveType +=1;
                    $scope.isYourTurn = false; // to prevent making another move
                    lastSelected = {row:row.row,col:row.col};
                    if(moveType%2!==0 ){
                        oldrow = {row:row.row};
                        oldcol = {col:row.col};
                        movCtr=1;
                    }else
                    {oldrow = {row:''};
                     oldcol = {col:''};
                        movCtr=2
                    }
                    row = {row:''};
                    col = {col:''};
                    gameService.makeMove(move);
                }
                catch (e)
                {
                    $log.info(["False move", row, col]);
                    return;
                }
            }
        };

























//     scaleBodyService.scaleBody({width: 152, height: 152});










        gameService.setGame({
            gameDeveloperEmail: "george.ulloa1990@gmail.com",
            minNumberOfPlayers: 2,
            maxNumberOfPlayers: 2,
            exampleGame: gameLogic.getExampleGame(),
            isMoveOk: gameLogic.isMoveOk,
            updateUI: updateUI
        });
    });
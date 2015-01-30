'use strict';


angular.module('myApp',['ngTouch','ngDraggable'])
    .controller('Ctrl', function ($window, $scope, $log,  $timeout, $interval,
                                  gameService,  gameLogic) {

        var moveAudio = new Audio('audio/move.wav');
        moveAudio.load();

//adding scope nonsense!
        $scope.map = [
            [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
            [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
            [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
            [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
            [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
            [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
            [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
            [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
        ];




        //adding mapping
        $scope.newposition = 50;
        $scope.newpositionTop = 50;
        $scope.setPagePosition = function(index, parentIndex) {
            $scope.newposition =  $scope.map[parentIndex][index][0] * 20.1 - 31 + 'px'
            return $scope.newposition;
        }
        $scope.setPagePositionTop = function(parentIndex, index){
            $scope.newpositionTop = $scope.map[parentIndex][index][1] * 10 -9 + 'px'
            return $scope.newpositionTop;
        }
        //adding mapping


        function resetAll(){
            $scope.ani_point = [];
            //these will be storing the different types of movements
            //so the fox can move: upleft,upright,down right, down left
            //hound moves downleft or downright
            $scope.ul = false;
            $scope.ur = false;
            $scope.dl = false;
            $scope.dr = false;

        }

        function updateUI(params) {
            $scope.params = params;
            $scope.board = params.stateAfterMove.board;
            if ($scope.board === undefined) {
                $scope.board = gameLogic.getInitialBoard();
            }else{
                $timeout(function(){moveAudio.play();},100);
                //moveAudio.play();
            }
            $scope.isYourTurn = params.turnIndexAfterMove >= 0 && // game is ongoing
                params.yourPlayerIndex === params.turnIndexAfterMove; // it's my turn
            $scope.turnIndex = params.turnIndexAfterMove;

            if(params.yourPlayerIndex === -2 ){
                //do nothing when initial state holds
            }else if(params.yourPlayerIndex === -1){
                //do nothing when end of game
            }else if(!$scope.isYourTurn && params.playersInfo[params.yourPlayerIndex].playerId !== ''){
                //setAll(params.move);  // show opponent's movement
            }

            if(isChain){
                makeGameMove(true);

            }else if ($scope.isYourTurn
                && params.playersInfo[params.yourPlayerIndex].playerId === '') {
                $timeout(function(){
                    moveOri = gameLogic.createComputerMove($scope.board, $scope.turnIndex);
                    makeGameMove(true);
                },300);
            }


        }

        // Before getting any updateUI message, we show an empty board to a viewer (so you can't perform moves).
        updateUI({stateAfterMove: {}, turnIndexAfterMove: 0, yourPlayerIndex: -2});


        $scope.selectedPosition = [];
        var moveOri;
        var move;
        var isChain = false;
        var chainValue = [];

        $scope.cellClicked = function(row, col) {
            $log.info(["Clicked on cell: ",row,col]);
            if(!$scope.isYourTurn){
                return;
            }
            if($scope.selectedPosition.length === 0){
                if(isNotSelectable(row,col)){
                    return;
                }
                $scope.selectedPosition[0] = [row, col];
                return;
            }else{
                if($scope.board[row][col]==($scope.turnIndex==0 ?'F':'H')){
                    if(isNotSelectable(row,col)){
                        return;
                    }
                    $scope.selectedPosition[0] = [row, col];
                    return;
                }else{
                    $scope.selectedPosition[1] = [row, col];
                }
            }
            try{
                moveOri = gameLogic.createMove($scope.selectedPosition[0][0],$scope.selectedPosition[0][1],$scope.selectedPosition[1][0],$scope.selectedPosition[1][1],$scope.turnIndex,$scope.board);
                $scope.isYourTurn = false;
                makeGameMove(true);
                $scope.selectedPosition = [];
            }catch(e){
                $log.info(["It is illegal to move position from:", $scope.oldrow, $scope.oldcol," to position:",row,col]);
                $scope.selectedPosition = [];
                return;
            }
        };

        function setAll(move){
            resetAll();
            var row = move[2].set.value.row;
            var col = move[2].set.value.col;
            var oldrow = move[2].set.value.oldrow;
            var oldcol = move[2].set.value.oldcol;
            $scope.ani_point[0] = oldrow;
            $scope.ani_point[1] = oldcol;

            if(row==oldrow-1 && col == oldcol-1){
                // moving up the board and to the right
                $scope.ul = true;
            }
            else if(row==oldrow-1 && col == oldcol+1){
                // moving up the board and too the right
                $scope.ur = true;
            }

            else if(row==oldrow+1 && col == oldcol-1){
                // moving down the board and to the left
                $scope.dl = true;
            }
            else if(row==oldrow+1 && col == oldcol+1){
                // moving down the board one row and on col to the right
                $scope.dr = true;
            }


        }

        function isNotSelectable(row, col){
            var possibleMoves = [];
            var i, j;
            var tempMove;
            for(i=1; i<8; i++){
                for(j=1; j<$scope.board[i].length; j++){
                    try{
                        tempMove = gameLogic.createMove(row, col, i, j, $scope.turnIndex, $scope.board);
                        possibleMoves.push([i,j]);
                    }catch(e){
                        // do something here?
                    }
                }
            }
            if(possibleMoves.length===0){
                return true;
            }else{
                return false;
            }
        }


        function checkDragDrop(row, col){
            $scope.boolboard = angular.copy($scope.board);
            var possibleMoves = [];
            var i, j;
            var tempMove;
            for(i=0; i<8; i++){
                for(j=0; j<$scope.boolboard[i].length; j++){
                    $scope.boolboard[i][j] = false;
                    try{
                        tempMove = gameLogic.createMove(row, col, i, j, $scope.turnIndex, $scope.board);
                        possibleMoves.push([i,j]);
                    }catch(e){
                        // do something here?
                    }
                }
            }
            for(i=0; i<possibleMoves.length; i++){
                $scope.boolboard[possibleMoves[i][0]][possibleMoves[i][1]] = true;
            }
        }

        $scope.onDropCallback = function( event, r, c ){
            var row = r;
            var col = c;
            $scope.cellClicked(row, col);
        }

        $scope.onStartCallback = function( event, r, c ){
            //console.log(row,col);
            var row = r;
            var col = c;
            $log.info(["drag on cell: ",row, col]);
            if(!$scope.isYourTurn){
                return;
            }
            $scope.selectedPosition =[];
            if($scope.selectedPosition.length === 0){
                $scope.selectedPosition[0] = [row, col];
                checkDragDrop(row, col);
                return;
            }
        }


        // pay attantion to WIN condition: endMatch
        function makeGameMove(isDnD){

            move = angular.copy(moveOri);
            isChain = angular.copy(moveOri[3].set.value);

            if(isChain && chainValue.length === 0){
                chainValue = angular.copy(moveOri[4].set.value);  // initial chainValue when first meet
            }
            if(isChain && chainValue.length > 2 && move[0].setTurn===undefined){  // end Match
                move[0] = {setTurn:{turnIndex: $scope.turnIndex}};
            }
            if(isChain && chainValue.length > 2 && move[0].setTurn!==undefined){  // normal
                move[0].setTurn.turnIndex = $scope.turnIndex;
            }
            if(isChain){  // change the shape of move
                var row = move[2].set.value.row;
                var col = move[2].set.value.col;
                move[1].set.value[row][col] = 'a';
                move[1].set.value[chainValue[1][0]][chainValue[1][1]] = $scope.turnIndex===0? 'F' : 'H';
                move[1].set.value[chainValue[0][0]][chainValue[0][1]] = '';
                move[2].set.value.oldrow = chainValue[0][0];
                move[2].set.value.oldcol = chainValue[0][1];
                move[2].set.value.row = chainValue[1][0];
                move[2].set.value.col = chainValue[1][1];
            }
            if(chainValue.length > 2){
                chainValue.reverse();
                chainValue.pop();
                chainValue.reverse();
            }else{
                moveOri[3].set.value = false;
                move[0] = moveOri[0];
                isChain = false;
                chainValue = [];
            }
            setAll(move);
            $timeout(function(){
                console.log("timeout will happen! ");
                gameService.makeMove(move);},500);


        }

        gameService.setGame({
            gameDeveloperEmail: "george.ulloa@gmail.com",
            minNumberOfPlayers: 2,
            maxNumberOfPlayers: 2,
            //exampleGame: gameLogic.getExampleGame,
            //riddles: gameLogic.getRiddles(),
            isMoveOk: gameLogic.isMoveOk,
            updateUI: updateUI
        });

        // scaleBodyService.scaleBody({width: 625, height: 625});

    });
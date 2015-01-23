'use strict';

angular.module('myApp', ['ngTouch'])
    .controller('Ctrl', function (
        $window, $scope, $log, $timeout,
        gameService, scaleBodyService, gameLogic) {


        var moveAudioFox = new Audio('audio/move1.mp3');
        moveAudioFox.load();
        var moveAudioHound = new Audio('audio/move1.mp3');
        moveAudioHound.load();

        function sendComputerMove(){
            gameService.makeMove(
                gameLogic.createComputerMove($scope.board, oldrow, oldcol, $scope.turnIndex,turnIndexBeforeMove,boardBeforeMove));

        }

        function updateUI(params) {

            $scope.board = params.stateAfterMove.board;
            $scope.delta = params.stateAfterMove.delta;
            if ($scope.board === undefined) {
                $scope.board = [
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

            else {
                if($scope.turnIndex === 0){
                    moveAudioFox.play();
                }
                else if($scope.turnIndex === 1){
                    moveAudioHound.play();
                }
            }

            $scope.isYourTurn = params.turnIndexAfterMove >= 0 && // game is ongoing
                params.yourPlayerIndex === params.turnIndexAfterMove; //it's my turn
            $scope.turnIndex = params.turnIndexAfterMove;
            // Is it the computer's turn?
            if ($scope.isYourTurn
                && params.playersInfo[params.yourPlayerIndex].playerId === '') {
                $scope.isYourTurn = false;
                $timeout(sendComputerMove, 1100);
            }
        }

        updateUI({stateAfterMove: {}, turnIndexAfterMove: 0, yourPlayerIndex: -2});

        $scope.cellClicked = function (row, col) {
            $log.info(["Clicked on cell:", row, col]);
            if (!$scope.isYourTurn) {
                return;
            }

            try {
                var move = gameLogic.createMove($scope.board, oldrow, oldcol, row, col, $scope.turnIndex, turnIndexBeforeMove, boardBeforeMove);

                $scope.isYourTurn = false;

                gameService.makeMove(move);
            } catch (e) {
                $log.info(["wrong move", row, col]);
                return;
            }
        };

        $scope.shouldSlowlyAppear = function (row, col) {
            return $scope.delta !== undefined
                && $scope.delta.row === row && $scope.delta.col === col;
        }

        $scope.isHound = function (row, col) {
            if ($scope.board[row][col] === 'H')
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        $scope.isFox = function (row, col) {
            if ($scope.board[row][col] === 'F')
            {
                return true;
            }
            else
            {
                return false;
            }
        }


        $scope.oddBox = function (row, col){
            if ((row + col) % 2 !== 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        $scope.evenBox = function (row, col){
            if ((row + col) % 2 === 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }



        scaleBodyService.scaleBody({width: 567, height: 567});

        gameService.setGame({
            gameDeveloperEmail: "george.ulloa1990@gmail.com",
            minNumberOfPlayers: 2,
            maxNumberOfPlayers: 2,
            exampleGame: gameLogic.getExampleGame(),
            isMoveOk: gameLogic.isMoveOk,
            updateUI: updateUI
        });
    });
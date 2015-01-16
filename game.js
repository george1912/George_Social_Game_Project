'use strict';

angular.module('myApp',
    ['myApp.messageService', 'myApp.gameLogic', 'platformApp'])
    .controller('Ctrl', function (
        $window, $scope, $log,
        messageService, stateService, gameLogic) {

//how do I set this to a board?

        function updateUI(params) {
            $scope.jsonState = angular.toJson(params.stateAfterMove, true);
            $scope.board = params.stateAfterMove.board;
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
        }
        updateUI({stateAfterMove: {}});
        var game = {
            gameDeveloperEmail: "george.ulloa1990@gmail.com",
            minNumberOfPlayers: 2,
            maxNumberOfPlayers: 2,
            exampleGame: gameLogic.getExampleGame()

        };

        var isLocalTesting = $window.parent === $window;
        $scope.move = JSON.stringify([{setTurn: {turnIndex: 1}}, {set: {key: 'board', value:[
            ['','H','','H','','H','','H'],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','F','','','','','',''],
            ['','','','','','','','']]}}, {set: {key: 'delta', value: {oldrow: 7, oldcol: 0, row: 6, col: 1}}}]);
        $scope.makeMove = function () {
            $log.info(["Making move:", $scope.move]);
            var moveObj = eval($scope.move);
            if (isLocalTesting) {
                stateService.makeMove(moveObj);
            } else {
                messageService.sendMessage({makeMove: moveObj});
            }
        };

        if (isLocalTesting) {
            game.isMoveOk = gameLogic.isMoveOk;
            game.updateUI = updateUI;
            stateService.setGame(game);
        } else {
            messageService.addMessageListener(function (message) {
                if (message.isMoveOk !== undefined) {
                    var isMoveOkResult = gameLogic.isMoveOk(message.isMoveOk);
                    messageService.sendMessage({isMoveOkResult: isMoveOkResult});
                } else if (message.updateUI !== undefined) {
                    updateUI(message.updateUI);
                }
            });

            messageService.sendMessage({gameReady : game});
        }
    });
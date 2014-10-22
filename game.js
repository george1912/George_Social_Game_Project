'use strict';

// TODO: remove stateService before launching the game.
angular.module('myApp',
    ['myApp.messageService', 'myApp.gameLogic', 'platformApp'])
    .controller('Ctrl', function (
        $window, $scope, $log,
        messageService, stateService, gameLogic) {

        function updateUI(params) {
            $scope.jsonState = angular.toJson(params.stateAfterMove, true);
            $scope.board = params.stateAfterMove.board;
            if ($scope.board === undefined) {
                $scope.board =


                       [['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS',  'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['H', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']]  ;
            }
        }

        updateUI({stateAfterMove: {}});
        var game = {
            gameDeveloperEmail: "george.ulloa1990@gmail.com",
            minNumberOfPlayers: 2,
            maxNumberOfPlayers: 2,
            exampleGame: gameLogic.getExampleGame(),
            riddles: gameLogic.getRiddles()
        };

        var isLocalTesting = $window.location.origin === "file://";
        $scope.move = "[{setTurn: " +
            "{turnIndex: 1}}, " +
            "{set: " +
            "{key: 'board', value: " +
            "[['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H']," +
            "['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']," +
            "['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS']," +
            "['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'], " +
            "['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS']," +
            "['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],"+
            "['RS',  'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],"+
            "['H', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']]}}," +


            "{set: {key: 'fox', value: {row: 7, col: 0}}}" +
            "{set: {key: 'hound', value: [{row: 0, col: 1},{row: 0, col: 3},{row: 0, col: 5},{row: 0, col: 7}]}}" +
            "{set: {key: 'fromDelta', value: {row: 7, col: 0}}}" +
            "{set: {key: 'toDelta', value: {row: 6, col: 1}" +
            "}}]";



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
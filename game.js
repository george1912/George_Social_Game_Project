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
                $scope.board = [['', '', ''],
                    ['', '', ''],
                    ['', '', '']];
            }
        }
        updateUI({stateAfterMove: {}});
        var game = {
            gameDeveloperEmail: "yoav.zibin@gmail.com",
            minNumberOfPlayers: 2,
            maxNumberOfPlayers: 2,
            exampleGame: gameLogic.getExampleGame(),
            riddles: gameLogic.getRiddles()
        };

        var isLocalTesting = $window.location.origin === "file://";
        //add here
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
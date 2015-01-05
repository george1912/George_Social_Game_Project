'use strict';

angular.module('myApp',
    ['myApp.messageService', 'myApp.gameLogic', 'platformApp'])
    .controller('Ctrl', function (
        $window, $scope, $log,
        messageService, stateService, gameLogic) {

        $scope.yo = function($yindex, $index ) {
            alert($yindex+ "  " +$index);
        }

        $scope.map = [


            ['','','','','','','',''],
            ['H','','H','','H','','H',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','F','','','','','',''],
            ['','','','','','','','']

        ];


        $scope.newposition = 50;
        $scope.newpositionTop = 50;
        $scope.setPagePosition = function(index, parentIndex) {
            //$scope.newposition = (((index - 9) * (-0.4471) - (18 - parentIndex - 9) * 0.894) +9) *20 + 'px';
            $scope.newposition =  $scope.map[parentIndex][index][0] * 40 - 65 + 'px'
            return $scope.newposition;
        }
        $scope.setPagePositionTop = function(parentIndex, index){
            //$scope.newpositionTop = (18 - (((index - 9) * 0.894 + (18 - parentIndex - 9) * (-0.4471)) + 9)) *20 + 'px';
            $scope.newpositionTop = $scope.map[parentIndex][index][1] * 35 -20 + 'px'
            return $scope.newpositionTop;
        }

        function updateUI(params) {
            $scope.jsonState = angular.toJson(params.stateAfterMove, true);
            $scope.board = params.stateAfterMove.board;
            if ($scope.board === undefined) {
                $scope.board = [
                    ['','','','','','','','','','','','','','',''],
                    ['','','','','','a','','','','','','','','',''],
                    ['','','','','','a','a','','','','','','','',''],
                    ['','','','','','a','a','a','','','','','','',''],
                    ['','','','','','a','a','a','a','','','','','','','','',''],
                    ['','O','O','O','O','a','a','a','a','a','a','a','a','a',''],
                    ['','','O','O','O','a','a','a','a','a','a','a','a','a',''],
                    ['','','','O','O','a','a','a','a','a','a','a','a','a',''],
                    ['','','','','O','a','a','a','a','a','a','a','a','a',''],
                    ['','','','','','a','a','a','a','a','a','a','a','a',''],
                    ['','','','','','a','a','a','a','a','a','a','a','a','X',''],
                    ['','','','','','a','a','a','a','a','a','a','a','a','X','X',''],
                    ['','','','','','a','a','a','a','a','a','a','a','a','X','X','X',''],
                    ['','','','','','a','a','a','a','a','a','a','a','a','X','X','X','X',''],
                    ['','','','','','','','','','','a','a','a','a','','','','','','','',''],
                    ['','','','','','','','','','','','a','a','a',''],
                    ['','','','','','','','','','','','','a','a',''],
                    ['','','','','','','','','','','','','','a',''],
                    ['','','','','','','','','','','','','','','']
                ];
            }
        }
        updateUI({stateAfterMove: {}});
        var game = {
            gameDeveloperEmail: "zoj2005@gmail.com",
            minNumberOfPlayers: 2,
            maxNumberOfPlayers: 2,
            exampleGame: gameLogic.getExampleGame()
            //riddles: gameLogic.getRiddles()
        };

        var isLocalTesting = $window.parent === $window;
        $scope.move = JSON.stringify([{setTurn: {turnIndex: 1}}, {set: {key: 'board', value:[
            ['','','','','','','','','','','','','','',''],
            ['','','','','','a','','','','','','','','',''],
            ['','','','','','a','a','','','','','','','',''],
            ['','','','','','a','a','a','','','','','','',''],
            ['','','','','','a','a','a','a','','','','','','','','',''],
            ['','O','O','O','a','O','a','a','a','a','a','a','a','a',''],
            ['','','O','O','O','a','a','a','a','a','a','a','a','a',''],
            ['','','','O','O','a','a','a','a','a','a','a','a','a',''],
            ['','','','','O','a','a','a','a','a','a','a','a','a',''],
            ['','','','','','a','a','a','a','a','a','a','a','a',''],
            ['','','','','','a','a','a','a','a','a','a','a','a','X',''],
            ['','','','','','a','a','a','a','a','a','a','a','a','X','X',''],
            ['','','','','','a','a','a','a','a','a','a','a','a','X','X','X',''],
            ['','','','','','a','a','a','a','a','a','a','a','a','X','X','X','X',''],
            ['','','','','','','','','','','a','a','a','a','','','','','','','',''],
            ['','','','','','','','','','','','a','a','a',''],
            ['','','','','','','','','','','','','a','a',''],
            ['','','','','','','','','','','','','','a',''],
            ['','','','','','','','','','','','','','','']]}}, {set: {key: 'delta', value: {oldrow: 5, oldcol: 4, row: 5, col: 5}}}]);
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
'use strict';

// TODO: remove stateService before launching the game.
angular.module('myApp',
    ['myApp.messageService', 'myApp.gameLogic','myApp.scaleBodyService', 'platformApp'])
    .controller('Ctrl', function (
        $window, $scope, $log,
        messageService, scaleBodyService, stateService, gameLogic) {


        var isLocalTesting = $window.parent === $window;

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



        $scope.isYourTurn = params.turnIndexAfterMove >= 0 && // game is ongoing
            params.yourPlayerIndex === params.turnIndexAfterMove; //it's my turn
        $scope.turnIndex = params.turnIndexAfterMove;
    });


function sendMakeMove(move) {
    $log.info(["Making move:", move]);
    if (isLocalTesting) {
        stateService.makeMove(move);
    } else {
        messageService.sendMessage({makeMove: move});
    }
}


updateUI({stateAfterMove: {}, turnIndexAfterMove: 0, yourPlayerIndex: -2});
var game = {
    gameDeveloperEmail: "george.ulloa1990@gmail.com",
    minNumberOfPlayers: 2,
    maxNumberOfPlayers: 2,
    exampleGame: gameLogic.exampleGame(),
    riddles: gameLogic.riddles()
};


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
    sendMakeMove(eval($scope.move));
};



$scope.cellClicked = function (row, col) {
    $log.info(["Clicked on cell:", row, col]);
    if (!$scope.isYourTurn) {
        return;
    }

    try {
        var move = gameLogic.createMove($scope.board, row, col, $scope.turnIndex);
        $scope.isYourTurn = false; // to prevent making another move
        sendMakeMove(move);
    } catch (e) {
        $log.info(["Cell is already full in position or you have to form a sandwich!", row, col]);
        return;
    }
};





        $scope.makeMove = function () {
            $log.info(["Making move:", $scope.move]);
            var moveObj = eval($scope.move);
            if (isLocalTesting) {
                stateService.makeMove(moveObj);
            } else {
                messageService.sendMessage({makeMove: moveObj});
            }
        };


//adding here
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


scaleBodyService.scaleBody({width: 567, height: 567});

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

};


































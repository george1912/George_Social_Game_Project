//added for HW#4
'use strict';

//added for hw#4
angular.module('myApp.gameLogic', []).service('gameLogic', function() {

    //added in code for rows
    //highest level rows can go
    var row = 7;
    var col = 7;

    function isEqual(object1, object2) {
        return JSON.stringify(object1) === JSON.stringify(object2);
    }


    /*if (typeof object1 != 'object' && typeof object2 != 'object') {*/
    /*return object1 == object2;*/
    /* }*/


    function copyObject(object) {
        //added for hw#4
        return angular.copy(object);
    }


    /*optional functions */
//how do I improve this
    //function isEmptyBlackSquare(toDelta, board) {

    //board = board [row][col]

    //if (board === 'BS') {
    //return true;
    //}
    //else {
    //return false;
    //}
    //}



    //added in function for a new empty square
    function isEmptySquare(coordinates) {
        if (coordinates.board [coordinates.row][coordinates.col] === '') {
            return true;
        }
        return false;
    }




    //need to call this function
    function isLegalMove(board, fromDelta, toDelta) {

        var square = board[fromDelta.row][fromDelta.col];

        //need to call this function
        if (getKind(square) === 'F') {
            // If it's a fox, it can move both forward and backward
            if ((Math.abs(fromDelta.row - toDelta.row) === 1)
                && (Math.abs(fromDelta.col - toDelta.col) === 1)) {
                return true;
            }
        } else if (getKind(square) === 'H') {
            // If it's not a hound, it can only move downwards.
            if ((fromDelta.row - toDelta.row === -1)
                && (Math.abs(fromDelta.col - toDelta.col) === 1)) {
                return true;
            }
        } else

            return false;
    }

    /*do I need this?
     /*if (isLegalMove) {
     var firstOperation;
     board[toDelta.row][toDelta.col] === board[fromDelta.row][fromDelta.col];

     board[fromDelta.row][fromDelta.col] === 'BS' ||
     board[fromDelta.row][fromDelta.col] === 'F' ||
     board[fromDelta.row][fromDelta.col] === 'H'; //not legal not to board[fromDelta.row][fromDelta.col]=== H|| board[fromDelta.row][fromDelta.col=== F

     }*/
    /*core functions*/
    /*get move function */

    function getWinner(board, fox, hound) {

        //if the fox is in the top corners he will win
        /*How do I insert board*/
        //insert this board
        //I have inserted the board
        for (var i = 0; i <= row; i ++) {
            for (var j = 0; j <= col; j ++) {
                if (board[i][j] === 'F') {
                    return 'F';
                }
                else if (board[i][j] === 'H') {
                    return 'H';
                }
            }
        }




        if (fox == {row: 0, col: 1} || fox == {row: 0, col: 3} || fox === {row: 0, col: 5} || fox === {row: 0, col: 7}) {
            return 'F';
        }


        /*This is a function for get move */
        function checkHoundPosition(hound) {
            return hound.row === 7;
        }


        /*This is a function for get move */
        function checkHoundWinnerBottomRow(hound, row, col) {
            if (row === 7 && (col === 0 || col === 2 || col === 4)) {
                return true;

                //and check winner for the function
            }
            return false;
        }


        /*This is a function for get move */
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


        /*This is a function for get move */
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


        /*This is a function for get move */
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


        /*This is a function for get move */
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


    /*create move function*/

    function createMove(board, row, col, fox, hound, fromDelta, toDelta, turnIndexBeforeMove) {
        /*create move sub function */
        if (board === undefined) {
            // Initially (at the beginning of the match), the board in state is undefined.
            board =
                [
                    ['RS', 'H', 'RS', 'H', 'RS', 'H', 'RS', 'H'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
                ];

            fox = [
                [7, 0]
            ],
                hound = [
                    [0, 1],
                    [0, 3],
                    [0, 5],
                    [0, 7]
                ],
                fromDelta = [
                    [0, 0]
                ],
                toDelta = [
                    [0, 0]
                ]
        }

        /*create move sub variables */
        var boardAfterMove = copyObject(board);
        boardAfterMove[toDelta.row][toDelta.col] = turnIndexBeforeMove === 0 ? 'F' : 'H';
        boardAfterMove[fromDelta.row][fromDelta.col] = 'BS';
        var winner = getWinner(boardAfterMove);
        var firstOperation;

        /*Is this ok */

        if (winner !== '') {
            firstOperation = {endMatch: {endMatchScores: (winner === 'F' ? [1, 0] : (winner === 'H' ? [0, 1] : [0, 0]))}};
        } else {
            // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
            firstOperation = {setTurn: {turnIndex: 1 - turnIndexBeforeMove}};

        }

        return [firstOperation,
            {set: {key: 'board', value: board}},
            {set: {key: 'fox', value: {row: row, col: col}}},
            {set: {key: 'hound', value: [
                {row: row, col: col},
                {row: row, col: col},
                {row: row, col: col},
                {row: row, col: col}
            ]}},
            {set: {key: 'fromDelta', value: {row: row, col: col}}},
            {set: {key: 'toDelta', value: {row: row, col: col}}}];
    }


    /*function getExample Moves */

    /*
    function getExampleMoves(initialTurnIndex, initialState, arrayOfRowColComment) {
        var exampleMoves = [];
        var state = initialState;
        var turnIndex = initialTurnIndex;
        for (var i = 0; i < arrayOfRowColComment.length; i++) {
            var rowColComment = arrayOfRowColComment[i];

            //cant use this, at all
            var move = createMove(state.board, rowColComment.row, rowColComment.col, foxPos.fox, houndPos.hound, turnIndex);

            //added for hw#4
            var stateAfterMove = {board : move[1].set.value, delta: move[2].set.value};

            exampleMoves.push({
                stateBeforeMove: state,
                //added for hw#4

                stateAfterMove: stateAfterMove,
                turnIndexBeforeMove: turnIndex,

                //added for hw#4
                turnIndexAfterMove: 1 - turnIndex,

                move: move,
                comment: {en: rowColComment.comment}});

            //HW#4
            state = stateAfterMove;

            //NOTE CHANGES HERE
            //state = {board: move[1].set.value, fox: move[2].set.value, hound: move[3].set.value, fromDelta: move[4].set.value, toDelta: move[5].set.value};


            turnIndex = 1 - turnIndex;
        }
        return exampleMoves;
    }*/



    //improved getExampleMoves
    function getExampleMoves(initTurnIndex, initState, arrayOfRowColComment) {
        var state = initState;
        var temp;
        var store = [];
        var turnIndex = initTurnIndex;

        for (var i = 0; i < arrayOfRowColComment.length; i ++) {
            var rowColComment = arrayOfRowColComment[i];

            temp = createMove(state.board, rowColComment.row,
                rowColComment.col, turnIndex);

            var stateAfterMove = {board: temp[1].set.value, delta: temp[2].set.value};
            store.push({stateBeforeMove: state,
                stateAfterMove: stateAfterMove,
                turnIndexBeforeMove: turnIndex,
                turnIndexAfterMove: temp[0].setTurn.turnIndex,
                comment: {en: rowColComment.comment},
                move: temp});
            turnIndex = temp[0].setTurn.turnIndex;
            state = stateAfterMove;
        }
        return store;
    }






















    function getRiddles() {
        return [
            getExampleMoves(0,
                {
                    board: [
                        ['RS', 'H', 'RS', 'H', 'RS', 'H', 'RS', 'H'],
                        ['BS', 'RS', 'H', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
                    ],
                    fox: {row: 7, col: 0},
                    hound: [
                        {row: 0, col: 1},
                        {row: 0, col: 3},
                        {row: 0, col: 5},
                        {row: 0, col: 7}
                    ],
                    fromDelta: {row: 7, col: 0},
                    toDelta: {row: 6, col: 1}

                },
                [

                    {row: 7, col: 0, comment: "P1:F starting position"},
                    {row: 6, col: 1, comment: "P1:Fox moves here"}

                ]),


            getExampleMoves(1,
                {
                    board: [
                        ['RS', 'H', 'RS', 'H', 'RS', 'H', 'RS', 'H'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'F', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
                    ],


                    fox: {row: 6, col: 1},
                    hound: [
                        {row: 0, col: 1},
                        {row: 0, col: 3},
                        {row: 0, col: 5},
                        {row: 0, col: 7}
                    ],
                    fromDelta: {row: 0, col: 1},
                    toDelta: {row: 1, col: 0}
                },

                [
                    {row: 0, col: 1, comment: "P2: Hound Starts here"},
                    {row: 1, col: 0, comment: "P2: Hound moves down and to the left"}
                ])
        ];
    }


    /*Get example game*/
    function getExampleGame() {
        return getExampleMoves(0, {}, [
            {row: 6, col: 1, comment: "The first thing to do is move F forward"},
            {row: 1, col: 2, comment: "move Hound one space down to the right"},
            {row: 5, col: 2, comment: "Move the Fox forward again"},
            {row: 1, col: 4, comment: "Move the second hound forward"},
            {row: 4, col: 3, comment: "Move the fox forward again"},
            {row: 2, col: 3, comment: "Move First hound forward"},
            {row: 3, col: 2, comment: "Move fox forward to the left"},
            {row: 3, col: 4, comment: "Move hound1 forward down to the right"},
            {row: 2, col: 1, comment: "Move fox forward to the right"},
            {row: 4, col: 5, comment: "Move hound1  down to the right"},
            {row: 1, col: 0, comment: "Move fox up to the right"},
            {row: 5, col: 6, comment: "Move hound1 down to the right"},
            {row: 0, col: 1, comment: "Move fox up to the left, he wins the game"}


        ]);
    }




    /*Is MoveOk function*/
    function isMoveOk(params) {

        var move = params.move;
        var stateBeforeMove = params.stateBeforeMove;
        var turnIndexBeforeMove = params.turnIndexBeforeMove;

        try {
            // Example move:
            // [{setTurn: {turnIndex : 1},
            //  {set: {key: 'board', value:
            // [[['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
            //['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
            //['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
            //['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
            //['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
            //['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
            //['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
            //['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']]}},


            //   {set: {key: 'fromDelta', value: {row:0 , col: 1}}}
            // {set: {key: 'toDelta', value: {row: 1, col: 2}}}

            var deltaValue = move[2].set.value;
            var row = deltaValue.row;
            var col = deltaValue.col;
            var board = stateBeforeMove.board;
            if (board === undefined) {
                board = [
                    ['RS', 'H', 'RS', 'H', 'RS', 'H', 'RS', 'H'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
                ];
            }


            if (board[row][col] !== 'BS' || 'H' || 'F') {
                return false;
            }

            var expectedMove = createMove(board, row, col, turnIndexBeforeMove);
            if (!isEqual(move, expectedMove)) {
                return false;
            }
        } catch (e) {
            // if there are any exceptions then the move is illegal
            return false;
        }
        return true;
    }
    //added for hw#4
    this.isMoveOk = isMoveOk;
    this.getExampleGame = getExampleGame;
    this.getRiddles = getRiddles;

});

//return {isMoveOk: isMoveOk, getExampleGame: getExampleGame, getRiddles: getRiddles};







//})();
/*jslint devel: true, indent: 2 */
/*global console */

var FoxHoundGameLogic = (function () {
    'use strict';

    function isEqual(object1, object2) {
        return JSON.stringify(object1) === JSON.stringify(object2);
    }

    if (typeof object1 != 'object' && typeof object2 != 'object') {
        return object1 == object2;
    }
    try {
        var keys1 = Object.keys(object1);
        var keys2 = Object.keys(object2);
        var i, key;

        if (keys1.length != keys2.length) {
            return false;
        }
        //the same set of keys (although not necessarily the same order),
        keys1.sort();
        keys2.sort();
        // key test
        for (i = keys1.length - 1; i >= 0; i--) {
            if (keys1[i] != keys2[i])
                return false;
        }
        // equivalent values for every corresponding key
        for (i = keys1.length - 1; i >= 0; i--) {
            key = keys1[i];
            if (!isEqual(object1[key], object2[key])) {
                return false;
            }
        }
        return true;
    } catch (e) {
        return false;
    }

    function copyObject(object) {
        return JSON.parse(JSON.stringify(object));
    }

    /* is this ok? */
    var state = {
        board: [
            []
        ],
        fox: [row, col],
        hound: [
            [row, col],
            [row, col],
            [row, col],
            [row, col]
        ],
        fromDelta: [
            [row, col]
        ],
        toDelta: [
            [row, col]
        ]
    };

    /* is this ok? */
     var stateBeforeMove = state;
    function isEmptyObj(obj) {
        var prop;

        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }

        return true;
    }




    /* is this ok? */
    function isEmptyBlackSquare(toDelta, board) {

        var row = toDelta.row,
            col = toDelta.col;
        board = board [row][col]

        if (board === 'BS') {
            return true;
        }
        else {
            return false;
        }

    }


    function isLegalMove(board, fromDelta, toDelta) {

        var square = board[fromDelta.row][fromDelta.col];

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








    function getWinner(board, fox, hound) {

        //if the fox is in the top corners he will win

        if (fox == {row: 0, col: 1} || fox == {row: 0, col: 3} || fox === {row: 0, col: 5} || fox === {row: 0, col: 7}) {

            return 'F';
        }
        //if the hound is in the top corners the Hound will lose and the Fox will win

        function checkHoundPosition(hound) {

            return hound.row === 7;
        }

        function checkHoundWinnerBottomRow(hound, row, col) {

            if (row === 7 && (col === 0 || col === 2 || col === 4)) {
                return true;

                //and check winner for the function
            }
            return false;

        }


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

        //col is Fox position

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










            function createMove(board, row, col, fox, hound, fromDelta, toDelta, turnIndexBeforeMove) {

                state = {
                    board: [
                        ['RS', 'H', 'RS', 'H', 'RS', 'H', 'RS', 'H'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
                    ],
                    fox: [7, 0],
                    hound: [
                        [0, 1],
                        [0, 3],
                        [0, 5],
                        [0, 7]
                    ],
                    fromDelta: [
                        [0, 0]
                    ],
                    toDelta: [
                        [0, 0]
                    ]
                };


                var firstOperation;
                var isLegalMove = false;

                //We need to check if what we are moving to is even legal

                if (!isEmptyBlackSquare(fromDelta)
                    || !isEmptyBlackSquare(toDelta)) {
                    throw new Error(ILLEGAL_CODE.ILLEGAL_DELTA);
                }

                if (isLegalMove(board, fromDelta, toDelta)) {
                    isLegalMove = true;
                } else {
                    throw new Error(ILLEGAL_CODE.ILLEGAL_DELTA);
                }

                var boardAfterMove = copyObject(board);
                //set orginal place to black square, set original
                boardAfterMove[toDelta.row][toDelta.col] = turnIndexBeforeMove === 0 ? 'F' : 'H';
                boardAfterMove[fromDelta.row][fromeDelta.col] = 'BS';

                var winner = getWinner(boardAfterMove);

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


            if (isLegalMove) {
                var firstOperation;
                board[toDelta.row][toDelta.col] === board[fromDelta.row][fromDelta.col];

                board[fromDelta.row][fromDelta.col] === 'BS' ||
                    board[fromDelta.row][fromDelta.col] === 'F' ||
                    board[fromDelta.row][fromDelta.col] === 'H'; //not legal not to board[fromDelta.row][fromDelta.col]=== H|| board[fromDelta.row][fromDelta.col=== F

            }
        }






        /*Get Example Moves*/
        function getExampleMoves(initialTurnIndex, initialState, arrayOfRowColComment) {
            var exampleMoves = [];
            var state = initialState;
            var turnIndex = initialTurnIndex;
            for (var i = 0; i < arrayOfRowColComment.length; i++) {
                var rowColComment = arrayOfRowColComment[i];

                //cant use this, at all
                var move = createMove(state.board, rowColComment.row, rowColComment.col, foxPos.fox, houndPos.hound, turnIndex);

                exampleMoves.push({
                    stateBeforeMove: state,
                    turnIndexBeforeMove: turnIndex,
                    move: move,
                    comment: {en: rowColComment.comment}});

                //NOTE CHANGES HERE
                state = {board: move[1].set.value, fox: move[2].set.value, hound: move[3].set.value, fromDelta: move[4].set.value, toDelta: move[5].set.value};
                turnIndex = 1 - turnIndex;
            }
            return exampleMoves;
        }


        /*Get Riddles*/
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


        /*This is correct Move*/
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

        return {isMoveOk: isMoveOk, getExampleGame: getExampleGame, getRiddles: getRiddles};

    }
})();




































































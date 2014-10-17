/**
 * Created by George on 10/16/14 Update!.
 */
/**
 * This is the logic for Fox and Hounds. The game board is represented as a
 * two dimensional array (8*8). All elements are listed below:
 *
 * For empty squares of the board:
 * 'RS': red square (Can not hold any piece)
 * BS: black square (Can hold a piece)
 *
 * There are 2 kinds of piece of the game:
 * F: FOX
 * H: HOUND
 *There are 4 HOUND Pieces
 *They start at the top of board filling 4 BLACK SQUARES
 *The HOUND can only move forward to a black square
 *There is one FOX Piece
 *The Fox start at the first black square at the bottom of the board
 *The Fox wins if he can make it into any of the hounds original starting squares
 *The Hound wins if the hound can trap the fox in a position it cannot escape
 *
 * Example - The initial state:
 *
 *             0     1     2     3     4     5     6     7
 * 0:even  [['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
 * 1:odd    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
 * 2:even   ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
 * 3:odd    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
 * 4:even   ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
 * 5:odd    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
 * 6:even   ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
 * 7:odd    ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']]
 *
 * The number of row and col are both zero based, so the first row
 *       and column are both even.
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *



 /*jslint devel: true, indent: 2 */
/*global console */
var isMoveOk = (function () {
    'use strict';

    function isEqual(object1, object2) {
        return JSON.stringify(object1) === JSON.stringify(object2);
    }

    function copyObject(object) {
        return JSON.parse(JSON.stringify(object));
    }

    //var turnIndex = 0;
    // turn index is at 0 this means that the FOX plays first
    // when turn index changes to 1 that means its the HOUNDS term

    //var board = [['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
      //  ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
        //['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
        //['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
        //['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
        //['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
        //['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
        //['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
    //];


    // so in order to manage everything I will be having 5 deltas
    //H1-4, which represent where the hounds are
    //F which is the fox piece
    // we will have to and from which we will set as the first moves you can make for any piece which is forward movement

// starting place of where the hounds are
    //var DeltaFromH1 = board [0][1];
    //var DeltaFromH2 = board [0][3];
    //var DeltaFromH3 = board [0][5];
    //var DeltaFromH4 = board [0][7];



//starting place of the Fox
    //var DeltaFromF1 = board [7][0];


//We have to understand which moves are legal to do
//Hound can only move forward
//Fox can move in any direction
//No pieces are eaten

//Function hound can only move to one BS square that is a row below him and one space to either left or the right of Hound
//we will need to take in the board, row, col, and a DeltaFrom, and a DeltaTo it is set to 0 so it doesnt matter
//Its a place holder


    //we create multipart state variable which has serveral parts:
    //it contains the board which contains a part of the board
    //it contains a fox which takes in a row and a col
    //contains a hound which is made of 4 elements that have different positions


    //var state = {
        //board: [[]],
        //fox: [row, col],
        //hound: [[row, col],[row, col],[row, col],[row, col]],
        //delta: [[fromrow, fromcol],[torow, tocol]]
    //}

    var state = {
        board: [[]],
        fox: [row, col],
        hound: [[row, col],[row, col],[row, col],[row, col]],
        fromDelta: [[row, col]],
        toDelta: [[row, col]]
    };

    var stateBeforeMove = state;

    //checking if an object is empty
    function isEmptyObj(obj) {
        var prop;

        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }

        return true;
    }

    // we have to check if it is legal to move to a square, elements can only move to a BS

    function isBlackSquare (toDelta, board){

        var row = toDelta.row,
            col = toDelta.col;
        board = board [row][col]

        if (board==='BS'){
            return true;
        }
        else {
            return false;
        }

    }

// we have to check what moves are legal for each piece type

    function isLegalMove(board, fromDelta, toDelta) {
        var square = board[fromDelta.row][fromDelta.col];

        if (getKind(square) === 'F') {
            // If it's a fox, it can move both forward and backward
            if ((Math.abs(fromDelta.row - toDelta.row) === 1)
                && (Math.abs(fromDelta.col - toDelta.col) === 1)) {
                return true;
            }
        } else if (getColor(square) === 'H') {
            // If it's not a hound, it can only move downwards.
            if ((fromDelta.row - toDelta.row === -1)
                && (Math.abs(fromDelta.col - toDelta.col) === 1)) {
                return true;
            }
        } else

        return false;
    }




    /** Return the winner (either 'F' or 'H') There is no way to have a tie game */
    function getWinner(board, fox, hound) {

        //if the fox is in the top corners he will win

        if (fox === {row: 0, col: 1} ||{row: 0, col: 3}||{row: 0, col: 5}||{row: 0, col: 7}){

            return 'F';
        }
        //if the hound is in the top corners the Hound will lose and the Fox will win
        else if (hound=== {row: 7, col: 0} && {row: 7, col: 2} && {row: 7, col: 4} && {row: 7, col: 6}) {

            return 'F';
        }
        // left hand corner case, if the fox is in 7,0 a hound can block it at 6,1 and the hound wins the game
        else if (fox === {row: 7, col: 0} && hound === {row: 6, col: 1}){
            return 'H'
    }
        //wall case: if fox is in 1,0 we only need one hound to be in the 2,1 and 0,1 for the hound to win
        else if (fox === {row: 1, col: 0} && hound === {row: 2, col: 1} && hound === {row: 0, col: 1}){
            return 'H';
        }

        //wall case: if fox is in 3,0 we only need one hound to be in the 2,1 and 4,1 for the hound to win
        else if (fox === {row: 3, col: 0} && hound === {row: 2, col: 1} && hound === {row: 4, col: 1}){
            return 'H';

        }

        //wall case: if fox is in 5,0 we only need one hound to be in the 1,4 and 1,6 for the hound to win
        else if (fox === {row: 5, col: 0} && hound === {row: 1, col: 4} && hound === {row: 1, col: 6}){
            return 'H';

        } //wall case: if fox is in 7,2 we only need one hound to be in the 6,1 and 6,3 for the hound to win
        else if (fox === {row: 7, col: 2} && hound === {row: 6, col: 1} && hound === {row: 6, col: 3}){
            return 'H';

        } //wall case: if fox is in 7,4 we only need one hound to be in the 6,3 and 6,5 for the hound to win
        else if (fox === {row: 7, col: 4} && hound === {row: 6, col: 3} && hound === {row: 6, col: 5}){
            return 'H';

        } //wall case: if fox is in 7,6 we only need one hound to be in the 6,5 and 6,7 for the hound to win
        else if (fox === {row: 7, col: 6} && hound === {row: 6, col: 5} && hound === {row: 6, col: 7}){
            return 'H';

        }

        else return "No winner";


        function createMove(board, row, col, fox, hound, fromDelta,toDelta, turnIndexBeforeMove) {

            var firstOperation;
            var isLegalMove = false;

            //We need to check if what we are moving to is even legal

            if (!isBlackSquare(fromDelta)
                || !isBlackSquare(toDelta)) {
                throw new Error(ILLEGAL_CODE.ILLEGAL_DELTA);
            }

            if (isLegalMove(board, fromDelta, toDelta)) {
                isLegalMove = true;
            } else
                throw new Error(ILLEGAL_CODE.ILLEGAL_DELTA);
            }

        //We need to set up the board here it is in real time changing the board

        if (isLegalMove) {
            var firstOperation;
            board[toDelta.row][toDelta.col] = board[fromDelta.row][fromDelta.col];

            board[fromDelta.row][fromDelta.col] = 'BS'||'H'||'F';

        }

            var boardAfterMove = copyObject(board);

            boardAfterMove[row][col] = turnIndexBeforeMove === 0 ? 'F' : 'H';

            var winner = getWinner(boardAfterMove);

            if (winner !== '') {
                firstOperation = {endMatch: {endMatchScores:
                    (winner === 'F' ? [1, 0] : (winner === 'H' ? [0, 1] : [0, 0]))}};

            } else {
                // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
                firstOperation = {setTurn: {turnIndex: 1 - turnIndexBeforeMove}};
            }
            return [firstOperation,
                {set: {key: 'board', value: board}},
                {set: {key: 'fox', value: {row: row, col: col}}},
                {set: {key: 'hound', value: [{row: row, col: col},{row: row, col: col},{row: row, col: col},{row: row, col: col}]}},
                {set: {key: 'fromDelta', value: {row: row, col: col}}},
                {set: {key: 'toDelta', value: {row: row, col: col}}}];
        }

    /**
     * Check if the move is OK.
     *
     * @param params the match info which contains stateBeforeMove,
     *              stateAfterMove, turnIndexBeforeMove, turnIndexAfterMove,
     *              move.
     * @returns return true if the move is ok, otherwise false.
     */

    function isMoveOk(params) {
        var stateBeforeMove = params.stateBeforeMove,
            turnIndexBeforeMove = params.turnIndexBeforeMove,
            move = params.move,
            board,
            fromDelta,
            toDelta,
            fox,
            hound,
            expectedMove;
    }

    if (isEmptyObj(stateBeforeMove)) {
        if (move.length === 0) {
            return true;
        }
return true;



//Now lets Test our moves



        //try {
            /*
             * Example move:
             * [
             *   {setTurn: {turnIndex: 1}},//hounds move
             *   {set: {key: 'board', value:
             *
             *   [[['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
             ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
             ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
             ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
             ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
             ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
             ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
             ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
             *   }}
             *
             *   {set: {key: 'fromDelta', value: {row:0 , col: 1}}}
             *   {set: {key: 'toDelta', value: {row: 1, col: 2}}}
             * ]
             */

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
                    // Initially (at the beginning of the match), stateBeforeMove is {}.
                    board = [['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
                    ];
                }

                // One can only make a move in an empty position
                if (board[row][col] !== 'BS'||'H'||'F') {
                    return false;
                }
                var expectedMove = createMove(board, row, col, fox, hound, fromDelta,toDelta, turnIndexBeforeMove);
                if (!isLegalMove(move, expectedMove)) {
                    return false;
                }
            } catch (e) {
                // if there are any exceptions then the move is illegal
                return false;
            }
            return true;
        }

        // "Manual testing" --- expected result is [true, true, true, false].


        console.log(
            [ // Check moving F to 6x1 from initial state.
                isMoveOk({turnIndexBeforeMove: 0, stateBeforeMove: {},
                    move: [{setTurn: {turnIndex : 1}},

                        {set: {key: 'board', value:
                            [[['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
                            ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                            ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                            ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                            ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                            ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                            ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                            ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
                        ]]}},



                {set: {key: 'fox', value: {row: 7, col: 0}}},
                {set: {key: 'hound', value: [{row: 0, col: 1},{row: 0, col: 3},{row: 0, col: 5},{row: row, col: 7}]}},
                {set: {key: 'fromDelta', value: {row: 7, col: 0}}},
                {set: {key: 'toDelta', value: {row: 6, col: 1}}}]}),




                // Check placing H in 1x2 from previous state.

                isMoveOk({turnIndexBeforeMove: 1,
                    stateBeforeMove: {board:
                            [['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
                            ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                            ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                            ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                            ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                            ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                            ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                            ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']],


                        fromDelta: {row: 0, col: 1}},


                    move: [{setTurn: {turnIndex : 0}},
                        {set: {key: 'board', value:
                            [[['RS', 'BS',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
                            ['BS', 'RS', 'H', 'RS', 'BS', 'RS', 'BS', 'RS'],
                            ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                            ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                            ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                            ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                            ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                            ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
                        ]]}},



                        {set: {key: 'fox', value: {row: 7, col: 0}}},
                        {set: {key: 'hound', value: [{row: 0, col: 1},{row: 0, col: 3},{row: 0, col: 5},{row: row, col: 7}]}},
                        {set: {key: 'fromDelta', value: {row: 0, col: 1}}},
                        {set: {key: 'toDelta', value: {row: 1, col: 2}}}]}),




                // Check end game where Fox wins wins.


                    isMoveOk ({turnIndexBeforeMove: 0,
                        stateBeforeMove: {board:

                                [['RS', 'BS',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
                                ['F', 'RS', 'H', 'RS', 'BS', 'RS', 'BS', 'RS'],
                                ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                                ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                                ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                                ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                                ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                                ['BS', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']],



                            fromDelta: {row: 1, col: 0}},


                        move: [{endMatch: {endMatchScores: [1, 0]}},

                            {set: {key: 'board', value:
                                [[['RS', 'BS',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
                                    ['BS', 'RS', 'H', 'RS', 'BS', 'RS', 'BS', 'RS'],
                                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                                    ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
                                ]]}},



                            {set: {key: 'fox', value: {row: 7, col: 0}}},
                            {set: {key: 'hound', value: [{row: 0, col: 1},{row: 0, col: 3},{row: 0, col: 5},{row: row, col: 7}]}},
                            {set: {key: 'fromDelta', value: {row: 0, col: 1}}},
                            {set: {key: 'toDelta', value: {row: 1, col: 2}}}]}),

                        isMoveOk({turnIndexBeforeMove: 0, stateBeforeMove: {}, move: [{setTurn: {turnIndex : 0}}]})
                    ]);

    return isMoveOk;
})();

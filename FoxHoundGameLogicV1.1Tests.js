//This is the updated version of manual testing//

describe("In FoxHoundGameLogicV3 ", function() {
    function expectMoveOk(turnIndexBeforeMove, stateBeforeMove, move) {
        expect(FoxHoundGameLogicV3.isMoveOk({turnIndexBeforeMove: turnIndexBeforeMove,
            stateBeforeMove: stateBeforeMove,
            move: move})).toBe(true);
    }


    function expectIllegalMove(turnIndexBeforeMove, stateBeforeMove, move) {
        expect(FoxHoundGameLogicV3.isMoveOk({turnIndexBeforeMove: turnIndexBeforeMove,
            stateBeforeMove: stateBeforeMove,
            move: move})).toBe(false);
    }




//this is a fox move//
    it("Moving fox forward one one space to the right", function() {
        expectMoveOk(0, {},
            [{setTurn: {turnIndex : 1}},


                {set: {key: 'board', value:


                       [['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']]

                }},

                {set: {key: 'fox', value: {row: 7, col: 0}}},
                {set: {key: 'hound', value: [{row: 0, col: 1},{row: 0, col: 3},{row: 0, col: 5},{row: 0, col: 7}]}},
                {set: {key: 'fromDelta', value: {row: 7, col: 0}}},
                {set: {key: 'toDelta', value: {row: 6, col: 1}


                }}]);




    });

    //This is the hound move//

    it("Moving hound after fox has moved forward", function() {
        expectMoveOk(1,
            {board: [
                ['RS', 'BS', 'RS', 'H', 'RS', 'H', 'RS', 'H'],
                ['F', 'RS', 'H', 'RS', 'BS', 'RS', 'BS', 'RS'],
                ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                ['RS', 'F', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                ['BS', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
            ],


                //fox:  {row: row, col: col}
                //hound: [{row: row, col: col},{row: row, col: col},{row: row, col: col},{row: row, col: col}]

                fromDelta: {row: 1, col: 0},
                toDelta: {row: 0, col: 1},
                fox: {row: 6, col: 1},
                hound: [
                    {row: 2, col: 3},
                    {row: 0, col: 3},
                    {row: 0, col: 5},
                    {row: 0, col: 7}
                    ]

                },


            [{setTurn: {turnIndex : 0}},
                {set: {key: 'board', value:


                    [
                        ['RS', 'F', 'RS', 'H', 'RS', 'H', 'RS', 'H'],
                        ['BS', 'RS', 'H', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'F', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
                    ]

                }},

                {set: {key: 'fox', value: {row: 0, col: 1}}},
                {set: {key: 'hound', value: [{row: 3, col: 4},{row: 0, col: 3},{row: 0, col: 5},{row: 0, col: 7}]}},
                {set: {key: 'fromDelta', value: {row: 2, col: 3}}},
                {set: {key: 'toDelta', value: {row: 3, col: 4}


                }}]);



    });





    //hound move//

    it("Moving hound last  on level down to the left", function() {
        expectIllegalMove(1,
            {board: [
                ['RS', 'H', 'RS', 'H', 'RS', 'H', 'RS', 'H'],
                ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
            ],


                fromDelta: {row: 7, col: 0},
                toDelta: {row: 6, col: 1},
                fox: {row: 6, col: 1},
                hound: [
                    {row: 0, col: 1},
                    {row: 0, col: 3},
                    {row: 0, col: 5},
                    {row: 0, col: 7}
                ]
            },




            [{setTurn: {turnIndex : 0}},
                {set: {key: 'board', value:



                    [    ['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'H', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'F', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']]

                }},
                {set: {key: 'fox', value: {row: 6, col: 1}}},
                {set: {key: 'hound', value: [{row: 0, col: 1},{row: 0, col: 3},{row: 0, col: 5},{row: 1, col: 6}]}},
                {set: {key: 'fromDelta', value: {row: 0, col: 7}}},
                {set: {key: 'toDelta', value: {row: 1, col: 6}


                }}]);


    });



    //hound or fox move//

    it("Fox wins by moving to hound position", function() {
        expectMoveOk(0,
            {board:


                [    ['RS', 'BS',  'RS', 'H',  'RS', 'H',  'RS', 'BS'],
                    ['F',  'RS', 'H', 'RS', 'BS', 'RS', 'H', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']],



                fromDelta: {row: 1, col: 0},
                toDelta: {row: 0, col: 1},
                fox: {row: 6, col: 1},
                hound: [
                    {row: 1, col: 2},
                    {row: 2, col: 2},
                    {row: 0, col: 5},
                    {row: 0, col: 7}
                ]
            },



            [{endMatch: {endMatchScores: [1, 0]}},
                {set: {key: 'board', value:


                    [    ['RS', 'F',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
                        ['BS', 'RS', 'H', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']]

                }},

                {set: {key: 'fox', value: {row: 0, col: 1}}},
                {set: {key: 'hound', value: [{row: 0, col: 1},{row: 2, col: 4},{row: 0, col: 5},{row: 1, col: 6}]}},
                {set: {key: 'fromDelta', value: {row: 0, col: 1}}},
                {set: {key: 'toDelta', value: {row: 0, col: 1}


                }}]);


    });

    //this is a hound move//

    it("Hound wins by Trapping fox in a corner", function() {
        expectMoveOk(1,
            {board:

                [   ['RS', 'H',  'RS', 'BS',  'RS', 'H',  'RS', 'H'],
                    ['F', 'RS', 'H', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']],



                fromDelta: {row: 1, col: 0},
                toDelta: {row: 2, col: 2},
                fox: {row: 6, col: 1},
                hound: [
                    {row: 1, col: 1},
                    {row: 1, col: 2},
                    {row: 0, col: 5},
                    {row: 0, col: 7}
                ]
            },





            [{endMatch: {endMatchScores: [0, 1]}},
                {set: {key: 'board', value:


                    [    ['RS', 'H',  'RS', 'BS',  'RS', 'H',  'RS', 'H'],
                        ['F', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'H', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']]


                }},

                {set: {key: 'fox', value: {row: 1, col: 0}}},
                {set: {key: 'hound', value: [{row: 0, col: 1},{row: 2, col: 4},{row: 0, col: 5},{row: 0, col: 7}]}},
                {set: {key: 'fromDelta', value: {row: 1, col: 3}}},
                {set: {key: 'toDelta', value: {row: 2, col: 1}


                }}]);


    });



    it("null move is illegal", function() {
        expectIllegalMove(0, {}, null);
    });

    it("move without board is illegal", function() {
        expectIllegalMove(0, {}, [{setTurn: {turnIndex : 1}}]);
    });

    it("move without a delta is illegal", function() {
        expectIllegalMove(0, {}, [{setTurn: {turnIndex : 1}},
            {set: {key: 'board', value:


                [    ['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']]


            }}]);
    });




    it("placing F in 6x1 but setTurn to yourself is illegal", function() {
        expectIllegalMove(0, {}, [{setTurn: {turnIndex : 0}},
            {set: {key: 'board', value:


                [    ['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']]


            }},
            {set: {key: 'toDelta', value: {row: 6, col: 1}}}]);
    });


    function expectLegalHistoryThatEndsTheGame(history) {
        for (var i = 0; i < history.length; i++) {
            expectMoveOk(history[i].turnIndexBeforeMove,
                history[i].stateBeforeMove,
                history[i].move);
        }
        expect(history[history.length - 1].move[0].endMatch).toBeDefined();
    }

    it("getExampleGame returns a legal history and the last move ends the game", function() {
        var exampleGame = FoxHoundGameLogicV3.getExampleGame();
        expect(exampleGame.length).toBe(18);
        expectLegalHistoryThatEndsTheGame(exampleGame);
    });

    it("getRiddles returns legal histories where the last move ends the game", function() {
        var riddles = FoxHoundGameLogicV3.getRiddles();
        expect(riddles.length).toBe(2);
        for (var i = 0; i < riddles.length; i++) {
            expectLegalHistoryThatEndsTheGame(riddles[i]);
        }
    });

});
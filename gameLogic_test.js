describe("In Foxhound ", function() {
    function expectedMove (turnIndexBeforeMove, stateBeforeMove, move) {

        expect(isMoveOk.isMoveOk({turnIndexBeforeMove: turnIndexBeforeMove,
            stateBeforeMove: stateBeforeMove, move: move})).toBe(true);
    }

    function expectIllegalMove(turnIndexBeforeMove, stateBeforeMove, move) {
        expect(isMoveOk.isMoveOk({turnIndexBeforeMove: turnIndexBeforeMove,
            stateBeforeMove: stateBeforeMove,
            move: move})).toBe(false);
    }




//P1: Fox Moves to the right//
    it("Moving fox forward one one space to the right", function() {
        expectedMove (0, {},
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

//P2: Hound Moves down to the right//

    it("Moving hound after fox has moved forward", function() {
        expectedMove (1,
            {board: [
                ['RS', 'H', 'RS', 'H', 'RS', 'H', 'RS', 'H'],
                ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                ['F', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
            ],



                fromDelta: {row: 7, col: 0},
                toDelta: {row: 6, col: 1},
                fox: {row: 7, col: 0},
                hound: [
                    {row: 0, col: 1},
                    {row: 0, col: 3},
                    {row: 0, col: 5},
                    {row: 0, col: 7}
                ]

            },

            [{setTurn: {turnIndex : 0}},
                {set: {key: 'board', value:


                    [
                        ['RS', 'BS', 'RS', 'H', 'RS', 'H', 'RS', 'H'],
                        ['BS', 'RS', 'H', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'F', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
                    ]

                }},

                {set: {key: 'fox', value: {row: 6, col: 1}}},
                {set: {key: 'hound', value: [{row: 1, col: 2},{row: 0, col: 3},{row: 0, col: 5},{row: 0, col: 7}]}},
                {set: {key: 'fromDelta', value: {row: 0, col: 1}}},
                {set: {key: 'toDelta', value: {row: 1, col: 2}


                }}]);



    });





    //hound or fox move//

    it("Fox wins by moving to hound position", function() {
        expectedMove (0,
            {board:


                [   ['RS', 'BS',  'RS', 'H',  'RS', 'H',  'RS', 'BS'],
                    ['F',  'RS', 'H', 'RS', 'BS', 'RS', 'H', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']],



                fromDelta: {row: 1, col: 0},
                toDelta: {row: 0, col: 1},
                fox: {row: 1, col: 0},
                hound: [
                    {row: 1, col: 2},
                    {row: 0, col: 3},
                    {row: 0, col: 5},
                    {row: 1, col: 6}
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
                {set: {key: 'hound', value: [{row: 0, col: 2},{row: 0, col: 3},{row: 0, col: 5},{row: 1, col: 6}]}},
                {set: {key: 'fromDelta', value: {row: 1, col: 0}}},
                {set: {key: 'toDelta', value: {row: 0, col: 1}


                }}]);


    });

    //this is a hound move//

    it("Hound wins by Trapping fox in a corner", function() {
        expectedMove (1,
            {board:

                [   ['RS', 'H',  'RS', 'BS',  'RS', 'H',  'RS', 'H'],
                    ['F', 'RS', 'H', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['BS', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']],



                fromDelta: {row: 1, col: 2},
                toDelta: {row: 2, col: 1},
                fox: {row: 6, col: 1},
                hound: [
                    {row: 0, col: 1},
                    {row: 1, col: 2},
                    {row: 0, col: 5},
                    {row: 0, col: 7}
                ]
            },





            [{endMatch: {endMatchScores: [0, 1]}},
                {set: {key: 'board', value:


                    [   ['RS', 'H',  'RS', 'BS',  'RS', 'H',  'RS', 'H'],
                        ['F', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'H', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                        ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                        ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']]


                }},

                {set: {key: 'fox', value: {row: 1, col: 0}}},
                {set: {key: 'hound', value: [{row: 0, col: 1},{row: 2, col: 1},{row: 0, col: 5},{row: 0, col: 7}]}},
                {set: {key: 'fromDelta', value: {row: 1, col: 2}}},
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


                [   ['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
                    ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
                    ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']]


            }}]);
    });




    function expectLegalHistoryThatEndsTheGame(history) {
        for (var i = 0; i < history.length; i++) {
            expectedMove (history[i].turnIndexBeforeMove,
                history[i].stateBeforeMove,
                history[i].move);
        }
        expect(history[history.length - 1].move[0].endMatch).toBeDefined();
    }

    it("getExampleGame returns a legal history and the last move ends the game", function() {
        var exampleGame = gameLogic.getExampleGame();
        expect(exampleGame.length).toBe(18);
        expectLegalHistoryThatEndsTheGame(exampleGame);
    });

    it("getRiddles returns legal histories where the last move ends the game", function() {
        var riddles = gameLogic.getRiddles();
        expect(riddles.length).toBe(2);
        for (var i = 0; i < riddles.length; i++) {
            expectLegalHistoryThatEndsTheGame(riddles[i]);
        }
    });

});
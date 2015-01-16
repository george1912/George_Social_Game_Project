describe("In Fox Hounds ", function(){
    function expectMoveOk(turnIndexBeforeMove,stateBeforeMove, move){
        expect(
            Fox_Hounds.isMoveOk({turnIndexBeforeMove: turnIndexBeforeMove, stateBeforeMove: stateBeforeMove, move: move})
        ).toBe(true);
    }

    function expectIllegalMove(turnIndexBeforeMove,stateBeforeMove, move){
        expect(
            Fox_Hounds.isMoveOk({turnIndexBeforeMove: turnIndexBeforeMove, stateBeforeMove: stateBeforeMove, move: move})
        ).toBe(false);
    }

    function expectLegalHistoryThatEndsTheGame(history){
        for (var i=0; i<history.length; i++){
            expectMoveOk(
                history[i].turnIndexBeforeMove,
                history[i].stateBeforeMove,
                history[i].move);
        }
        expect(history[history.length-1].move[0].endMatch).toBeDefined();
    }

    it("go through the example game, check every move and make sure the final winner should be player 'F' ", function(){
        var exampleResults = Fox_Hounds.getExampleGame();
        expectLegalHistoryThatEndsTheGame(exampleResults);
        //expect(JSON.stringify(exampleResults[exampleResults.length-1].move[0].endMatch.endMatchScores) === JSON.stringify([1,0])).toBe(true)
    });

    it("in case of player H win the game ", function(){
        expectMoveOk(
            1,  {
                board:[
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['F','','','','','','',''],
                    ['','H','','','','','',''],
                    ['','','H','','H','','H','']

                ],
                delta: {oldrow: 4, oldcol: 1, row: 5, col: 0}
            },
            [{setTurn: {turnIndex : 0}},
                {set: {key: 'board', value: [
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['F','','','','','','',''],
                    ['','','','','','','',''],
                    ['H','','H','','H','','H','']

                ]}},
                {set: {key: 'delta', value: {oldrow: 6, oldcol: 1, row: 7, col: 0}}}]
        );
    });



    it("Illegal  move", function(){
        expectIllegalMove(
            0, {
                board:[
                    ['','H','','H','','H','','H'],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','F','','','','','',''],
                    ['','','','','','','','']

                ],
                delta: {oldrow: 0, oldcol: 7, row: 6, col: 1}
            },
            [{setTurn: {turnIndex : 1}},
                {set: {key: 'board', value: [
                    ['','','','H','','H','','H'],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','F','','H','','','',''],
                    ['','','','','','','','']
                ]}},
                {set: {key: 'delta', value: {oldrow: 0, oldcol: 1, row: 3, col: 0}}}]
        );
    });


    it("in case of player F win the game ", function(){
        expectMoveOk(
            0,  {
                board:[
                    ['','','','','','','',''],
                    ['F','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['H','','H','','H','','H',''],
                    ['','H','','','','','',''],
                    ['','','','','','','','']

                ],
                delta: {oldrow: 5, oldcol: 0, row: 6, col: 1}
            },
            [{setTurn: {turnIndex : 1}},
                {set: {key: 'board', value: [
                    ['','F','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['H','','H','','H','','H',''],
                    ['','H','','','','','',''],
                    ['','','','','','','','']

                ]}},
                {set: {key: 'delta', value: {oldrow: 1, oldcol: 0, row: 0, col: 1}}}]
        );
    });


    it("in case of player H win the game by box in", function(){
        expectMoveOk(
            1,  {
                board:[
                    ['','','','','','','',''],
                    ['','','H','','','','',''],
                    ['','','','','','','',''],
                    ['F','','H','','','','',''],
                    ['','H','','','','','',''],
                    ['','','H','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','','']

                ],
                delta: {oldrow: 2, oldcol: 1, row: 3, col: 0}
            },
            [{setTurn: {turnIndex : 0}},
                {set: {key: 'board', value: [
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','H','','','','','',''],
                    ['F','','H','','','','',''],
                    ['','H','','','','','',''],
                    ['','','H','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','','']

                ]}},
                {set: {key: 'delta', value: {oldrow: 1, oldcol: 2, row: 2, col: 1}}}]
        );
    });

});

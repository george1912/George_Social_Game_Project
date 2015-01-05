describe("In Fox_Hounds ", function(){
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
                    ['','','F','','','','',''],
                    ['','H','','','','','',''],
                    ['','','H','','H','','H','']

                ],
                delta: {oldrow: 5, oldcol: 2, row: 4, col: 3}
            },
            [{setTurn: {turnIndex : 0}},
                {set: {key: 'board', value: [
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','F','','','','',''],
                    ['','','','H','','H','','H'],
                    ['H','','','','','','','']

                ]}},
                {set: {key: 'delta', value: {oldrow: 6, oldcol: 1, row: 7, col: 0}}}]
        );
    });



    it("Fox wins the game", function(){
        expectIllegalMove(
            0, {
                board:[
                    ['','','','','','','',''],
                    ['','','F','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['H','','H','','H','','H',''],
                    ['','','','','','','',''],
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
                    ['','','','','','','',''],
                    ['','','','','','','','']
                ]}},
                {set: {key: 'delta', value: {oldrow: 1, oldcol: 3, row: 0, col: 2}}}]
        );
    });



    it(" fox goes out of bounds ", function(){
        expectIllegalMove(
            0, {
                board:[
                    ['','F','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['H','','H','','H','','H',''],
                    ['','','','','','','',''],
                    ['','','','','','','','']
                ],
                delta: {oldrow: 5, oldcol: 0, row: 6, col: 1}
            },
            [{setTurn: {turnIndex : 1}},
                {set: {key: 'board', value: [
                    ['F','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['H','','H','','H','','H',''],
                    ['','','','','','','',''],
                    ['','','','','','','','']
                ]}},
                {set: {key: 'delta', value: {oldrow: 0, oldcol: 1, row: 0, col: 0}}}]
        );
    });


    it(" hound wants to make an illegal move ", function(){
        expectIllegalMove(
            1, {
                board:[
                    ['','F','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['H','','H','','H','','H',''],
                    ['','','','','','','',''],
                    ['','','','','','','','']
                ],
                delta: {oldrow: 0, oldcol: 1, row: 1, col: 2}
            },
            [{setTurn: {turnIndex : 1}},
                {set: {key: 'board', value: [
                    ['','F','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','H','H','','H','','H',''],
                    ['','','','','','','',''],
                    ['','','','','','','','']
                ]}},
                {set: {key: 'delta', value: {oldrow: 5, oldcol: 0, row: 5, col: 1}}}]
        );
    });



});
describe("In FoxGeese ", function() {
  var FoxGeese;



beforeEach(module("myApp.gameLogic"));

  beforeEach(inject(function (gameLogic) {
    ticTacToeLogic = gameLogic;
  }));

  function expectMoveOk(turnIndexBeforeMove, stateBeforeMove, move) {
    expect(ticTacToeLogic.isMoveOk({turnIndexBeforeMove: turnIndexBeforeMove,
      stateBeforeMove: stateBeforeMove,
      move: move})).toBe(true);
  }

  function expectIllegalMove(turnIndexBeforeMove, stateBeforeMove, move) {
    expect(ticTacToeLogic.isMoveOk({turnIndexBeforeMove: turnIndexBeforeMove,
      stateBeforeMove: stateBeforeMove,
      move: move})).toBe(false);
  }
  
  
  
  it("placing g two places forward is illegal", function() {
    expectMoveOk(1,
      {board: 
    	  [
			  [B,B,B,g,g,g,B,B,B],
			  [B,B,B,g,g,g,B,B,B],
			  [B,B,B,g,g,g,B,B,B],
			  [g,g,g,g,g,g,g,g,g],
			  [E,E,E,E,E,E,E,E,E],
			  [E,E,E,E,E,E,E,E,E]
			  [B,B,B,E,f,E,B,B,B],
			  [B,B,B,E,E,E,B,B,B]
			  [B,B,B,E,E,E,B,B,B]

    	   
    	   
    	   ], delta: {row: 6, col: 7}},
      [{setTurn: {turnIndex : 0}},
        {set: {key: 'board', value: 
        	[
        	 [B,B,B,g,g,g,B,B,B],
			[B,B,B,g,g,g,B,B,B],
			[B,B,B,g,g,g,B,B,B],
			[g,g,g,g,g,g,E,g,g],
			[E,E,E,E,E,E,E,E,E],
			[E,E,E,E,f,E,g,E,E]
			[B,B,B,E,E,E,B,B,B],
			[B,B,B,E,E,E,B,B,B]
			[B,B,B,E,E,E,B,B,B]
        	 
        	 ]}},
        {set: {key: 'delta', value: {row: 5, col: 7}}}]);
  });

  it("f in B illegal placing X in 2x0 is illegal", function() {
    expectMoveOk(0,
      {board: [
               
               
					[B,B,B,g,g,g,B,B,B],
					[B,B,B,g,g,g,B,B,B],
					[B,B,B,g,g,g,B,B,B],
					[g,g,g,g,g,g,E,g,g],
					[E,E,E,E,E,E,E,E,E],
					[E,E,E,E,f,E,g,E,E]
					[B,B,B,E,E,E,B,B,B],
					[B,B,B,E,E,E,B,B,B]
					[B,B,B,E,E,E,B,B,B]
					               
               
               ],
               
               delta: {row: 3, col: 4}},
      [{endMatch: {endMatchScores: [1, 0]}},
            {set: {key: 'board', value: 
            	[
					            	 
					[B,B,B,g,g,g,B,B,B],
					[B,B,B,g,g,g,B,B,B],
					[B,B,B,g,g,g,B,B,B],
					[g,g,g,g,g,g,E,g,g],
					[E,E,E,E,E,E,E,E,E],
					[E,E,E,E,E,E,g,E,E]
					[f,B,B,E,E,E,B,B,B],
					[B,B,B,E,E,E,B,B,B]
					[B,B,B,E,E,E,B,B,B]
            	 
            	 ]}},
            {set: {key: 'delta', value: {row: 6, col: 0}}}]);
  });

  it("g in b is illegal", function() {
    expectMoveOk(1,
      {board: [
						               
						[B,B,B,g,g,g,B,B,B],
						[B,B,B,g,g,g,B,B,B],
						[B,B,B,g,g,g,B,B,B],
						[g,g,g,g,g,g,E,g,g],
						[E,E,E,E,E,E,E,E,E],
						[E,E,E,E,f,E,g,E,E]
						[B,B,B,E,E,E,B,B,B],
						[B,B,B,E,E,E,B,B,B]
						[B,B,B,E,E,E,B,B,B]
               
               
               
               ], 
               delta: {row: 3, col: 0}},
      [{endMatch: {endMatchScores: [0, 1]}},
            {set: {key: 'board', value: 
            	[
                                         
                        [B,B,B,g,g,g,B,B,B],
						[B,B,B,g,g,g,B,B,B],
						[B,B,B,g,g,g,B,B,B],
						[E,g,g,g,g,g,E,g,g],
						[E,E,E,E,E,E,E,E,E],
						[E,E,E,E,f,E,g,E,E]
						[g,B,B,E,E,E,B,B,B],
						[B,B,B,E,E,E,B,B,B]
						[B,B,B,E,E,E,B,B,B]
                                        
                                        ]}},
            {set: {key: 'delta', value: {row: 4, col: 1}}}]);
  });

  
  
  it("the ends when less than 6 geese is legal" , function() {
    expectMoveOk(0,
      {board: [
				               
				[B,B,B,g,g,g,B,B,B],
				[B,B,B,g,g,g,B,B,B],
				[B,B,B,g,g,g,B,B,B],
				[g,g,g,g,g,g,E,g,g],
				[E,E,E,E,E,E,E,E,E],
				[E,E,E,E,f,E,E,E,E]
				[B,B,B,E,E,E,B,B,B],
				[B,B,B,E,E,E,B,B,B]
				[B,B,B,E,E,E,B,B,B]
				
				]}},
               
               delta: {row: 3, col: 4}},
     
            {set: {key: 'board', value:
            	[
            	 
            	[B,B,B,E,E,E,B,B,B],
				[B,B,B,E,E,E,B,B,B],
				[B,B,B,E,E,E,B,B,B],
				[E,E,E,g,g,g,E,E,E],
				[E,E,E,E,E,E,E,E,E],
				[E,E,E,E,f,E,g,E,E]
				[B,B,B,E,E,E,B,B,B],
				[B,B,B,E,E,E,B,B,B]
				[B,B,B,E,E,E,B,B,B]
            	 
            	 ]}},
            	 {set: {key: 'delta', value: {row: 3, col: 4}}}]);
  });

  it("null move is illegal", function() {
    expectIllegalMove(0, {}, null);
  });

  it("move without board is illegal", function() {
    expectIllegalMove(0, {}, [{setTurn: {turnIndex : 1}}]);
  });

  it("move without delta is illegal", function() {
    expectIllegalMove(0, {}, [{setTurn: {turnIndex : 1}},
      {set: {key: 'board', value: [
                                   
                                   
                                   
                   				[B,B,B,g,g,g,B,B,B],
                   				[B,B,B,g,g,g,B,B,B],
                   				[B,B,B,g,g,g,B,B,B],
                   				[g,g,g,g,g,g,E,g,g],
                   				[E,E,E,E,E,E,E,E,E],
                   				[E,E,E,E,E,E,E,E,E]
                   				[B,B,B,E,E,E,B,B,B],
                   				[B,B,B,E,E,E,B,B,B]
                   				[B,B,B,E,E,E,B,B,B]
                                   
                                   
                                   
                                   ]}}]);
  });

  
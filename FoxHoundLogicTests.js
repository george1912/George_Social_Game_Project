//FoxHoundGameLogicTests

/**
 *
 */
describe("In FoxHound ", function() {
  function expectMoveOk(turnIndexBeforeMove, stateBeforeMove, move) {
    expect(FoxHound.isMoveOk({turnIndexBeforeMove: turnIndexBeforeMove,
      stateBeforeMove: stateBeforeMove,
      move: move})).toBe(true);
  }

  function expectIllegalMove(turnIndexBeforeMove, stateBeforeMove, move) {
    expect(FoxHound.isMoveOk({turnIndexBeforeMove: turnIndexBeforeMove,
      stateBeforeMove: stateBeforeMove,
      move: move})).toBe(false);
  }

  //We need to check what moves are legal

  //Check that fox moves are legal



  it("moving Fox forward is legal", function() {
    expectMoveOk(1,
      {board:


    	  [['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
    	               ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
    	               ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
    	               ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
    	               ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
    	               ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
    	               ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
    	               ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
    	   ], delta: {row: 7, col: 0}},




      [{setTurn: {turnIndex : 0}},
        {set: {key: 'board', value:


        	 [['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
              ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
              ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
              ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
              ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
              ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
              ['RS', 'F', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
              ['BS', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
  ]




           }},
        {set: {key: 'delta', value: {row: 6, col: 1}}}]);
  });



  it("moving Fox backwards is legal", function() {
    expectIllegalMove(1,
      {board:


    	  [['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
           ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
           ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
           ['RS', 'F', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
           ['BS', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
]



    ,


         delta: {row: 6, col: 1}},





      [{setTurn: {turnIndex : 0}},
        {set: {key: 'board', value:

        	 [['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
              ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
              ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
              ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
              ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
              ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
              ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
              ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
  ]



           }},



        {set: {key: 'delta', value: {row: 7, col: 0}}}]);
  });


  it("Hound moving forward is legal ", function() {

	    expectIllegalMove(1,
	    	      {board:


	    	    	  [['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
	    	           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	           ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	           ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	           ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	           ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
	    	]



	    	    ,


	    	         delta: {row: 0, col: 1}},





	    	      [{setTurn: {turnIndex : 0}},
	    	        {set: {key: 'board', value:

	    	        	 [['RS', 'BS',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
	    	              ['BS', 'RS', 'H', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	              ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	              ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	              ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	              ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	              ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	              ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
	    	  ]



	    	           }},



	    	        {set: {key: 'delta', value: {row: 1, col: 2}}}]);
	    	  });



  });

  it("Fox moving to RS is illegal", function() {
	    expectIllegalMove(1,
	    	      {board:


	    	    	  [['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
	    	           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	           ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	           ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	           ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	           ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
	    	]



	    	    ,


	    	         delta: {row: 7, col: 0}},





	    	      [{setTurn: {turnIndex : 0}},
	    	        {set: {key: 'board', value:



	    	        	 [['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
	    	              ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	              ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	              ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	              ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	              ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	              ['F', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	              ['BS', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
	    	  ]



	    	           }},



	    	        {set: {key: 'delta', value: {row: 6, col: 0}}}]);
	    	  });




  it("Hound moving to RS is illegal", function() {
	    expectIllegalMove(1,
	    	      {board:


	    	    	  [['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
	    	           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	           ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	           ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	           ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	           ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
	    	]



	    	    ,


	    	         delta: {row: 0, col: 1}},





	    	      [{setTurn: {turnIndex : 0}},
	    	        {set: {key: 'board', value:



	    	        	 [['RS', 'BS',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
	    	              ['BS', 'H', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	              ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	              ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	              ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	              ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	              ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	              ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
	    	  ]



	    	           }},



	    	        {set: {key: 'delta', value: {row: 1, col: 1}}}]);
	    	  });


  it("Hound moving backwards is illegal", function() {
	    expectIllegalMove(1,
	    	      {board:


	    	    	  [['RS', 'BS',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
	    	           ['BS', 'RS', 'H', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	           ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	           ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	           ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	           ['BS', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
	    	]



	    	    ,


	    	         delta: {row: 1, col: 2}},





	    	      [{setTurn: {turnIndex : 0}},
	    	        {set: {key: 'board', value:



	    	        	 [['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
	    	              ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	              ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	              ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	              ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	              ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
	    	              ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
	    	              ['F', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
	    	  ]



	    	           }},



	    	        {set: {key: 'delta', value: {row: 0, col: 1}}}]);
	    	  });









  it("null move is illegal", function() {
    expectIllegalMove(0, {}, null);

  });

  it("move without board is illegal", function() {
    expectIllegalMove(0, {}, [{setTurn: {turnIndex : 1}}]);
  });


  it("move without delta is illegal", function() {
    expectIllegalMove(0, {}, [{setTurn: {turnIndex : 1}},
      {set: {key: 'board', value:


    	  [['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
           ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
           ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
           ['F', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
           ['BS', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
]
      }}]);

  });




  it("placing F outside the board  is illegal", function() {
    expectIllegalMove(0, {}, [{setTurn: {turnIndex : 1}},
      {set: {key: 'board', value:


    	  [['RS', 'H',  'RS', 'H',  'RS', 'H',  'RS', 'H'],
           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
           ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
           ['RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
           ['BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS'],
           ['F', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS', 'BS'],
           ['BS', ' RS', 'BS', 'RS', 'BS', 'RS', 'BS', 'RS']
]


      }},
      {set: {key: 'delta', value: {row: 8, col: 0}}}]);
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
    var exampleGame = FoxHoundLogic.getExampleGame();
    expect(exampleGame.length).toBe(18);
    expectLegalHistoryThatEndsTheGame(exampleGame);
  });

  it("getRiddles returns legal histories where the last move ends the game", function() {
    var riddles = FoxHoundLogic.getRiddles();
    expect(riddles.length).toBe(2);
    for (var i = 0; i < riddles.length; i++) {
      expectLegalHistoryThatEndsTheGame(riddles[i]);
    }
  });

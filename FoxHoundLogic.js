var Fox_Hounds = (function () {

    //placing all pieces one step forward to force winning positions to be at risk from the start
    //this function is supposed to determine the winner for the game
    //the hound wins if all of the H pieces are located the the last row of the checker board
    function getWinner(row,col,board){

        //fox wins if he is located in any of the to right strings this will create a win condition for the fox
        if (board[row][col] === 'F')
        {
            if (board[0][1] === 'F' || board[0][3] === 'F' || board[0][5] === 'F' || board[0][7] === 'F')
            {
                return 'F';
            }
        }
        else if (board[row][col] === 'H')
        {
            if (board[7][0] === 'H' && board[7][2] === 'H' && board[7][4] === 'H' && board[7][6] === 'H')
            {
                return 'H';
            }
        }
        if (board[7][0] === 'F' && board[6][1] === 'H')
        {
            return 'H';
        }
        else if (board[1][0] === 'F')
        {
            if (board[0][1] === 'H' && board[2][1] === 'H')
                return 'H';
        }
        else if (board[3][0] === 'F')
        {
            if (board[2][1] === 'H' && board[4][1] === 'H')
                return 'H';
        }
        else if (board[5][0] === 'F')
        {
            if (board[4][1] === 'H' && board[6][1] === 'H')
                return 'H';
        }
        else if (board[2][7] === 'F')
        {
            if (board[1][6] === 'H' && board[3][6] === 'H')
            {
                return 'H';
            }
        }
        else if (board[4][7] === 'F')
        {
            if (board[3][6] === 'H' && board[5][6] === 'H')
            {
                return 'H';
            }
        }
        else if (board[6][7] === 'F')
        {
            if (board[5][6] === 'H' && board[7][6] === 'H')
            {
                return 'H';
            }
        }
        else
        {
            for (var i=1; i<6; i++)
            {
                for (var j=1; j<6; j++)
                {
                    if (board[i][j] === 'F' && board[i+1][j+1] === 'H' && board[i-1][j-1] === 'H' && board[i+1][j-1] === 'H' && board[i-1][j+1] === 'H' )
                        return 'H';
                }
            }
        }
        return '';
    }
























    //function to check if objects are equal
    //function isEqual(object1, object2) {
    //return JSON.stringify(object1) === JSON.stringify(object2);
    //}


    //check if a move is legal and doesnt go outside the confines of the board
    //this needs to be changed as well because we can have a blank space in the col

    function checkPosition(row,col,board){
        if(board[row][col] === undefined){
            console.log("The position of row: " + row + "and col: " + col + "is outside of the board!");
            return false;
        }else{
            return true;
        }
    }


    //movement functions:
    //Fox and hounds can only move to black squares
    //Hound can move only forward but either left or right
    //Fox can move in any direction but I am having trouble putting this in practice this is what I have going now

    function isFoxMove(oldrow,oldcol,row,col){
        //this is for the fox moving backwards
        if( (row===oldrow+1 && col===oldcol+1) || (row===oldrow+1 && col===oldcol-1)){
            console.log("Fox is moving backwards");
            return true;
        }
        else if( (row==oldrow-1 && col==oldcol+1) || (row==oldrow-1 && col==oldcol-1) ){
            console.log("Fox is moving forwards");
            return true;
        }else{
            console.log("You cannot make this move fox can only go forwards of backwards on black squares");
            return false;
        }
    }

    //this is my modified hound move
    function isHoundMove(oldrow,oldcol,row,col){
        //this is for the fox moving backwards
        if( (row==oldrow+1 && col==oldcol+1) || (row==oldrow+1 && col==oldcol-1)){
            console.log("Hound is moving forwards");
            return true;

        }else{
            console.log("You cannot make this move Hound can only go forwards on black squares");
            return false;
        }
    }



    //check what the cell contains I didn't end up using it for my game
    //function isContain(arr,value) {
    //for(var i=0; i<arr.length; i++){
    //if(arr[i][0] == value[0] && arr[i][1] == value[1]){
    //return true;
    //}
    //}
    //return false;
    //}




    function createMove(oldrow,oldcol,row,col,turnIndexBeforeMove,boardBeforeMove,turnIndex){

        if(boardBeforeMove === undefined) {
            boardBeforeMove = [
                ['','H','','H','','H','','H'],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['F','','','','','','','']

            ];
        }

        //check the correctness of movement
        if (checkPosition(row,col,boardBeforeMove) === false){  // checkPosition 01 - boundary
            throw new Error("You cannot make a move outside of the board!");
        }
        if(boardBeforeMove[oldrow][oldcol] === ''){
            throw new Error("One cannot make a move from an empty position!");
        }
        if(boardBeforeMove[row][col] !== ''){
            throw new Error("One can only make a move in an empty position!");
        }
        if (boardBeforeMove[oldrow][oldcol] === 'F')
        {
            if (isFoxMove(oldrow,oldcol,row,col)===true){
                console.log("single fox movement");
                return [firstOperation,
                    {set: {key: 'board', value: boardAfterMove}},
                    {set: {key: 'delta', value: {oldrow: oldrow, oldcol: oldcol, row: row, col: col}}}];
            }
        }
        else if (boardBeforeMove[oldrow][oldcol] === 'H')
        {
            if (isHoundMove(oldrow,oldcol,row,col)===true){
                console.log("single hound movement");
                return [firstOperation,
                    {set: {key: 'board', value: boardAfterMove}},
                    {set: {key: 'delta', value: {oldrow: oldrow, oldcol: oldcol, row: row, col: col}}}];
            }
        }
        else{
            console.log("illegal move!");
            throw new Error("Illegal move!");
        }
        var boardAfterMove = JSON.parse(JSON.stringify(boardBeforeMove));
        boardAfterMove[row][col] = turnIndexBeforeMove===0?'F' : 'H';	    //Index => 0 than 'F', turnIndex => 1 than 'H'
        if(boardAfterMove[oldrow][oldcol]===boardAfterMove[row][col]){
            boardAfterMove[oldrow][oldcol] = '';
        }else{
            throw new Error("Thats not right!");
        }

        var winner = getWinner(row,col,boardAfterMove);

        var firstOperation;

        if(winner !== ''){
            firstOperation = {endMatch: {endMatchScores:
                (winner === 'F' ? [1, 0] : (winner === 'H' ? [0, 1] : [0, 0]))}};

            console.log("player: "+ winner + " WINS!");
        }else{
            firstOperation = {setTurn: {turnIndex: 1 - turnIndexBeforeMove}};
            if(turnIndex !== 1 - turnIndexBeforeMove){
                throw new Error("current Index doesn't match!");
            }
        }
    }


    /*
     function getExampleMoves(initialTurnIndex, initialState, arrayOfRowColSets){
     var exampleMove = [];
     var state = initialState;
     var turnIndex = initialTurnIndex;
     for(var i=0; i<arrayOfRowColSets.length; i++){
     var rowColSets = arrayOfRowColSets[i];
     var move = createMove(rowColSets.oldrow,rowColSets.oldcol,rowColSets.row, rowColSets.col,turnIndex,state.board,1-turnIndex);
     var stateAfterMove = {board : move[1].set.value, delta : move[2].set.value};
     exampleMove.push({
     stateBeforeMove: state,
     stateAfterMove: stateAfterMove,
     turnIndexBeforeMove: turnIndex,
     turnIndexAfterMove: 1 - turnIndex,
     move: move,
     comment: {en: rowColSets.comment}
     });
     state = stateAfterMove;
     turnIndex = 1 - turnIndex;
     }
     return exampleMove;
     }
     */

    /*
     function getExampleGame(){
     return getExampleMoves(0, {}, [
     {oldrow: 6, oldcol: 1, row: 5, col: 0, comment: "Fox makes the first move going forward and too the left"},
     {oldrow: 1, oldcol: 0, row: 2, col: 1, comment: "Hound1 makes the 2nd move going forward and too the right"},
     {oldrow: 5, oldcol: 0, row: 4, col: 1, comment: "Fox makes the 3rd move going forward and too the right"},
     {oldrow: 1, oldcol: 2, row: 2, col: 3, comment: "Hound2 makes the 4th move going forward and too the right"},
     {oldrow: 4, oldcol: 1, row: 3, col: 0, comment: "Fox makes the 5th move going forward and too the left"},
     {oldrow: 2, oldcol: 1, row: 3, col: 2, comment: "Hound1 makes the 6th move going forward and too the left"},
     {oldrow: 3, oldcol: 0, row: 2, col: 1, comment: "Fox makes the 7thth move going forward and too the left"},
     {oldrow: 1, oldcol: 4, row: 2, col: 5, comment: "Hound3 makes the 8th move going forward and too the right"},
     {oldrow: 2, oldcol: 1, row: 1, col: 0, comment: "Fox makes the 9th move going forward and too the right"},
     {oldrow: 1, oldcol: 6, row: 2, col: 7, comment: "Hound4 makes the 10th move going forward and too the right"},
     {oldrow: 1, oldcol: 0, row: 1, col: 0, comment: "Fox makes the 9th move going forward and too the right winning the game"}
     ]);
     }*/




    function isMoveOk(params){
        try{
            var move = params.move;
            var turnIndexBeforeMove = params.turnIndexBeforeMove;
            var stateBeforeMove = params.stateBeforeMove;
            var turnIndex = move[0].setTurn.turnIndex;

            var deltaValue = move[2].set.value;
            var oldrow = deltaValue.oldrow;
            var oldcol = deltaValue.oldcol;
            var row = deltaValue.row;
            var col = deltaValue.col;
            var boardBeforeMove = stateBeforeMove.board;
            var boardAfterMove = move[1].set.value;

            var expectedMove = createMove(oldrow,oldcol,row,col,turnIndexBeforeMove,boardBeforeMove,turnIndex);

            if(!isEqual(move[0], expectedMove[0]) || !isEqual(move[1], expectedMove[1])){
                return false;
            }

        } catch(e) {
            return false;
        }
        return true;
    }


    console.log(
        isMoveOk({turnIndexBeforeMove: 0, stateBeforeMove: {},
            move: [{setTurn: {turnIndex : 1}},
                {set: {key: 'board', value: [

                    ['','H','','H','','H','','H'],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','F','','','','','',''],
                    ['','','','','','','','']

                ]}},
                {set: {key: 'delta', value: {oldrow: 7, oldcol: 0, row: 6, col: 1}}}]}) );









//return isMoveOk;
    //return {isMoveOk: isMoveOk, getExampleGame: getExampleGame};

//})();

    return isMoveOk;
})();


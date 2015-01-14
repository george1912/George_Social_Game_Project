var isMoveOk = (function () {

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


    //isEqual Function
    function isEqual(object1, object2) {
        return JSON.stringify(object1) === JSON.stringify(object2);
    }




    function checkPosition(row,col,board){
        if(board[row][col] === undefined){
            console.log("The position of row: " + row + "and col: " + col + "is outside of the board!");
            return false;
        }else{
            return true;
        }
    }


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



        //checking if you can move to the proper direction
        if(boardBeforeMove[row][col] !== ''){
            throw new Error("One can only make a move in an empty position!");
        }




        var boardAfterMove = JSON.parse(JSON.stringify(boardBeforeMove));

        boardAfterMove[row][col] = turnIndexBeforeMove===0?'F' : 'H';	    //Index => 0 than 'O', turnIndex => 1 than 'X'

        if(boardAfterMove[oldrow][oldcol]===boardAfterMove[row][col]){
            boardAfterMove[oldrow][oldcol] = '';
        }else{
            throw new Error("The not the expect move!");
        }

        var winner = getWinner(boardAfterMove);

        var firstOperation;

        if(winner !== ''){
            firstOperation = {endMatch: {endMatchScores:
                (winner === 'F' ? [1, 0] : (winner === 'H' ? [0, 1] : [0, 0]))}};
            console.log("player: "+ winner + " WIN!");
        }else{
            firstOperation = {setTurn: {turnIndex: 1 - turnIndexBeforeMove}};
            if(turnIndex !== 1 - turnIndexBeforeMove){
                throw new Error("current Index doesn't match!");
            }
        }



        if (isFoxMove(oldrow,oldcol,row,col)===true){
            console.log("single movement");
            return [firstOperation,
                {set: {key: 'board', value: boardAfterMove}},
                {set: {key: 'delta', value: {oldrow: oldrow, oldcol: oldcol, row: row, col: col}}}];
        }


        if(isHoundMove(oldrow,oldcol,row,col)===true){
            console.log("multiple movements");
            return [firstOperation,
                {set: {key: 'board', value: boardAfterMove}},
                {set: {key: 'delta', value: {oldrow: oldrow, oldcol: oldcol, row: row, col: col}}}];
        }
        else{
            console.log("illegal move!");
            throw new Error("Illegal move!");
        }


    }


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
            if(!isEqual(move[1], expectedMove[1]) || !isEqual(move[2], expectedMove[2])){
                return false;
            }
        } catch(e) {
            return false;
        }
        return true;
    }

    //this should return true
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



    console.log(
        isMoveOk({turnIndexBeforeMove: 0, stateBeforeMove: {
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
            delta: {oldrow: 7, oldcol: 0, row: 6, col: 1}
        },
            move: [{setTurn: {turnIndex : 1}},
                {set: {key: 'board', value: [
                    ['','','','H','','H','','H'],
                    ['H','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','F','','','','','',''],
                    ['','','','','','','','']
                ]}},
                {set: {key: 'delta', value: {oldrow: 0, oldcol: 1, row: 1, col: 0}}}]}) );

    console.log(
        isMoveOk({turnIndexBeforeMove: 0, stateBeforeMove: {
            board:[
                ['','','','H','','H','','H'],
                ['','','H','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['F','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','','']
            ],
            delta: {oldrow: 6, oldcol: 1, row: 5, col: 0}
        },
            move: [{setTurn: {turnIndex : 1}},
                {set: {key: 'board', value: [
                    ['','','','H','','H','','H'],
                    ['','','','','','','',''],
                    ['','','','H','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['F','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','','']
                ]}},
                {set: {key: 'delta', value: {oldrow: 1, oldcol: 2, row: 2, col: 3}}}]}) );



    console.log(
        isMoveOk({turnIndexBeforeMove: 1, stateBeforeMove: {
            board:[
                ['','','','','','','',''],
                ['','F','H','H','','H','',''],
                ['','','','','','','','H'],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','',''],
                ['','','','','','','','']
            ],
            delta: {oldrow: 1, oldcol: 7, row: 2, col: 6}
        },
            move: [{setTurn: {turnIndex : 0}},
                {set: {key: 'board', value: [
                    ['','','','','','','',''],
                    ['','F','H','H','','H','',''],
                    ['','','','','','','','H'],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','',''],
                    ['','','','','','','','']
                ]}},
                {set: {key: 'delta', value: {oldrow: 1, oldcol: 1, row: 0, col: 2}}}]}) );

    // expected output: ture(single), ture(multi), false(illegal move), ture(X WIN)

    return isMoveOk;
})();
'use strict';

angular.module('myApp').service('gameLogic',function(){

    var chain_1;
    var chain_2;

    function isEqual(object1, object2) {
        return angular.equals(object1, object2);
    }

    function copyObject(object) {
        return angular.copy(object);
    }


    function getWinner(board) {

        //fox  reaches the top of the board
        if (board[0][1] === 'F' || board[0][3] === 'F' || board[0][5] === 'F' || board[0][7] === 'F')
        {
            return 'F';
        }

        //hound reaches bottom of the board
        if (board[7][0] === 'H' && board[7][2] === 'H' && board[7][4] === 'H' && board[7][6] === 'H')
        {
            return 'H';
        }

        //fox gets boxed in corner bottom left
        if (board[7][0] === 'F' && board[6][1] === 'H')
        {
            return 'H';
        }

        //fox gets boxed in corner top left
        if (board[1][0] === 'F'&& board[0][1] === 'H' && board[2][1] === 'H')
        {

            return 'H';
        }


        //fox gets boxed in left side
        if (board[3][0] === 'F' && board[2][1] === 'H' && board[4][1] === 'H')
        {
            return 'H';
        }

        //middle left
        if (board[5][0] === 'F' && board[4][1] === 'H' && board[6][1] === 'H')
        {

            return 'H';
        }


        //top right
        if (board[2][7] === 'F' && board[1][6] === 'H' && board[3][6] === 'H')
        {

            return 'H';
        }

        //middle right
        if (board[4][7] === 'F' && board[3][6] === 'H' && board[5][6] === 'H')
        {
            return 'H';
        }

        //bottom right
        if (board[6][7] === 'F'&& board[5][6] === 'H' && board[7][6] === 'H')
        {

            return 'H';

        }

        //catch all statement
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




    function checkPosition(row,col,board){
        if(board[row][col] === undefined){
            console.log("The position of row: " + row + "and col: " + col + "is outside of the board!");
            return false;
        }else{
            return true;
        }
    }




//adding chain value
    function isCorrectMove(oldrow,oldcol,row,col,turnindex){

        if( (turnindex === 0 && row===oldrow+1 && col===oldcol+1)){
            console.log("Fox is moving ACTUALLY backwards to the right");

            //added chain to each trun
            chain_1 = {set: {key: 'isChain', value: false}};
            chain_2 = {set: {key:'chainValue',value: [[oldrow,oldcol],[row,col]]}};
            return true;
        }

        if( (turnindex === 0 && row===oldrow+1 && col===oldcol-1)){
            console.log("Fox is moving ACTUALLY backwards and to the left ");
            chain_1 = {set: {key: 'isChain', value: false}};
            chain_2 = {set: {key:'chainValue',value: [[oldrow,oldcol],[row,col]]}};
            return true;
        }



        if( (turnindex === 0 && row==oldrow-1 && col==oldcol+1) ){
            console.log("Fox is moving ACTUALLY forwards to the right!!!");
            chain_1 = {set: {key: 'isChain', value: false}};
            chain_2 = {set: {key:'chainValue',value: [[oldrow,oldcol],[row,col]]}};
            return true;

        }


        if( (turnindex === 0 && row==oldrow-1 && col==oldcol-1) ){
            console.log("Fox is moving ACTUALLY forwards and to the left!!!");
            chain_1 = {set: {key: 'isChain', value: false}};
            chain_2 = {set: {key:'chainValue',value: [[oldrow,oldcol],[row,col]]}};
            return true;

        }



        if( (turnindex === 1 && row==oldrow+1 && col==oldcol+1)) {
            console.log("Hound is moving forwards to the right!!!");
            chain_1 = {set: {key: 'isChain', value: false}};
            chain_2 = {set: {key:'chainValue',value: [[oldrow,oldcol],[row,col]]}};
            return true;

        }

        if( (turnindex === 1 && row==oldrow+1 && col==oldcol-1)){
            console.log("Hound is moving forwards to the left!!!");
            chain_1 = {set: {key: 'isChain', value: false}};
            chain_2 = {set: {key:'chainValue',value: [[oldrow,oldcol],[row,col]]}};
            return true;

        }else {
            console.log("Piece is not moving correctly");
            return false;
        }

    }

    function createMove(oldrow,oldcol,row,col,turnIndexBeforeMove,boardBeforeMove){

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


        if(boardBeforeMove[row][col] !== ''){
            throw new Error("One can only make a move in an empty position!");
        }



        //I need to update the correct Turn tokens
        //var boardAfterMove = JSON.parse(JSON.stringify(boardBeforeMove));

        var boardAfterMove = copyObject(boardBeforeMove);
        boardAfterMove[row][col] = turnIndexBeforeMove === 0 ?'F' : 'H';	    //Index => 0 then 'F', turnIndex => 1 then 'H'

        if(boardAfterMove[oldrow][oldcol]===boardAfterMove[row][col]){
            boardAfterMove[oldrow][oldcol] = '';

        }else{
            throw new Error("That's not right not the correct token!!");
        }

        var winner = getWinner(boardAfterMove);

        var firstOperation;

        var score =[0,1];

        var noWinner = false;
        if(winner !== ''){
            if(winner === 'F'){
                score = [1, 0];
            }
            firstOperation = {endMatch: {endMatchScores: score}};

            console.log("player: "+ winner + " WIN!");
        }else{
            noWinner = true;

        }


        if (isCorrectMove(oldrow,oldcol,row,col,turnIndexBeforeMove)=== true){
            console.log("correct piece Movement!!!");


            if(noWinner){
                firstOperation = {setTurn: {turnIndex: 1 - turnIndexBeforeMove}};
            }



            return [firstOperation,
                {set: {key: 'board', value: boardAfterMove}},
                {set: {key: 'delta', value: {oldrow: oldrow, oldcol: oldcol, row: row, col: col}}},

                chain_1,
                chain_2];
        }


    }



    function getInitialBoard() {
        return [
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


// To show this example Moves through $animate, additional
// verifications are needed in that problems with turnIndex


    function getExampleMoves(initialTurnIndex, initialState, arrayOfRowColSets){
        var exampleMove = [];
        var state = initialState;
        var turnIndex = initialTurnIndex;
        for(var i=0; i<arrayOfRowColSets.length; i++){
            var rowColSets = arrayOfRowColSets[i];
            var move = createMove(rowColSets.oldrow,rowColSets.oldcol,rowColSets.row, rowColSets.col,turnIndex,state.board);
            var stateAfterMove = {board : move[1].set.value, delta : move[2].set.value};
            exampleMove.push({
                stateBeforeMove: state,
                stateAfterMove: stateAfterMove,
                turnIndexBeforeMove: turnIndex,

                move: move,
                comment: {en: rowColSets.comment}
            });
            state = stateAfterMove;
            turnIndex = move[0].setTurn.turnIndex;
        }
        return exampleMove;
    }

    function getExampleGame() {
        return getExampleMoves(0, {}, [
            {oldrow: 7, oldcol: 0, row: 6, col: 1, comment: "Fox makes first move and moves forward to the right"},

            {oldrow: 0, oldcol: 1, row: 1, col: 0, comment: "Hound moves down"},

            {oldrow: 6, oldcol: 1, row: 5, col: 0, comment: "Fox moves forward and to the left"},

            {oldrow: 0, oldcol: 3, row: 1, col: 2, comment: "Hound moves down and to the left"},

            {oldrow: 5, oldcol: 0, row: 4, col: 1, comment: "Fox moves forward and to the right"},

            {oldrow: 0, oldcol: 5, row: 1, col: 4, comment: "Hound moves down and to right"},

            {oldrow: 4, oldcol: 1, row: 3, col: 2, comment: "Fox moves up to the right"},

            {oldrow: 1, oldcol: 2, row: 2, col: 3, comment: "Hound moves down to the right"},

            {oldrow: 3, oldcol: 2, row: 2, col: 1, comment: "Fox moves up to the right"},

            {oldrow: 0, oldcol: 7, row: 1, col: 6, comment: "Hound Moves down"},

            {oldrow: 2, oldcol: 1, row: 1, col: 2, comment: "Fox moves up and to the right"},

            {oldrow: 1, oldcol: 0, row: 2, col: 1, comment: "Hound moves down"},

            {oldrow: 1, oldcol: 2, row: 0, col: 1, comment: "Fox wins"}

        ]);

    }

    function isMoveOk(params){
        try{
            var move = params.move;
            var turnIndexBeforeMove = params.turnIndexBeforeMove;
            var stateBeforeMove = params.stateBeforeMove;
            var deltaValue = move[2].set.value;
            var oldrow = deltaValue.oldrow;
            var oldcol = deltaValue.oldcol;
            var row = deltaValue.row;
            var col = deltaValue.col;
            var boardBeforeMove = stateBeforeMove.board;
            var boardAfterMove = move[1].set.value;

            var expectedMove = createMove(oldrow,oldcol,row,col,turnIndexBeforeMove,boardBeforeMove);
            if(!isEqual(move[1], expectedMove[1]) || !isEqual(move[2], expectedMove[2])){
                return false;
            }
        } catch(e) {
            return false;
        }
        return true;
    }

//THIS IS FOR COMPUTER MOVE//

    /**
     * Returns the move that the computer player should do for the given board.
     * The computer will play in a random empty cell in the board.
     */
    var members = [];
    var possibleOutcomes = [];
    //targets for the spaces the hounds should move too
    var targets = [[[7,0],[7,2],[7,4],[7,6]]];

    var tar_row=0;
    var tar_col=0;

    var index = 1;   // look forward 1 steps

    function isMember(row,col,members){
        var i;
        for(i=0; i<members.length; i++){
            if(members[i][0]===row && members[i][1]===col){
                return true;
            }
        }
        return false;
    }

    function getTargets(){
        var cur_tar_line = targets[targets.length-1];
        var tempR = Math.floor(Math.random() * cur_tar_line.length);
        tar_row = cur_tar_line[tempR][0];
        tar_col = cur_tar_line[tempR][1];
        cur_tar_line.splice(tempR, 1);
        if(cur_tar_line.length === 0){
            targets.pop();
        }
        if(targets.length===0){
            return false;
        }else{
            return true;
        }
    }

    function getTargetsIn(myTargets){
        var cur_tar_line = myTargets[myTargets.length-1];
        var tempR = Math.floor(Math.random() * cur_tar_line.length);
        var tar_row = cur_tar_line[tempR][0];
        var tar_col = cur_tar_line[tempR][1];
        cur_tar_line.splice(tempR, 1);
        if(cur_tar_line.length === 0){
            myTargets.pop();
        }
        if(myTargets.length===0){
            return {flag:false, value:[tar_row, tar_col]};
        }else{
            return {flag:true, value:[tar_row, tar_col]};
        }
    }

    function thinkThreeSteps(mymove, tar_row, tar_col,targets, member, myboard, index){
        if(targets.length === 0){
            return {distance: 0};
        }
        var i, j;
        var row = tar_row;
        var col = tar_col;
        var curIndex = index - 1;
        var myTargets = angular.copy(targets);
        var myMembers = angular.copy(member);
        var curboard = angular.copy(myboard);

        while(1){
            if(row===0 && col===0){
                var results = getTargetsIn(myTargets);
                row = results.value[0];
                col = results.value[1];
            }
            if(myboard[row][col] === 'H'){
                myMembers.push([row,col]);
                row=0;
                col=0;
            }else{
                break;
            }
        }

        if(curIndex === 0){
            var possibleMoves = [];
            for (i = 1; i < 8; i++) {
                for (j = 1; j < curboard[i].length; j++) {

                    if(curboard[i][j]==='H'){
                        if(isMember(i,j,myMembers)){
                            continue;
                        }
                        var r,c;
                        var dist = 0;
                        var tempD,tempMove;
                        for (r = 1; r < 8; r++) {
                            for (c = 1; c < curboard[i].length; c++) {
                                try{
                                    tempMove = createMove(i,j,r,c,1,curboard);
                                    tempD = Math.abs(c-j)*0.2 - Math.abs(c-col)*0.5 + Math.abs(j-col)*1.0 - Math.abs(r-row)*0.7;
                                    if(dist === 0){
                                        dist = tempD;
                                        possibleMoves.push({distance: dist, value: [[i,j],[r,c]], move: tempMove});
                                    }
                                    if(tempD > dist){
                                        dist = tempD;   // Math value will not change but obj does when passing values
                                        possibleMoves.pop();
                                        possibleMoves.push({distance: dist, value: [[i,j],[r,c]], move: tempMove});
                                    }
                                }catch(e){
                                    // illegal move yo~
                                }
                            }
                        }
                    }
                }
            }
            //var randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            var bestMove = possibleMoves[0];
            for(i=0; i<possibleMoves.length; i++){
                if(bestMove.distance < possibleMoves[i].distance){
                    bestMove = possibleMoves[i];
                }
            }
            return bestMove;

        }else{

            for (i = 1; i < 8; i++) {
                for (j = 1; j < curboard[i].length; j++) {
                    if(curboard[i][j]==='H'){
                        if(isMember(i,j,myMembers)){
                            continue;
                        }

                        var r,c;
                        var dist = 0;
                        var tempD,tempMove;
                        for (r = 1; r < 8; r++) {
                            for (c = 1; c < curboard[i].length; c++) {
                                try{
                                    tempMove = createMove(i,j,r,c,1,curboard);
                                    tempD = Math.abs(c-j)*0.2 - Math.abs(c-col)*0.5 + Math.abs(j-col)*1.0 - Math.abs(r-row)*0.7;
                                }catch(e){
                                    // illegal move yo~
                                    tempD = -100;
                                }
                                if(tempD === -100){
                                    continue;
                                }
                                var newboard = angular.copy(curboard);
                                newboard[i][j] = '';
                                newboard[r][c] = 'H';
                                if(r===row && c===col){
                                    var newMembers = angular.copy(myMembers);
                                    newMembers.push([row, col]);
                                    var newrow = 0;
                                    var newcol = 0;
                                }else{
                                    var newMembers = angular.copy(myMembers);
                                    var newrow = row;
                                    var newcol = col;
                                }
                                var myNewMove = angular.copy(mymove);
                                if(myNewMove.distance === undefined){
                                    myNewMove = {distance: tempD, value: [[i,j],[r,c]], move: tempMove};
                                }else{
                                    myNewMove.distance += tempD;
                                }
                                var childResult = thinkThreeSteps(myNewMove, newrow, newcol, myTargets, newMembers, newboard, curIndex);
                                if(curIndex === 1){
                                    myNewMove.distance += childResult.distance;
                                    possibleOutcomes.push(myNewMove);
                                }
                                //return true;
                            }
                        }
                    }
                }
            }

        }

    }
//THIS IS FOR COMPUTER MOVE//
    function createComputerMove(board, turnIndexBeforeMove) {
        possibleOutcomes = [];
        while(1){
            if(tar_row===0 && tar_col===0){
                getTargets();
            }
            if(board[tar_row][tar_col] === 'H'){
                members.push([tar_row,tar_col]);
                tar_row=0;
                tar_col=0;
            }else{
                break;
            }
        }
        var mymove = {};
        var bestMove = thinkThreeSteps(mymove, tar_row, tar_col,targets, members, board, index);
        if(index!=1){
            var bestMove = possibleOutcomes[0];
            var i;
            for(i=0; i<possibleOutcomes.length; i++){
                if(bestMove.distance < possibleOutcomes[i].distance){
                    bestMove = possibleOutcomes[i];
                }
            }
        }

        if(bestMove.value[1][0] === tar_row && bestMove.value[1][1] === tar_col){
            members.push([tar_row,tar_col]);
            tar_row = 0;
            tar_col = 0;
        }
        return bestMove.move;
    }

    //THIS IS FOR COMPUTER MOVE//



//return isMoveOk;
//return {isMoveOk: isMoveOk, getExampleGame: getExampleGame};

    this.getInitialBoard = getInitialBoard;
    this.createMove = createMove;
    this.isMoveOk = isMoveOk;
    this.getExampleGame = getExampleGame;
    this.createComputerMove = createComputerMove;

});


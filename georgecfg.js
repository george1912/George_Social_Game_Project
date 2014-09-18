var players = {};
$(document).ready(function() {

  // Game variables.
  var gameboard,
      widthofboard = 7,
      heightofboard = 6,
      turn; //players turn


  var initializegame = function() {
    // here we will be setting up the general game board
    gameboard = [];
    
    //setting up the lengths of the rows and the columns 
    
    
    for (var i = 0; i < height; i++) 
    {
      var row = [];
      for (var j = 0; j < width; j++) 
      {
        row.push(0);
      }
      board.push(row);
    }
    
    
//setting the turn as 1
    turn = 1;
  };




//here we will be placing our puzzle pieces into the board they will be colored 
  
  
  var PlaceGamePiece = function (col, color, b) 
  {
  
    b = b || gameboard
    
    for (var row = height; row--;) 
    {  
    
    
      if (b[row][col] === 0) // b matrix elements are actually 0
      { 
      
        b[row][col] = color;   //then the row and col are given a color
        
        return;
        
        
      }
  };



// Here we need to check the board to see if there is an actual winner
 
  var checkWinner = function(b) {
    b = b || gameboard; 

    var row, col, color;
    
    
    // here we will be checking any the rows for matching pieces
    
    
    for(row = 0; row < height; row++)
     {
    
      for (col = 0; col < width - 3; col++)
       {
      
        color = b[row][col] //our currently set variable from the last function
        
        
        
        if (color) //checking of color has actual row/col value combinations inside
        
        {    
             
        //checking is there is another piece next to it, since rows must be the same only columns have to be checked for matching color
        
          if (b[row][col+1] === color && b[row][col+2] === color && b[row][col+3] === color) 
          
          {
          
            return 
            {
              winner: color,
              
              squares: [[row, col], [row, col+1], [row, col+2], [row, col+3]]
            };
          }
        }
      }
    }
    
    
    // similar as above but instead of having matching rows we must also need to check matching columns since win state can be vertical
   
    for(col = 0; col < width; col++) 
    {
      for (row = 0; row < height - 3; row++)
       {
        color = b[row][col]
        if (color) 
        
        { 
        
          if (b[row+1][col] === color && b[row+2][col] === color && b[row+3][col] === color) 
          {
            return 
            {
              winner: color,
            
            };
          }
        }
    }
    
    We need to check diagonals
    
    // check NW-SE diagonals combinations
    
    for(col = 0; col < width - 3; col++) 
    {
      for (row = 0; row < height - 3; row++) 
      {
        color = b[row][col]
        if (color) 
        { 
          if (b[row+1][col+1] === color && b[row+2][col+2] === color && b[row+3][col+3] === color) 
          {
            return 
            {
              winner: color,
            };
          }
        }
    }
    
    
    
    // check SW-NE diagonals
    for(col = 0; col < width - 3; col++)
     {
      for (row = 3; row < height; row++)
       {
        color = b[row][col]
        if (color) 
        { 
          if (b[row-1][col+1] === color && b[row-2][col+2] === color && b[row-3][col+3] === color) 
          {
            return 
            {
              winner: color,
              
            };
          }
      }
    }
    return {winner: 0};
  }

});
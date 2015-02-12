/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(num) {
  var solution = new Board({n:num});
  console.log('our board: ', solution.get('n'));
  for (var i=0; i < num; i++){
    solution.togglePiece(i,i);
  }
  console.log('Single solution for ' + num + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // return the factorial
  var solutionCount = 1;
  for( var i = 2; i <= n; i++ ){
    solutionCount *= i;
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // 3 sister arrays store partial solutions from
  // placing the first few queens
  var firstRows = [[]];
  var firstTakenCols = [0];
  var firstRowsMJd = [[]];
  var firstRowsMNd = [[]];
  // partial solutions after adding the next queen
  var nextRows = [];
  var nextTakenCols = [];
  var nextRowsMJd = [];
  var nextRowsMNd = [];

  //this search is breadth-first, which is appropriate for .countNQueensSolutions,
  //but maybe we should rewrite here as depth-first;
  for (var r = 0; r<n; r++){
    //var row = solution.rows()[r];
    // go through the partial solutions passed in by the previous row
    for (var soln = 0, l = firstRows.length; soln<l; soln++){
      // find all the places where you can put a queen given this partial solution
      var thisPartialSoln = firstRows[soln];
      var thisTakenCols = firstTakenCols[soln];
      // in this partial solution, which maJor and miNor diagonals were occupied?
      var thisMJd = firstRowsMJd[soln];
      var thisMNd = firstRowsMNd[soln];

      for( var c = 0; c < n; c++ ){
        // an array of 0s, except the cth column from right has a 1 
        var cBin = 1 << c;
        // test to see whether (r,c) conflicts with existing queens
        // what maJor and miNor diagonals columns intersect this square?
        var mJd = c - r;
        var mNd = c + r;
        if ( !(cBin & thisTakenCols) /*thisPartialSoln.indexOf(c) < 0*/ &&
             thisMJd.indexOf(mJd) < 0 &&
             thisMNd.indexOf(mNd) < 0 ){
          // put the queen on the square
          //debugger;
          nextRows.push( thisPartialSoln.concat(c) );
          nextTakenCols.push( thisTakenCols | cBin );
          nextRowsMJd.push( thisMJd.concat(mJd) );
          nextRowsMNd.push( thisMNd.concat(mNd) );
        }
      }
    }
    firstRows = nextRows;
    firstTakenCols = nextTakenCols;
    firstRowsMJd = nextRowsMJd;
    firstRowsMNd = nextRowsMNd;

    nextRows = [];
    nextRowsMJd = [];
    nextRowsMNd = [];
    nextTakenCols = [];
  }

  //write the first solution to matrix format
  if (firstRows.length > 0){
    var firstSolution = firstRows[0];
    var chessBoard = [];
    for (var r = 0; r<n; r++){
      var row = [];
      var queenCol = firstSolution[r];
      for (var c = 0; c<n; c++){
        if(row.push( 0 + (c === queenCol) ) );
      }
      chessBoard.push(row);
    }
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(chessBoard));
    return chessBoard;
  } else {
    // may need to wipe board clean
    return {n:n};
  }

      // if you successfully placed the queen, start placing the next queen


  // make a variable row = 0
  // var r = 0;
  // var rNeedsQueen = true
  // var
  // while (r < n){
  //   // in currentRow, loop through each column until you can place this row's queen
  //   for( var c = 0; c < num && rNeedsQueen; c++ ){
  //     solution.togglePiece(r,c);
  //     if( solution.hasAnyQueenConflictsOn(r,c) ){
  //       solution.togglePiece(r,c);
  //     } else {
  //       r++;
  //       rNeedsQueen = false;
  //   i
  //   rNeedsQueen = true;
  // }
  //     }
  //   }
  // // hasAnyQueenConflictsOn: function(rowIndex, colIndex)
  // }
  //return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(num) {
  var board = new Board({n:num})
  var solutions = [];
  var row = 0;

  var search = function(row, currentArray) {
    if( row === num ){
      solutions.push(currentArray.slice());
    }
    for( var c = 0; c < num; c++ ){
      board.togglePiece( row, c);
      if( board.hasAnyQueenConflictsOn(row, c) ){
        board.togglePiece( row, c);
      } else {
        currentArray.push([row, c]);
        row++;
        search(row, currentArray);
        currentArray.pop();
      }
    }
  }
  search(row, []);
  console.log('Number of solutions for ' + num + ' queens:', solutions.length);
  return solutions;
};

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



// return conflictr dMemoryf nxn chessboards that exist, with n rooks placed such that none of them can attack each other
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
  // 4 sister arrays store partial solutions from
  // placing the first r queens
  var prevSolutions = [[]];
  var colMemory = [0];
  var mJdMemory = [0];
  var mNdMemory = [0];
  // partial solutions after adding the next queen
  var nextSolutions = [];
  var nextColMemory = [];
  var nextMJdMemory = [];
  var nextMNdMemory = [];

  //this search is breadth-first, which is appropriate for .countNQueensSolutions,
  //but maybe we should rewrite here as depth-first;
  for (var r = 0; r<n; r++){
    // go through the partial solutions passed in by the previous row
    for (var soln = 0, l = prevSolutions.length; soln<l; soln++){
      // find all the places where you can put a queen given this partial solution
      var thisPartialSoln = prevSolutions[soln];
      // in this partial solution, which columns of this row are restricted
      // due to confilcts in vertical, maJor diag, and miNor diag columns
      var conflictCols = colMemory[soln];
      var conflictMJd = mJdMemory[soln] >> 1;
      var conflictMNd = mNdMemory[soln] << 1;
      var allConflicts = conflictCols | conflictMJd | conflictMNd;

      var cBin = 1;
      for( var c = 0; c < n; c++, cBin <<= 1){
        // an array of 0s, except the cth column from right has a 1
        // test to see whether (r,c) conflicts with existing queens
        if ( !( cBin & allConflicts ) ){
          // put the queen on the square
          nextSolutions.push( thisPartialSoln.concat(c) );
          // add her position to our memory
          nextColMemory.push( conflictCols | cBin );
          nextMJdMemory.push( conflictMJd | cBin );
          nextMNdMemory.push( conflictMNd | cBin );
        }
      }
    }
    prevSolutions = nextSolutions;
    colMemory = nextColMemory;
    mJdMemory = nextMJdMemory;
    mNdMemory = nextMNdMemory;

    nextSolutions = [];
    nextMJdMemory = [];
    nextMNdMemory = [];
    nextColMemory = [];
  }

  //write the first solution to matrix format
  if (prevSolutions.length > 0){
    var firstSolution = prevSolutions[0];
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
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // 4 sister arrays store partial solutions from
  // placing the first r queens
  //var prevSolutions = [[]];
  var colMemory = [0];
  var mJdMemory = [0];
  var mNdMemory = [0];
  // partial solutions after adding the next queen
  //var nextSolutions = [];
  var nextColMemory = [];
  var nextMJdMemory = [];
  var nextMNdMemory = [];

  //this search is breadth-first, which is appropriate for .countNQueensSolutions,
  //but maybe we should rewrite here as depth-first;
  for (var r = 0; r<n; r++){
    // go through the partial solutions passed in by the previous row
    for (var soln = 0, l = colMemory.length; soln<l; soln++){
      // find all the places where you can put a queen given this partial solution
      //var thisPartialSoln = prevSolutions[soln];
      // in this partial solution, which columns of this row are restricted
      // due to confilcts in vertical, maJor diag, and miNor diag columns
      var conflictCols = colMemory[soln];
      var conflictMJd = mJdMemory[soln] >> 1;
      var conflictMNd = mNdMemory[soln] << 1;
      var allConflicts = conflictCols | conflictMJd | conflictMNd;

      var cBin = 1;
      for( var c = 0; c < n; c++, cBin <<= 1){
        // an array of 0s, except the cth column from right has a 1
        // test to see whether (r,c) conflicts with existing queens
        if ( !( cBin & allConflicts ) ){
          // put the queen on the square
          //nextSolutions.push( thisPartialSoln.concat(c) );
          // add her position to our memory
          nextColMemory.push( conflictCols | cBin );
          nextMJdMemory.push( conflictMJd | cBin );
          nextMNdMemory.push( conflictMNd | cBin );
        }
      }
    }
    //prevSolutions = nextSolutions;
    colMemory = nextColMemory;
    mJdMemory = nextMJdMemory;
    mNdMemory = nextMNdMemory;

    //nextSolutions = [];
    nextMJdMemory = [];
    nextMNdMemory = [];
    nextColMemory = [];
  }
  return colMemory.length;
};

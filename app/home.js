// render games

var chessBoard = document.getElementById('chess');
console.log(chessBoard);

var createBoard = function() {
  for (var i = 0; i < 8; i++) {
    var rowNum = i;

    for (var q = 0; q < 8; q++) {
      console.log(rowNum);
      var chessSquare = document.createElement("DIV");
      chessSquare.setAttribute('id', q);
      chessSquare.setAttribute('class', 'chess-square');

      if (rowNum % 2 == 0) {
        if (q % 2 == 0) {
          chessSquare.style = 'background-color: grey';
        } else {
          chessSquare.style = 'background-color: brown';
        }
      } else {
        if (q % 2 == 0) {
          chessSquare.style = 'background-color: brown';
        } else {
          chessSquare.style = 'background-color: grey';
        }
      }
      chessBoard.appendChild(chessSquare);
    }
  }
}

createBoard();

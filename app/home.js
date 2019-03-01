// render games
// import { ChessPiece } from './src/ChessPiece.js';

var chessBoard = document.getElementById('chess');
var motionActive = false;
var boardSquares = [];
var borderRows = [];
var topBorder = [];
var bottomBorder = [];
var rightBorder = [];
var leftBorder = [];
var possibleMoves = [];
var rows = [];
var cols = [];
var previousMovePiece;
var playerSelect = 'white';

var resetSelectionOptions = function() {
  var squareSet = document.getElementsByClassName('chess-square');
  for (var i = 0; i < 64; i++) {
    squareSet[i].onclick = null;
  }
}

var moveHere = function(newLocation, movingPiece, possibleMoves, playerSwitch, pawnsFirst) {
  if (parseInt(newLocation.id, 10) != parseInt(movingPiece.parentNode.id, 10) && playerSelect == movingPiece.style.backgroundColor) {
    if (newLocation.firstChild == null || newLocation.firstChild.style.backgroundColor != playerSelect) {
      playerSelect = (playerSelect == 'white') ? 'black' : 'white';

      if (movingPiece.className == 'pawn unmoved') {
        movingPiece.className = 'pawn';
      }
      if (newLocation.firstChild == null) {
        movingPiece.parentNode.onclick = null;
        newLocation.appendChild(movingPiece);
      }
      if (newLocation.id != possibleMoves[0]) {
        movingPiece.parentNode.onclick = null;
        newLocation.removeChild(newLocation.firstChild);
        newLocation.appendChild(movingPiece);
      }
      movingPiece.style.border = 'none';
      resetSelectionOptions();
    }
  }
}

var checkBorders = function(pieceLocation, type) {
  if (borderRows.includes(pieceLocation) || type != 'pawn') {
    if (leftBorder.includes(pieceLocation)) {
      return 'left';
    } else if (rightBorder.includes(pieceLocation)) {
      return 'right';
    } else if (leftBorder.includes(pieceLocation - 1) && type != 'pawn' && type != 'pawn unmoved') {
      return 'LEFTTT';
    } else {
      return 'none';
    }
  }
}

var checkDiagonal = function(pawnLocation, player, playerSwitch) {
  var diagonalPawns = [];
  var availableMoves;
  var borderLimit = checkBorders(pawnLocation, 'pawn');

  for (var i = -1; i < 2; i++) {

    var diagonalPawn = document.getElementById(pawnLocation + i + playerSwitch);

    if (diagonalPawn != null) {
      if (diagonalPawn.firstChild != null && i != 0) {
        if (diagonalPawn.firstChild.style.backgroundColor != player) {
          if (borderLimit == 'left') {
            if (i != -1) {
              diagonalPawns.push(parseInt(diagonalPawn.id, 10));
            }
          } else if (borderLimit == 'right') {
            if (i != 1) {
              diagonalPawns.push(parseInt(diagonalPawn.id, 10));
            }
          } else {
            diagonalPawns.push(parseInt(diagonalPawn.id, 10));
          }
        }
      }
    }
  }
  return diagonalPawns;
}

var determinePawnMoves = function(selectedPawn) {
  var pawnLocation = parseInt(selectedPawn.parentNode.id, 10);
  var player = selectedPawn.style.backgroundColor;
  var playerSwitch = (player == 'black') ? 8 : -8;
  var pawnsFirst = false;
  var defaultMoves = [];
  var diagonalMoves = [];
  var diagonal;
  var startMove;
  possibleMoves = [];

  defaultMoves.push(pawnLocation + playerSwitch);
  if (selectedPawn.className == 'pawn unmoved') {
    pawnsFirst = true;
    startMove = pawnLocation + (playerSwitch * 2);
    defaultMoves.push(startMove);
  }

  diagonalMoves = checkDiagonal(pawnLocation, player, playerSwitch);
  possibleMoves = defaultMoves.concat(diagonalMoves);

  for (var i = 0; i < possibleMoves.length; i++) {
    if (selectedPawn.style.backgroundColor == playerSelect) {
      moveOption = document.getElementById(possibleMoves[i]);
      moveOption.onclick = function() { moveHere(this, selectedPawn, possibleMoves, playerSwitch, pawnsFirst); }
    }
  }

}

var determineKnightMoves = function(selectedKnight) {
  var knightLocation = parseInt(selectedKnight.parentNode.id, 10);
  var player = selectedKnight.style.backgroundColor;
  var playerSwitch = (player == 'black') ? 8 : -8;
  var possibleKnightMoves = [];
  var borderLimit = checkBorders(knightLocation, 'knight');

  switch (borderLimit) {
    case 'left':
      console.log('l');

      break;
    case 'right':
      console.log('r');
      break;
  }
  possibleKnightMoves.push(knightLocation + 15, knightLocation + 17, knightLocation - 15, knightLocation + - 17, knightLocation + 10, knightLocation + 6, knightLocation - 10, knightLocation - 6);
  console.log(possibleKnightMoves);
  for (var i = 0; i < 8; i++) {
    moveOption = document.getElementById(possibleKnightMoves[i]);
    if (moveOption != null) {
      moveOption.onclick = function() { moveHere(this, selectedKnight, possibleKnightMoves, playerSwitch, false)}
    }
  }
}
var determineRookMoves = function() {

}
var determineBishopMoves = function() {

}
var determineQueenMoves = function() {

}
var determineKingMoves = function() {

}

var determinePossibleMoves = function(pieceType) {
  var pieceName = pieceType.className;
  if (pieceName != 'pawn' && pieceName != 'pawn unmoved') {
    pieceName = pieceType.firstChild.className;
  }

  switch (pieceName) {
    case 'pawn':
      determinePawnMoves(pieceType);
      break;
    case 'pawn unmoved':
      determinePawnMoves(pieceType);
      break;
    case 'knight':
      determineKnightMoves(pieceType);
      break;
    case 'rook':
      determineRookMoves(pieceType);
      break;
    case 'bishop':
      determineBishopMoves(pieceType);
      break;
    case 'queen':
      determineQueenMoves(pieceType);
      break;
    case 'king':
      determineKingMoves(pieceType);
      break;
  }
}

var selectPiece = function(mainPiece) {
  resetSelectionOptions();
  console.log(playerSelect);
  if (mainPiece.style.backgroundColor == playerSelect) {
    mainPiece.style.border = 'solid 3px blue';

    if (previousMovePiece != undefined && previousMovePiece != mainPiece) {
      previousMovePiece.style.border = 'none';
    }

    previousMovePiece = mainPiece;
    determinePossibleMoves(mainPiece);
  }
}

var createMainPieces = function() {
  var mainPieceSquares = [];
  var boardSquares = document.getElementsByClassName('chess-square');
  for (var i = 0; i < 8; i++) {
    mainPieceSquares.push(boardSquares[i]);
  }
  for (var i = 56; i < 64; i++) {
    mainPieceSquares.push(boardSquares[i]);
  }
  for (var i = 0; i < 16; i++) {
    var mainPiece = document.createElement("DIV");
    mainPiece.setAttribute('class', 'main-piece');
    if (i < 8) {
      mainPiece.style = 'background-color: black; color: white'
    } else {
      mainPiece.style = 'background-color: white; color: black'
    }
    if (i == 0 || i == 7 || i == 8 || i == 15) {
      var rook = document.createElement("DIV");
      rook.setAttribute('class', 'rook');
      rook.innerText = 'R';
      mainPiece.appendChild(rook);
    } else if (i == 1 || i == 6 || i == 9 || i == 14) {
      var knight = document.createElement("DIV");
      knight.setAttribute('class', 'knight');
      knight.innerText = 'H';
      mainPiece.appendChild(knight);
    } else if (i == 2 || i == 5 || i == 10 || i == 13) {
      var bishop = document.createElement("DIV");
      bishop.setAttribute('class', 'bishop');
      bishop.innerText = 'B';
      mainPiece.appendChild(bishop);
    } else if (i == 3 || i == 11) {
      var queen = document.createElement("DIV");
      queen.setAttribute('class', 'queen');
      queen.innerText = 'Q';
      mainPiece.appendChild(queen);
    } else if (i == 4 || i == 12) {
      var king = document.createElement("DIV");
      king.setAttribute('class', 'king');
      king.innerText = 'K';
      mainPiece.appendChild(king);
    }
    mainPiece.onclick = function() { selectPiece(this); }
    mainPieceSquares[i].appendChild(mainPiece);
  }

}

var createPawns = function() {
  var pawnSquares = []
  var boardSquares = document.getElementsByClassName('chess-square');
  for (var i = 8; i < 16; i++) {
    pawnSquares.push(boardSquares[i]);
  }
  for (var i = 48; i < 56; i++) {
    pawnSquares.push(boardSquares[i]);
  }
  for (var i = 0; i < 16; i++) {
    var pawnPiece = document.createElement("DIV");
    pawnPiece.setAttribute('class', 'pawn unmoved');
    if (i < 8) {
      pawnPiece.style = 'background-color: black; color: white;';
    } else {
      pawnPiece.style = 'background-color: white; color: black';
    }
    var pawn = document.createElement("DIV");
    pawn.setAttribute('class', 'p');
    pawn.innerText = 'P';
    pawnPiece.appendChild(pawn);
    pawnPiece.onclick = function() { selectPiece(this); }
    pawnSquares[i].appendChild(pawnPiece);
  }
}

var assignBorderSquares = function() {
  var squares = document.getElementsByClassName('chess-square');
  borderRows = rows[0].concat(rows[7]);
  var startColPoints = [0, 7];
  for (var q = 0; q < 2; q++) {
    for (var i = 1; i < 7; i++) {
      var square = squares[(8 * i) + startColPoints[q]];
      var squareNum = parseInt(square.id, 10);
      borderRows.push(squareNum);
    }
  }

  topBorder = rows[0];
  bottomBorder = rows[7];
  leftBorder = borderRows.slice(16, 22);
  leftBorder.push(borderRows[0], borderRows[8])
  rightBorder = borderRows.slice(22, 28);
  rightBorder.push(borderRows[7], borderRows[15]);
}

var createBoard = function() {
  // generates chess squares with styling, classes and id's
  var squareId = 0;
  for (var i = 0; i < 8; i++) {
    var row = [];
    var rowNum = i;
    for (var q = 0; q < 8; q++) {
      var chessSquare = document.createElement("DIV");
      chessSquare.setAttribute('id', squareId);
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
      row.push(squareId);
      squareId++;
    }
    rows.push(row);
  }
  assignBorderSquares();
  // creates pawns and sets their initial positions
  createPawns();
  // creates main pieces and sets their inital positions
  createMainPieces();
}

createBoard();

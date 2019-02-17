self.onmessage = function(e) {
  let board;
  
  if (e.data[3] === "next") {
    board = nextBoardState(e);
  } else {
    board = newBoard(e);
  }
 
  postMessage([board, e.data[3]]);  
}

function newBoard(e) {
  //Creates a new board state and randomly fills ~20% of cells
  let board = [],
      rows = e.data[0],
      columns = e.data[1],
      row, lit;
    
  for (let r = 0; r < rows; r++){
    row = [];
    for (let c = 0; c < columns; c++){
      lit = Math.random() < .2 ? 1 : 0;       
      row.push(lit);
    }
    board.push(row);
  }
  
  return board;
}

function nextBoardState(e){
  //Used to update board state following game of life rules w/ wrap around
  let board = [],
      neighCount = [],
      rows = e.data[0],
      columns = e.data[1]
      boardState = e.data[2],
      updateRow = [];

  for (let r = 0; r < rows; r++){
    updateRow = boardState[r].map(function (el, idx){
      let neighbours = 0,
          currentRow = boardState[r],
          nextRow = boardState[(r + 1) % rows],
          prevRow = boardState[(((r-1) % rows) + rows) % rows];
      
      //check neighbour w/ wraparound
      if (currentRow[(idx + 1) % columns] > 0) {
        neighbours += 1;
      }
      
      if (currentRow[(((idx - 1) % columns) + columns) % columns] > 0) {
        neighbours += 1;
      }
          
      //check row below
      if (nextRow[(idx + 1) % columns] > 0) {
        neighbours += 1;
      }
      
      if (nextRow[(idx)] > 0) {
        neighbours += 1;
      }
      
      if (nextRow[(((idx - 1) % columns) + columns) % columns] > 0) {
        neighbours += 1;
      }
       
      //check row above
      if (prevRow[(idx + 1) % columns] > 0) {
        neighbours += 1;
      }
      
      if (prevRow[(idx)] > 0) {
        neighbours += 1;
      }
      
      if (prevRow[(((idx - 1) % columns) + columns) % columns] > 0) {
        neighbours += 1;
      }
      
      neighCount.push(neighbours);
      
      //dead element case
      if (el == 0) {
        if (neighbours == 3) {
          return 1;
        } else {
          return 0;
        }
      }
      
      //switch case live element
      switch (neighbours){
        case 2:
          return ++el;
        case 3:
          return ++el;
        default:
          return 0;
      }
    });
    
    board.push(updateRow);
  }
  
  return board;
}
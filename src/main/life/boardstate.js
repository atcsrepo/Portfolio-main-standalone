const React = require("react");
const colorScale = ["#EBEDEC", "#786DA4","#6E6091","#63537F","#57476C","#4B3A5A","#3D2E47","#2E2234"];

module.exports = class BoardState extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      boardState: [],
      board: []
    };
    
    this.cellClick = this.cellClick.bind(this);
    this.generateBaseState = this.generateBaseState.bind(this);
    this.nextBoard = this.nextBoard.bind(this);
    this.nextBoardState = this.nextBoardState.bind(this);
    this.drawBoard = this.drawBoard.bind(this);
  }
  
  cellClick(e){
    //Used for manual addition of cells via click
    //Calculates position based off of id
    let id = parseInt(e.target.id, 10),
        clickedRow = Math.floor(id / this.props.columns),
        clickedColumn = id - clickedRow * this.props.columns,
        boardState = [].concat(this.state.boardState);

    if (!boardState[clickedRow][clickedColumn]) {
      boardState[clickedRow][clickedColumn] = 1;
      this.setState({boardState: boardState}, () => {
        this.drawBoard(this.state.boardState, 'manadd')
      });
    }
  }
  
  //Experimenting with webworker
  generateBaseState(){
    //Creates initial boardstate
    let board = [],
        rows = this.props.rows,
        columns = this.props.columns,
        row, lit;
        
    for (let r = 0; r < rows; r++){
      row = [];
      for (let c = 0; c < columns; c++){
        lit = Math.random() < .2 ? 1 : 0;       
        row.push(lit);
      }
      board.push(row);
    }
        
    this.drawBoard(board);
  }
  
  nextBoard(){
    //Used for generating subsequent board states
    let rows = this.props.rows,
        columns = this.props.columns,
        currBoard = this.state.boardState,
        nextState = this.nextBoardState([rows, columns, currBoard]);
        
    this.drawBoard(nextState);
  }
  
  nextBoardState(e){
    //Used to update board state following game of life rules w/ wrap around
    let board = [],
        neighCount = [],
        rows = e[0],
        columns = e[1]
        boardState = e[2],
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
  
  drawBoard(boardState, type = "auto"){
    //Type used to differentiate between time-based re-draw or in response to click
    let board = [],
        cellWidth = this.props.cellWidth,
        cellHeight = this.props.cellHeight,
        row,
        idx = 0;
    
    for (let r = 0; r < boardState.length; r++) {
      row = boardState[r];
      
      for (let c = 0; c < row.length; c++) {
        board.push(
          <rect x = {c * cellWidth} 
            y = {r * cellHeight} 
            width = {cellWidth} 
            height = {cellHeight}
            fill = {boardState[r][c] <= 7 ? colorScale[boardState[r][c]] : colorScale[7]}
            key ={idx + "rect"}
            stroke = "black"
            strokeWidth = "0.5"
            id = {idx++}
            onClick={this.cellClick}
          />
        );
      }
    }
    
    this.setState({board: board, boardState: boardState}, () => {
      //Sets drawn in parent component, so that loader will be removed
      if(!this.props.drawn) {
        this.props.setDrawn(true);
      }
      
      //No need to set timer if re-draw caused by manual click
      if (type === "auto") {
        this.timer = setTimeout(() => {
          this.nextBoard();
        }, this.props.speed);
      }
    })
  }
  
  componentDidUpdate(){
    if (this.props.resized) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      //Needs to be generated after new dimensions are set, so passed as callback down chain
      this.props.setSize(this.generateBaseState);
    }
  }
  
  componentDidMount(){
    this.generateBaseState();
  }
  
  componentWillUnmount(){
    clearTimeout(this.timer);
  }
  
  render() {
    if (!this.props.drawn) {
      return null;
    }
    
    return(
      <div className="life-content-div">
        <svg width={this.props.width} height={this.props.height}>
          {this.state.board}
        </svg>
        <p className="life-text" id="life-text">
          Watch a <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" style={{color:"#A0EDFF", textDecoration: "none"}} target="_blank">game of life</a> pass by or take matters into your own hand 
          <br/>(Feel free to click on empty cells)
        </p>
      </div>
    );
  }
}